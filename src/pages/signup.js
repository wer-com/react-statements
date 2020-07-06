import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Signup = (props) => {
  const { classes } = props;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {},
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
    axios
      .post("/signup", userData)
      .then((result) => {
        localStorage.setItem("IdToken", `Bearer ${result.data.token}`);
        setCredentials({ ...credentials, loading: false });
        props.history.push("/");
      })
      .catch((err) => {
        setCredentials({
          ...credentials,
          errors: err.response.data,
          loading: false,
        });
      });
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
            helperText={credentials.errors.email}
            error={credentials.errors.email ? true : false}
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
            helperText={credentials.errors.password}
            error={credentials.errors.password ? true : false}
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
            helperText={credentials.errors.confirmPassword}
            error={credentials.errors.confirmPassword ? true : false}
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
            helperText={credentials.errors.handle}
            error={credentials.errors.handle ? true : false}
            className={classes.textField}
            value={credentials.handle}
            onChange={inputHandler}
            fullWidth
          />
          {credentials.errors.error && (
            <Typography className={classes.customError} variant="body2">
              {credentials.errors.error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={credentials.loading}
          >
            Sign Up
            {credentials.loading && (
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
