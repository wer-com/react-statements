import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
