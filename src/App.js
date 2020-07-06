import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
