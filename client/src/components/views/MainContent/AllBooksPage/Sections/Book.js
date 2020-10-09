import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import fetchMarkers from "utils/fetchMarkers";

const cardSizes = [4, 6];

export default function Book({
  book,
  handleModalOpen,
  buttons = true,
  fullsize = false,
  sizeOfCards = 0,
  key,
  children,
  markedBooks = [],
}) {
  const classes = useStyles();

  const createMarker = (id) => {
    fetchMarkers.create(id, (res) => {
      if (res.isSaved) setIsMarked(true);
    });
  };

  const deleteMarker = (id) => {
    fetchMarkers.remove(id, (res) => {
      if (res.isSaved) setIsMarked(false);
    });
  };

  const [isMarked, setIsMarked] = useState(
    markedBooks.length && markedBooks.some((mark) => mark._id === book._id)
  );

  return (
    <Grid item xs={12} md={fullsize ? 12 : cardSizes[sizeOfCards]}>
      <Paper className={isMarked ? classes.paperMarked : classes.paper}>
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
              key={key}
              className="book__rating"
              name={key}
              size="small"
              value={book.rating}
              readOnly
            />
            {!fullsize && (
              <span className="book__addedBy">added by: {book.addedBy}</span>
            )}

            {buttons && (
              <div className="books__buttons">
                <Button
                  variant={"contained"}
                  size="small"
                  color="primary"
                  className={classes.margin}
                  onClick={
                    isMarked
                      ? () => {
                          deleteMarker(book._id);
                        }
                      : () => {
                          createMarker(book._id);
                        }
                  }
                >
                  {isMarked ? "Unmark" : "mark"}
                </Button>
                <Button
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
        {children}
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
    borderRadius: "20px",
    position: "relative",
    color: theme.palette.text.secondary,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.11)",
    transition: ".5s",
    [theme.breakpoints.down("md")]: {
      margin: "0px 20px 0 0",
      height: "auto",
    },
  },
  paperMarked: {
    height: "22vh",
    borderRadius: "10px",
    textAlign: "center",
    position: "relative",
    color: theme.palette.text.secondary,
    boxShadow:
      "10px 15px 10px rgba(0, 20, 140, 0.15), 10px 15px 10px rgba(0, 20, 140, 0.15)",
    transition: ".5s",
    [theme.breakpoints.down("md")]: {
      margin: "0px 20px 10px 0",
      height: "auto",
    },
  },
}));