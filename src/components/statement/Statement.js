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
import { likeStatement, unlikeStatement } from "../../actions/dataActions";
import PatternButton from "../../util/PatternButton";
import ChatIcon from "@material-ui/icons/Chat";
import DeleteStatement from "./DeleteStatement";
import DialogStatement from "./DialogStatement";
import LikeButton from "./LikeButton";

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

  const deleteButton =
    user.authenticated && user.credentials.handle === userHandle ? (
      <DeleteStatement statementId={statementId} />
    ) : null;

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
        <LikeButton statementId={statementId} />
        <span>{likeCount} Likes</span>
        <PatternButton tip="comments">
          <ChatIcon color="secondary" />
        </PatternButton>

        <span>{commentCount} Comments</span>
        <DialogStatement statementId={statementId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};
export default withStyles(styles)(Statement);
