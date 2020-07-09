import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Signup = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const UI = useSelector((state) => state.UI);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, loading: true });
    const userData = {
      email: credentials.email,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
      handle: credentials.handle,
    };
    dispatch(signupUser(userData, props.history));
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <Grid container className={classes.formContainer}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Sign up
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            helperText={UI.errors.email}
            error={UI.errors.email ? true : false}
            className={classes.textField}
            value={credentials.email}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            helperText={UI.errors.password}
            error={UI.errors.password ? true : false}
            className={classes.textField}
            value={credentials.password}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirm password"
            helperText={UI.errors.confirmPassword}
            error={UI.errors.confirmPassword ? true : false}
            className={classes.textField}
            value={credentials.confirmPassword}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="handle"
            helperText={UI.errors.handle}
            error={UI.errors.handle ? true : false}
            className={classes.textField}
            value={credentials.handle}
            onChange={inputHandler}
            fullWidth
          />
          {UI.errors.error && (
            <Typography className={classes.customError} variant="body2">
              {UI.errors.error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={UI.loading}
          >
            Sign Up
            {UI.loading && (
              <CircularProgress size={23} className={classes.progress} />
            )}
          </Button>
        </form>
        <small>
          <Link to="/login">Log In</Link>
        </small>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Signup);
