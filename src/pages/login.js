import React, { useState, useEffect } from "react";
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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import { CLEAR_ERRORS } from "../types";

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

  useEffect(() => {
    dispatch({ type: CLEAR_ERRORS });
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container className={classes.formContainer}>
      <Grid item sm />
      <Grid item sm>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" className={classes.pageTitle}>
          Sign in
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email Address *"
            helperText={UI.errors.email}
            error={UI.errors.email ? true : false}
            className={classes.textField}
            value={credentials.email}
            onChange={inputHandler}
            fullWidth
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password *"
            helperText={UI.errors.password}
            error={UI.errors.password ? true : false}
            className={classes.textField}
            value={credentials.password}
            onChange={inputHandler}
            fullWidth
            variant="outlined"
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
            color="primary"
            className={classes.button}
            disabled={UI.loading}
            fullWidth
          >
            Log In
            {UI.loading && (
              <CircularProgress size={23} className={classes.progress} />
            )}
          </Button>
        </form>
        <Typography variant="body2" className={classes.signLink}>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);
