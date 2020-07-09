import React, { useState, useEffect, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { editUserDetails } from "../actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import PatternButton from "../util/PatternButton";

const styles = (theme) => ({ ...theme.spreadThis });

const EditDetails = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { classes } = props;
  const { credentials } = user;
  const [info, setInfo] = useState({
    bio: "",
    website: "",
    location: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setUserInfo(Credential);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const setUserInfo = (credentials) => {
    setInfo({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      bio: info.bio,
      website: info.website,
      location: info.location,
    };
    dispatch(editUserDetails(userData));
    handleClose();
  };

  useEffect(() => {
    setUserInfo(credentials);
  }, []);
  return (
    <Fragment>
      <PatternButton
        tip="edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="secondary"></EditIcon>
      </PatternButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="Tell something about yourself"
              className={classes.textField}
              value={info.bio}
              onChange={changeHandler}
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Your location"
              className={classes.textField}
              value={info.location}
              onChange={changeHandler}
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={info.website}
              onChange={changeHandler}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitHandler} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default withStyles(styles)(EditDetails);
