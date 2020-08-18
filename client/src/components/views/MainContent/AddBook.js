import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Book } from "./Books.js";
import Modal from "./Modal.js";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";

const categories = ["Fantasy", "Lalalala", "Bleblelbe", "Tyryry"];

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
];

const book1 = {
  id: 2,
  name: "Wzgórza jakieś ładne",
  category: "Przyrodnicze",
  pages: "302",
  year: "2010",
  rating: 4,
  description:
    "zajebista ksiazka o nr 2 Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  image: "https://www.tryngo.ch/img/no-img.jpg",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
    [theme.breakpoints.down("md")]: {
      padding: "0.1em",
    },
  },
  txtField: {
    width: "100%",
  },
}));

export default function AddBook() {
  const [book, setBook] = useState(book1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const classes = useStyles();

  const handleBookInput = ({ target: { name, value } }) => {
    setBook({ ...book, [name]: value });
  };

  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <h1>Add new book to your library: </h1>
      <Grid
        alignContent="center"
        container
        className={classes.root}
        spacing={1}
      >
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.name}
              id="standard-basic"
              label="Name"
              inputProps={{ name: "name" }}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.author}
              id="standard-basic"
              label="Author"
              inputProps={{ name: "author" }}
            />
          </Grid>

          <Grid item md={10} xs={12}>
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={categories}
              inputValue={book.category}
              onInputChange={(_, value) => {
                setBook({ ...book, category: value });

                console.log(value);
              }}
              getOptionLabel={(opt) => opt}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  id="standard-basic"
                  className={classes.txtField}
                />
              )}
            />
          </Grid>
          <Grid item md={5} xs={6}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.year}
              type="number"
              id="standard-basic"
              label="Year"
              inputProps={{ name: "year", min: 1900, max: 2020 }}
            />
          </Grid>
          <Grid item md={5} xs={6}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.pages}
              type="number"
              id="standard-basic"
              label="Number of pages"
              inputProps={{ name: "pages" }}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.image}
              id="standard-basic"
              label="Image"
              inputProps={{ name: "image" }}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              className={classes.txtField}
              onChange={handleBookInput}
              value={book.description}
              width="200px"
              id="standard-basic"
              label="Description"
              multiline
              rows={6}
              inputProps={{ name: "description" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenSnackbar}
            >
              SAVE THE BOOK
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          <div className="preview">
            <h4>Preview</h4>
            <Book
              book={book}
              on
              handleModalOpen={() => {
                setModalOpen(true);
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Modal
        modalContent={book}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Book added!
        </Alert>
      </Snackbar>
    </>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
