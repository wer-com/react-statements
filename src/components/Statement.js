import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";
import { likeStatement, unlikeStatement } from "../actions/dataActions";
import PatternButton from "../util/PatternButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import DeleteStatement from "./DeleteStatement";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

const Statement = (props) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { statement, classes } = props;
  const {
    body,
    createdAt,
    userImage,
    statementId,
    likeCount,
    commentCount,
    userHandle,
  } = statement;

  dayjs.extend(relativeTime);

  const likedStatement = () => {
    if (
      user.likes &&
      user.likes.find((like) => like.statementId === statementId)
    ) {
      return true;
    } else return false;
  };

  const likeStatmentFunc = () => {
    dispatch(likeStatement(statementId));
  };

  const unlikeStatmentFunc = () => {
    dispatch(unlikeStatement(statementId));
  };

  const deleteButton =
    user.authenticated && user.credentials.handle === userHandle ? (
      <DeleteStatement statementId={statementId} />
    ) : null;

  const likeButton = !user.authenticated ? (
    <PatternButton tip="like">
      <Link to="/login">
        <FavoriteBorder color="secondary" />
      </Link>
    </PatternButton>
  ) : likedStatement() ? (
    <PatternButton tip="Undo Like" onClick={unlikeStatmentFunc}>
      <FavoriteIcon color="secondary" />
    </PatternButton>
  ) : (
    <PatternButton tip="Like" onClick={likeStatmentFunc}>
      <FavoriteBorder color="secondary" />
    </PatternButton>
  );

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color={"secondary"}
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <PatternButton tip="comments">
          <ChatIcon color="secondary" />
        </PatternButton>

        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};
export default withStyles(styles)(Statement);
