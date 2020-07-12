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
  profileImage: {
    width: 200,
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
        <Typography variant="body2" align="center" color="primary">
          not profile found
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign UP
          </Button>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-image">
            <img
              src={imageUrl}
              alt="profile"
              className={classes.profileImage}
            />
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
