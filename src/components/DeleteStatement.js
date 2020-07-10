import React, { Fragment, useState } from "react";
import PatternButton from "../util/PatternButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { useDispatch } from "react-redux";
import { deleteStatement } from "../actions/dataActions";

const DeleteStatement = (props) => {
  const { statementId } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteStatementFunc = () => {
    dispatch(deleteStatement(statementId));
    setOpen(false);
  };
  return (
    <Fragment>
      <PatternButton
        tip="Delete Statement"
        onClick={handleOpen}
        btnClassName="button"
      >
        <DeleteOutline color="primary" />
      </PatternButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete Statement ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={deleteStatementFunc}> Delete </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default DeleteStatement;
