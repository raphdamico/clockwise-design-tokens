import tokens from "./tokens.js";
import { createTheme } from "@material-ui/core/styles";
import _ from "lodash";

////////////////////////////////////////////////////////////
// Convert Figma Tokens into a single well formed object
////////////////////////////////////////////////////////////
function deepMap(obj, cb, path = "") {
  let out = {};

  Object.keys(obj).forEach(function (k) {
    let val;
    let _path = path === "" ? k : `${path}.${k}`;

    if (obj[k] !== null && typeof obj[k] === "object") {
      val = deepMap(obj[k], cb, _path);
    } else {
      val = cb(obj[k], k, _path);
    }

    out[k] = val;
  });

  return out;
}

function applyToken(tokens, pathPlaceholder /* e.g. {fontfamilies.body}) */) {
  let path = pathPlaceholder.trim().replaceAll("{", "").replaceAll("}", "");
  return _.get(tokens.ref, path).value;
}

/*
Deep maps the design tokens object and replaces
any values that are references to other tokens
(formatted as {colorScales.blueDarker} for example)
with the actual values. Commented out because... 
*/
// function assignValuesToPlaceholders(tokens) {
//   let out = JSON.parse(JSON.stringify(tokens));
//   return deepMap(out, function (v, k, p) {
//     let tokenValue;
//     if (v[0] === "{") {
//       tokenValue = applyToken(tokens, v);
//     } else {
//       tokenValue = v;
//     }
//     return tokenValue;
//   });
// }

/*
Deep maps the design tokens object and replaces
any values that are references to other tokens
(formatted as {colorScales.blueDarker} for example)
and flattens the object structure to make it easier to
access the values 

Before:  ref.themeDark.colors.surface.value = {colorScales.white}
After:   ref.themeDark.colors.surface = #fff
*/

function convertTokens(tokens) {
  let mapInput = JSON.parse(JSON.stringify(tokens));
  let out = {};
  let tokenList = [];
  let id = 0;
  deepMap(mapInput, function (v, k, p) {
    let tokenValue;
    if (v[0] === "{") {
      tokenValue = applyToken(tokens, v);
    } else {
      tokenValue = v;
    }
    if (p.includes("value")) {
      // Create in tokens object
      _.set(out, p.replaceAll(".value", ""), tokenValue);

      // Add path and value to tokenList (more cosmetic)
      id++;
      tokenList.push({
        id: id,
        tokenName: p.replaceAll(".value", ""),
        tokenValue: tokenValue
      });
    }
  });
  return { out, tokenList };
}

export const cwTokens = convertTokens(tokens).out;
export const cwTokenList = convertTokens(tokens).tokenList;
console.log("CLOCKWISE TOKENS", cwTokens, cwTokenList);

////////////////////////////////////////////////////////////
// Generate material themes
////////////////////////////////////////////////////////////

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: cwTokens.themeLight.colors.primary
      //   light: '#5ABF96',
      //   dark: '#3E6958',
    },
    secondary: {
      main: cwTokens.themeLight.colors.secondary
      //   light: '#61dafb',
      //   dark: '#21a1c4',
    },
    error: {
      main: cwTokens.themeLight.colors.warning
    },
    background: {
      default: "#282c34"
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: "#fff" // 5d737e
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      // main: '#40a47c',//'#40a47c',//'#1D855B',
      main: cwTokens.themeDark.colors.primary
    },
    secondary: {
      // main: '#b5ecfb',
      main: cwTokens.themeDark.colors.secondary
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: "#555" // 5d737e
        }
      }
    }
  }
});

////////////////////////////////////////////////////////////
// Customize typography
////////////////////////////////////////////////////////////

// Mapping to Material UI names
let typestyleMap = {
  h1: "heading-xl",
  h2: "heading-l",
  h3: "heading-m",
  h4: "heading-s",
  h5: "heading-xs",
  h6: "heading-xxs",
  body1: "body-l",
  body2: "body-m",
  subtitle1: "body-s"

  /// Wanted to try this, but mapping to custom names
  // does not work without changing the material UI code itself
  // https://github.com/mui-org/material-ui/blob/v4.x/packages/material-ui/src/Typography/Typography.js
  // headingXl: "heading-xl",
  // headingL: "heading-l",
  // headingM: "heading-m",
  // headingS: "heading-s",
  // headingXs: "heading-xs",
  // headingXxs: "heading-xxs",
  // bodyL: "body-l",
  // bodyM: "body-m",
  // bodyS: "body-s"
};

// Map type weight values as specified in type files
// (as used in Figma) to standardized CSS values
function getFontWeight(fontWeight) {
  let fontWeightMap = {
    regular: 400,
    book: 400,
    normal: 400,
    bold: "bold"
  };
  return fontWeightMap[fontWeight.toLowerCase()];
}

[lightTheme, darkTheme].forEach((theme) => {
  // Theme overrides that apply to both light & dark theme
  theme.overrides = {
    MuiPaper: {
      root: {
        padding: "20px 10px",
        margin: "10px"
      }
    },
    MuiButton: {
      root: {
        margin: "5px"
      }
    }
  };

  // Map Clockwise type styles to material UI theme
  Object.entries(typestyleMap).forEach(([materialStyle, clockwiseStyle]) => {
    let typestyle = cwTokens.ref.typescale[clockwiseStyle];

    theme.typography[materialStyle] = {
      fontFamily: `'${typestyle.fontFamily}'`,
      fontSize: `${typestyle.fontSize / 16}rem`,
      fontWeight: `${getFontWeight(typestyle.fontWeight)}`,
      letterSpacing: `${
        (parseFloat(typestyle.fontSize) * parseFloat(typestyle.letterSpacing)) /
        16
      }rem`,
      lineHeight: typestyle.lineHeight,
      marginBottom: `${
        (parseFloat(typestyle.fontSize) *
          parseFloat(typestyle.paragraphSpacing)) /
        16
      }rem`
    };
  });
});
