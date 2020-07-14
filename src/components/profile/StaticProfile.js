import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import dayjs from "dayjs";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import EditDetails from "./EditDetails";
import PatternButton from "../../util/PatternButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  paper: {
    textAlign: "center",
    padding: 20,
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
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
};

const StaticProfile = (props) => {
  const { classes } = props;
  const { handle, location, bio, website, createdAt, imageUrl } = props.profile;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="profile-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body1">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary"></LocationOn>
              <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary"></LinkIcon>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {"  "} {website}
              </a>
              <hr />
            </Fragment>
          )}
          <Fragment>
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            <hr />
          </Fragment>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StaticProfile);
