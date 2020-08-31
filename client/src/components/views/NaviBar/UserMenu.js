import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";

import UserLoginRegisterModal from "./UserLoginRegisterModal";

import { Avatar } from "@material-ui/core";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { logoutUser } from "../../../_actions/user_actions";

export default function UserMenu({ type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const user = useSelector((state) => state.user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenu = (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-controls="primary-search-account-menu-mobile"
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </div>
  );

  const singIn = (
    <Grid item xs="12" md="3" className={classes.accountRegister}>
      <Toolbar
        classes={{
          root: classes.toolbarDestop,
        }}
      >
        <UserLoginRegisterModal title="Log in" type="login" />
        <UserLoginRegisterModal title="Register" type="register" />
      </Toolbar>
    </Grid>
  );
  if (user === null && type === "desktop") return singIn;

  if (type === "desktop" && user !== null)
    return (
      <Grid item xs="3" className={classes.account}>
        <Toolbar
          classes={{
            root: classes.toolbarDestop,
          }}
        >
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              alt={user.firstName}
              style={{ backgroundColor: "#00b0f6" }}
              src="/static/images/avatar/1.jpg"
            />
          </IconButton>
          <span className={classes.accountName}>
            {user.firstName} {user.lastName}
          </span>

          <IconButton
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            onClick={handleLogout}
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
        {renderMobileMenu}
        {renderMenu}
      </Grid>
    );

  if (type === "mobile" && user !== null) return [mobileMenu, renderMobileMenu];

  return null;
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: "#3C3C3C",
    backgroundColor: "white",
    borderRadius: "20px",
    // margin: "1em",
  },
  toolbarDestop: {
    display: "flex",
    justifyContent: "center",
    color: "#3C3C3C",
    backgroundColor: "white",
    borderRadius: "30px",
    margin: "0 0 2em 0",
  },
  toolbarU: {
    display: "flex",
    justifyContent: "center",
    color: "#3C3C3C",
    backgroundColor: "white",
    borderRadius: "30px",
    margin: "0 0 1em 0",
  },
  app: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
    // padding: theme.spacing(1),
  },
  menuButton: {
    margin: theme.spacing(2),
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.up("md")]: {
      marginRight: "2em",
    },
  },
  searchIcon: {
    color: "#999",
    cursor: "pointer",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    width: "100%",
    transition: theme.transitions.create("width"),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: `calc(1em + ${theme.spacing(4)}px)`,
    borderBottom: "1px solid #C9C9C9",
    "&:hover": {
      borderBottom: "1px solid #222",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 0,
      width: "30vw",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    color: "#00b0f6",
  },
  logoText: {
    display: "none",
    marginLeft: theme.spacing(1),
    color: "#3C3C3C",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  account: {
    padding: "0px 50px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    accountRegister: {
      padding: "0px 200px",
      order: 0,
      [theme.breakpoints.up("md")]: {
        order: 1,
      },
    },
  },
  accountName: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(4),
  },
}));
