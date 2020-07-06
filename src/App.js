import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

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
  spreadThis: {
    formContainer: {
      textAlign: "center",
    },
    pageTitle: { margin: "20px auto" },
    textField: { margin: 10 },
    button: { margin: 10, padding: 10, position: "relative" },
    customError: { margin: 10 },
    progress: { position: "absolute" },
  },
});

let authenticated;
const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
