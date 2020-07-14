import React, { useState, useEffect, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { editUserDetails } from "../../actions/userActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import PatternButton from "../../util/PatternButton";

const styles = { textField: { marginBottom: 20 } };

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
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <PatternButton
        tip="edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="secondary" />
      </PatternButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
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
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Your location"
              className={classes.textField}
              value={info.location}
              onChange={changeHandler}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your instagram/website"
              className={classes.textField}
              value={info.website}
              onChange={changeHandler}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default withStyles(styles)(EditDetails);
