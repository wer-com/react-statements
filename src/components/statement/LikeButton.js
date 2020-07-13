import React from "react";
import PatternButton from "../../util/PatternButton";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import { likeStatement, unlikeStatement } from "../../actions/dataActions";

const LikeButton = (props) => {
  const user = useSelector((state) => state.user);
  const { statementId } = props;
  const dispatch = useDispatch();
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

  return likeButton;
};
export default LikeButton;
