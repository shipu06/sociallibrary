import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@iconify/react";
import bookIcon from "@iconify/icons-subway/book";

export default function Logo() {
  const classes = useStyles();
  return (
    <>
      <a href="/">
        <Icon icon={bookIcon} style={{ fontSize: "38px", color: "#00b0f6" }} />
      </a>
      <span className={classes.logoText}>
        online<b>LIBRARY</b>
      </span>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
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
}));
