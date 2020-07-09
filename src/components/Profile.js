import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { uploadImage } from "../actions/userActions";

const styles = {
  "profile-image": {
    height: 200,
  },
};

const Profile = (props) => {
  const user = useSelector((state) => state.user);

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
  console.log(user);

  const { loading, authenticated } = user;

  const dispatch = useDispatch();

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
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <Tooltip title="change profile picture" placement="top">
              <IconButton onClick={handleEditPicture} className="button">
                <EditIcon color="secondary" />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            />
            @{handle}
            <hr />
            {bio && <Typography variant="body1">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary">
                  <span>{location}</span>
                </LocationOn>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary">
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {"  "} {website}
                  </a>
                </LinkIcon>
                <hr />
              </Fragment>
            )}
            {createdAt && (
              <Fragment>
                <CalendarToday color="primary">
                  {" "}
                  <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </CalendarToday>
                <hr />
              </Fragment>
            )}
          </div>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );
  return profileMarkup;
};

export default withStyles(styles)(Profile);
