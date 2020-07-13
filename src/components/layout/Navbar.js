import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PatternButton from "../../util/PatternButton";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "./Notifications";
import CreateStatement from "../statement/CreateStatement";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { authenticated } = user;
  return (
    <AppBar color="secondary">
      <ToolBar className="nav-container">
        {authenticated ? (
          <Fragment>
            <CreateStatement />
            <Link to="/">
              <PatternButton tip="Home">
                <HomeIcon color="primary" />
              </PatternButton>
            </Link>
            <Notifications color="primary" />
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </ToolBar>
    </AppBar>
  );
};
export default Navbar;
