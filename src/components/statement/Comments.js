import React, { useState, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const styles = {
  commentImage: {
    height: 200,
    width: 200,
    objectFit: "cover",
  },
  a: {
    color: "#00bcd4",
  },
};

const Comments = (props) => {
  const { comments, classes } = props;
  return (
    <Grid container>
      {comments &&
        comments.map((comment) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt + userHandle}>
              <Grid item sm={12} className={classes.commentContainer}>
                <Grid container>
                  <Grid item sm={5}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={7}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                      >
                        @{userHandle}
                      </Typography>
                      <Typography variant="body2">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr style={{ border: "none" }} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr />
            </Fragment>
          );
        })}
    </Grid>
  );
};

export default withStyles(styles)(Comments);
