import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab
          classes={{ root: classes.option }}
          icon={<PhoneIcon />}
          label="RECENTS"
        />
        <Tab
          classes={{ root: classes.option }}
          icon={<FavoriteIcon />}
          label="FAVORITES"
        />
        <Tab
          classes={{ root: classes.option }}
          icon={<PersonPinIcon />}
          label="NEARBY"
        />
      </Tabs>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    width: "calc(100vw - 2em)",
    borderRadius: "10px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    zIndex: "99",
  },
  option: {
    fontSize: "12px",
    textTransform: "lowercase",
    textColor: "#00b0f6",
  },
}));
