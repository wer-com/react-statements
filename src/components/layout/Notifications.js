import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../../actions/userActions";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

const Notifications = () => {
  const [anchorElement, setAnchorElement] = useState(null);

  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.user.notifications);

  const handleOpen = (event) => {
    setAnchorElement(event.target);
  };

  const handleClose = (event) => {
    setAnchorElement(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);
    dispatch(markNotificationsRead(unreadNotificationsIds));
  };

  let notificationIcon;

  if (notifications && notifications.length > 0) {
    let len = notifications.filter((notification) => notification === false)
      .length;
    len > 0
      ? (notificationIcon = (
          <Badge badgeContent={len} color="primary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  dayjs.extend(relativeTime);

  let notificationsMarkUp =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb = notification.type === "like" ? "liked" : "commented on";
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? "secondary" : "primary";
        const icon =
          notification.type === "like" ? (
            <FavoriteIcon color={iconColor} />
          ) : (
            <ChatIcon color={iconColor} />
          );

        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${notification.recipient}/statement/${notification.statementId}`}
            >
              {notification.sender} {verb} your statement {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
    );

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton
          aria-owns={anchorElement ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkUp}
      </Menu>
    </React.Fragment>
  );
};

export default Notifications;
