import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Noimg from "../images/noimg.png";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = {
  handle: {
    backgroundColor: "#673ab7",
    height: 30,
    width: 180,
  },
  card: {
    display: "flex",
    marginBottom: 20,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  image: {
    minWidth: 200,
    minHeight: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
    position: "relative",
    "& .button-delete": {
      position: "absolute",
      top: 20,
      right: 0,
    },
  },
};

function LoadingStatements(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={Noimg}
          title="profile image"
        />
        <CardContent className={classes.content}>
          <div className={classes.handle}></div>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={Noimg}
          title="profile image"
        />
        <CardContent className={classes.content}>
          <div className={classes.handle}></div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
export default withStyles(styles)(LoadingStatements);
