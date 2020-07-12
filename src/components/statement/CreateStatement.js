import React, { useState, useEffect, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { postStatement, clearErrors } from "../../actions/dataActions";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import PatternButton from "../../util/PatternButton";

const CreateStatement = () => {
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
    setBody("");
    dispatch({ type: "CLEAR_ERRORS" });
  };

  const inputHandler = (e) => {
    setBody(e.target.value);
  };

  const { loading, errors } = UI;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postStatement({ body: body }));
    if (body.trim() !== "") handleClose();
  };

  return (
    <Fragment>
      <PatternButton
        tip="Create a Statement"
        onClick={handleOpen}
        tip="Create a scream"
      >
        <AddIcon color="primary" />
      </PatternButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <PatternButton tip="close" onClick={handleClose}>
          <CloseIcon color="secondary" />
        </PatternButton>
        <DialogTitle>Post a statement</DialogTitle>
        <DialogContent>
          <form onSubmit={submitHandler}>
            <TextField
              name="body"
              id="body"
              type="text"
              label="Statement"
              multiline
              rows="3"
              placeholder="My statement"
              error={errors.body ? true : false}
              helperText={errors.body}
              onChange={inputHandler}
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress /> : null}
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
export default CreateStatement;
