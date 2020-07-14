import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
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
import { useDispatch } from "react-redux";
import { uploadImage, logoutUser } from "../../actions/userActions";
import EditDetails from "./EditDetails";
import PatternButton from "../../util/PatternButton";

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

const Profile = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditPicture = (event) => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const {
    handle,
    location,
    bio,
    website,
    createdAt,
    imageUrl,
  } = user.credentials;

  const { loading, authenticated } = user;
  const { classes } = props;

  let profileMarkup = !loading ? (
    !authenticated ? (
      <Paper className={classes.paper}>
        <Typography
          variant="h5"
          align="center"
          color="inherit"
          style={{ padding: 10 }}
        >
          Register to fully experience Statements
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
            style={{ padding: 10 }}
          >
            Sign UP
          </Button>
          <Typography
            variant="body2"
            align="center"
            color="inherit"
            style={{ padding: 10 }}
            variant="h6"
          >
            or
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/login"
            style={{ padding: 10 }}
          >
            Log In
          </Button>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <PatternButton
              tip="change profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="secondary" />
            </PatternButton>
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
              <Fragment className={classes.location}>
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
          <PatternButton tip="log out" onClick={handleLogout}>
            <KeyboardReturn color="secondary" />
          </PatternButton>
          <EditDetails />
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );
  return profileMarkup;
};

export default withStyles(styles)(Profile);
