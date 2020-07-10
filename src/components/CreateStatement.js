import React from "react";
// { useState, useEffect, Fragment }
// import withStyles from "@material-ui/core/styles/withStyles";
// import { editUserDetails } from "../actions/userActions";
// import Tooltip from "@material-ui/core/Tooltip";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import EditIcon from "@material-ui/icons/Edit";
// import IconButton from "@material-ui/core/IconButton";
// import { useDispatch, useSelector } from "react-redux";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { postStatement } from "../actions/dataActions";
import AddIcon from "@material-ui/icons/Add";
import PatternButton from "../util/PatternButton";

const CreateStatement = () => {
  return (
    <div>
      <PatternButton tip="Create a Statement">
        <AddIcon color="primary" />
      </PatternButton>
    </div>
  );
};
export default CreateStatement;
