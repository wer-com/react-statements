import React from "react";
import Noimg from "../images/noimg.png";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

const styles = {
  handle: {
    background: "#008394",
    height: 30,
    width: 100,
    margin: "0 auto",
    marginTop: 20,
  },
  paper: {
    textAlign: "center",
    padding: 20,
  },
  desc: {
    background: "#aaa",
    height: 20,
    width: 100,
    margin: "0 auto",
    marginTop: 20,
  },
  profile: {
    "& .image-wrapper": {
      position: "relative",
      textAlign: "center",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
  },
};

function LoadingProfile(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={Noimg} alt="profile" className="profile-image" />
          </div>
          <div className="profile-details">
            <div className={classes.handle} />
            <div className={classes.desc} />
          </div>
        </div>
      </Paper>
    </div>
  );
}
export default withStyles(styles)(LoadingProfile);
