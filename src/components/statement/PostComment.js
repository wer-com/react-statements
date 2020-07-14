import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { submitComment } from "../../actions/dataActions";
import { useSelector, useDispatch } from "react-redux";

const styles = {
  commentInput: { marginTop: 10, marginBottom: 20 },
  commentButton: { marginBottom: 20 },
};

const PostComment = (props) => {
  const user = useSelector((state) => state.user);

  const UI = useSelector((state) => state.UI);

  const { authenticated } = user;

  const { classes } = props;

  const dispatch = useDispatch();

  const [body, setBody] = useState("");

  const inputHandler = (e) => {
    setBody(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(submitComment(props.statementId, { body: body }));
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={submitHandler}>
        <TextField
          name="body"
          type="text"
          label="Comment on statement"
          error={UI.errors.comment ? true : false}
          helperText={UI.errors.comment}
          value={body}
          onChange={inputHandler}
          fullWidth
          multiline
          rows="3"
          className={classes.commentInput}
        ></TextField>{" "}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.commentButton}
          fullWidth
        >
          Post a Comment!
        </Button>
      </form>
    </Grid>
  ) : null;
  return commentFormMarkup;
};
export default withStyles(styles)(PostComment);
