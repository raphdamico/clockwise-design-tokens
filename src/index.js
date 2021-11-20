import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Container,
  Button,
  Paper,
  Card,
  Box,
  TextField,
  Grid,
  Checkbox,
  Switch
} from "@material-ui/core";
import { cwTokens, cwTokenList, lightTheme, darkTheme } from "./theme";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const classes = useStyles();
  const theme = darkMode ? darkTheme : lightTheme;
  const themeString = darkMode ? "themeDark" : "themeLight";
  const tokenTheme = cwTokens[themeString];

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      <Container
        className="App"
        align="left"
        style={{
          backgroundColor: tokenTheme.colors.background
        }}
      >
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        {darkMode ? "Dark Mode" : "Light Mode"}
        <Paper>
          <Box m={1}>
            <Typography variant="h1" component="h1" paragraph>
              Heading XL
            </Typography>
            <Typography variant="h2" component="h2" paragraph>
              Heading L
            </Typography>
            <Typography variant="h3" component="h3" paragraph>
              Heading M
            </Typography>
            <Typography variant="h4" component="h4" paragraph>
              Heading S
            </Typography>
            <Typography variant="h5" component="h5" paragraph>
              Heading XS
            </Typography>
            <Typography variant="h6" component="h6" paragraph>
              Heading XXS
            </Typography>
            <Typography variant="body1" component="p" paragraph>
              Body L: For most of the main body text that we use, legible and
              easy to read even when it's in longer forms. Lots of sample bla
              bla bla to make it fill enough space for this demo
            </Typography>
            <Typography variant="body2" component="p" paragraph>
              Body M: For when things are a bit more constrained and we need to
              show longer text but without the same emphasis. Often used for
              subtitles under main text
            </Typography>
            <Typography variant="subtitle1" component="p" paragraph>
              Body S: Mostly used for labels and fine print
            </Typography>
          </Box>

          <Paper
            elevation={0}
            style={{
              backgroundColor: tokenTheme.colors.primaryContainer,
              color: tokenTheme.colors.onPrimaryContainer
            }}
          >
            Container element with Clockwise tokens
          </Paper>

          <Paper
            elevation={0}
            style={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText
            }}
          >
            Container element with Material theme
          </Paper>

          <Card className={classes.root} variant="outlined">
            <Box m={1}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <Button disableElevation variant="contained" color="primary">
                    Primary
                  </Button>
                  <Button variant="outlined" color="primary">
                    Primary
                  </Button>
                  <Button variant="text" color="primary">
                    Primary
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                  >
                    Secondary
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="text" color="primary">
                    Secondary
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box m={1}>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="filled-basic" label="Filled" variant="filled" />
              </form>
            </Box>

            <Box m={1}>
              <Checkbox color="primary" defaultChecked />
              <Checkbox color="secondary" defaultChecked />
            </Box>
          </Card>
        </Paper>

        <Paper>
          <Box m={1}>
            <Typography variant="h2" component="h2">
              Coming right up: Autopizza!
            </Typography>
            <Typography variant="body1" component="p" paragraph>
              We’ve just introduced a cool new feature. It automatically
              delivers pizza to you between long meetings, so you can have a
              little rest and relaxation to make up for all that Zoom time
            </Typography>
          </Box>
          <Paper
            elevation={0}
            style={{
              backgroundColor: tokenTheme.colors.primaryContainer,
              color: tokenTheme.colors.onPrimaryContainer
            }}
          >
            <Typography variant="h4" component="h2" paragraph>
              Who is this for?
            </Typography>
            It’s for lovely people who need more time between their meetings
            because life just gets so crazy some times.
          </Paper>
          <Paper
            elevation={0}
            style={{
              backgroundColor: tokenTheme.colors.warningContainer,
              color: tokenTheme.colors.onWarningContainer
            }}
          >
            <Typography variant="body1" component="h2" paragraph>
              Warning! This won’t work if you’re a meeting maniac!
            </Typography>
            <Button
              disableElevation
              variant="contained"
              style={{
                backgroundColor: tokenTheme.colors.warning,
                color: tokenTheme.colors.onWarning
              }}
            >
              HELP, I’M A MEETING MANIAC
            </Button>
          </Paper>
          <Box m={1}>
            <Typography
              variant="body2"
              component="h2"
              paragraph
              style={{
                color: tokenTheme.colors.onSurfaceSubdued
              }}
            >
              How does autopizza work? Well, it all starts with our patented
              dough defragmentation algorithm. Click here to learn more
            </Typography>
          </Box>

          <Card className={classes.root} variant="outlined">
            <Typography variant="h3" component="h2" paragraph>
              🍕 Pizza between consecutive meetings
            </Typography>
            <Switch color="primary" checked={true} />
            Pizza breaks between consecutive meetings
          </Card>
        </Paper>

        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        {darkMode ? "Dark Mode" : "Light Mode"}

        <br />
        <br />
        <div style={{ height: 2000, width: "100%" }}>
          <DataGrid
            rows={cwTokenList}
            columns={[
              { field: "tokenName", headerName: "Token", flex: 1 },
              { field: "tokenValue", headerName: "Value", width: 150 }
            ]}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
