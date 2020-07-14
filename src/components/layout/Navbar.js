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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const { authenticated } = user;
  return (
    <AppBar color="primary" className={classes.root}>
      <ToolBar className="nav-container">
        <Typography className={classes.title} variant="h6" noWrap>
          Statements
        </Typography>
        {authenticated ? (
          <Fragment>
            <CreateStatement />
            <Link to="/">
              <PatternButton tip="Home">
                <HomeIcon color="secondary" />
              </PatternButton>
            </Link>
            <Notifications />
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
