import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Icon, InlineIcon } from "@iconify/react";
import bookIcon from "@iconify/icons-subway/book";

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
    margin: "0 0 3em 0",
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
  },
  accountName: {
    marginLeft: theme.spacing(2),
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
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

  return (
    <div className={classes.grow}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Toolbar
            classes={{
              root: classes.toolbar,
            }}
          >
            <Icon
              className={classes.logo}
              icon={bookIcon}
              style={{ fontSize: "38px" }}
            />
            <span className={classes.logoText}>
              online<b>LIBRARY</b>
            </span>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Grid>
        <Grid item xs="3" className={classes.account}>
          <Toolbar
            classes={{
              root: classes.toolbarDestop,
            }}
          >
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <span className={classes.accountName}> Dawid Kurpiel</span>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </Grid>
      </Grid>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
