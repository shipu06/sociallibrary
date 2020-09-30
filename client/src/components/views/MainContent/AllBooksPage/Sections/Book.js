import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import fetchMarkers from "utils/fetchMarkers";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const cardSizes = [4, 6];

export default function Book({
  book,
  handleModalOpen,
  buttons = true,
  fullsize = false,
  sizeOfCards = 0,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(book.rating);

  const handleMarker = (id) => {
    fetchMarkers.create(id, (res) => {
      alert(res.message);
    });
  };
  return (
    <Grid item xs={12} md={fullsize ? 12 : cardSizes[sizeOfCards]}>
      <Paper className={classes.paper}>
        <div className="book">
          <img
            className="book__img"
            onClick={handleModalOpen}
            src={book.image}
            alt=""
          />
          <div className="book__info">
            <span className="book__category">{book.category}</span>
            <span className="book__title">{book.name}</span>
            <span className="book__year">{book.year}</span>
            <span className="book__author">written by: {book.author}</span>
            <span className="book__pages">{book.pages} pages</span>
            <Rating
              className="book__rating"
              name="simple-controlled"
              size="small"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <span className="book__addedBy">added by: {book.addedBy}</span>

            {buttons && (
              <div className="books__buttons">
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={() => {
                    console.log(book._id);
                    handleMarker(book._id);
                  }}
                >
                  add
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={handleModalOpen}
                >
                  see more
                </Button>
              </div>
            )}
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    fontFamily: "montserrat",
    marginRight: theme.spacing(1),
    fontSize: 11,
    textTransform: "lowercase",
    [theme.breakpoints.down("md")]: {
      fontSize: 10,
      padding: ".5em",
    },
  },
  paper: {
    height: "22vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.11)",
    [theme.breakpoints.down("md")]: {
      margin: "0px 20px 10px 0",
      height: "auto",
    },
  },
}));
