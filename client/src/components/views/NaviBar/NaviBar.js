import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import UserMenu from "./UserMenu.js";

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

import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Icon, InlineIcon } from "@iconify/react";
import bookIcon from "@iconify/icons-subway/book";
import { Link } from "react-router-dom";

import { setFilter } from "../../../_actions/books_actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  const searchPhrase = useSelector(
    (state) => state.books_store.filters.searchPhrase
  );
  const dispatch = useDispatch();

  return (
    <div className={classes.grow}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Toolbar
            classes={{
              root: classes.toolbar,
            }}
          >
            <a href="/">
              <Icon
                className={classes.logo}
                icon={bookIcon}
                style={{ fontSize: "38px" }}
              />
            </a>
            <span className={classes.logoText}>
              online<b>LIBRARY</b>
            </span>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                onChange={(e) => {
                  dispatch(setFilter({ searchPhrase: e.target.value }));
                }}
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
            <UserMenu type="mobile" />
          </Toolbar>
        </Grid>
        <UserMenu type="desktop" />
      </Grid>
    </div>
  );
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
