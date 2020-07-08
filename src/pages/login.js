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
import { loginUser } from "../actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Login = (props) => {
  const dispatch = useDispatch();
  const UI = useSelector((state) => state.UI);
  const { classes } = props;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: credentials.email,
      password: credentials.password,
    };
    dispatch(loginUser(userData, props.history));
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
          Login
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
          {UI.errors.error && (
            <Typography
              color={"error"}
              className={classes.customError}
              variant="body2"
            >
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
            Log In
            {UI.loading && (
              <CircularProgress size={23} className={classes.progress} />
            )}
          </Button>
        </form>
        <small>
          Create an <Link to="/signup">account</Link>
        </small>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);
