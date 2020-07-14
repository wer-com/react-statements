import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import login from "./pages/login";
import user from "./pages/user";
import signup from "./pages/signup";
import Navbar from "./components/layout/Navbar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { Provider } from "react-redux";
import store from "./store";
import { getUserData, logoutUser } from "./actions/userActions";
import { SET_AUTHENTICATED } from "./types";
import axios from "axios";
import deepPurple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#482880",
      main: "#673ab7",
      dark: "#8561c5",
      contrastText: "#fff",
    },
    secondary: {
      light: "#008394",
      main: "#00bcd4",
      dark: "#33c9dc",
      contrastText: "#000",
    },
  },
  spreadThis: {
    formContainer: {
      textAlign: "center",
      marginTop: 130,
    },
    pageTitle: { margin: 10 },
    textField: { margin: 10 },
    button: { margin: 10, padding: 10, position: "relative" },
    customError: { margin: 10 },
    progress: { position: "absolute" },
    signLink: { textAlign: "right" },
    avatar: {
      backgroundColor: "#673ab7",
      margin: "0 auto",
    },
  },
});

const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/statement/:statementId"
                component={user}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
