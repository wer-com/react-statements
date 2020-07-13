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
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import Comments from "./Comments";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import PatternButton from "../../util/PatternButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getStatement } from "../../actions/dataActions";
import PostComment from "./PostComment";

const DialogStatement = (props) => {
  const [open, setOpen] = useState(false);

  const [oldPath, setOldPath] = useState(null);

  const [newPath, setNewPath] = useState(null);

  const UI = useSelector((state) => state.UI);
  const statement = useSelector((state) => state.data.statement);
  const dispatch = useDispatch();
  const {
    statementId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments,
  } = statement;
  const { loading } = UI;

  const handleOpen = () => {
    let oldPathVar = window.location.pathname;
    const { userHandle, statementId } = props;
    const newPathVar = `/users/${userHandle}/statement/${statementId}`;
    if (oldPathVar === newPathVar) oldPathVar = `/users/${userHandle}`;

    window.history.pushState(null, null, newPathVar);

    setOpen(true);
    setOldPath(oldPathVar);
    setNewPath(newPathVar);
    dispatch(getStatement(props.statementId));
  };
  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    dispatch(clearErrors());
  };

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
    // eslint-disable-next-line
  }, []);

  const dialogMarkUp = loading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="profile" />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr />
        <Typography variant="body1">{body}</Typography>
        <LikeButton statementId={statementId} />
        <span>{likeCount} Likes</span>
        <PatternButton tip="comments">
          <ChatIcon color="secondary" />
        </PatternButton>

        <span>{commentCount} Comments</span>
      </Grid>
      <hr />
      <PostComment statementId={statementId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <Fragment>
      <PatternButton tip="show statement" onClick={handleOpen}>
        <UnfoldMore />
      </PatternButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <PatternButton tip="close" onClick={handleClose}>
          <CloseIcon color="secondary" />
        </PatternButton>

        <DialogContent>{dialogMarkUp}</DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogStatement;
