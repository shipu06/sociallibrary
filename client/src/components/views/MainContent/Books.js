import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./mainContent.css";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Modal from "./Modal";
import Filters from "./Filters";
import { books } from "../../../utils/books";

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
    borderRadius: 20,
    [theme.breakpoints.down("md")]: {
      margin: "0px 20px 10px 0",
      height: "auto",
    },
  },
}));

export default function NestedGrid() {
  const classes = useStyles();

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const listOfBooks = books.map((book, id) => (
    <Grid id={id} item xs={12} md={4}>
      <Paper className={classes.paper}>
        <Book
          id={id}
          book={book}
          handleModalOpen={() => {
            setModalContent(book);
            handleModalOpen();
          }}
        />
      </Paper>
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Filters />
      <Grid spacing={4} container>
        {listOfBooks}
      </Grid>
      <Modal
        modalContent={modalContent}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export const Book = ({ book, handleModalOpen }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(book.rating);
  return (
    <div className="book">
      {console.log(book)}
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
        <div className="books__buttons">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
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
      </div>
    </div>
  );
};
