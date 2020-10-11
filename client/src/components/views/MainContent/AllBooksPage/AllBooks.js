import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Modal from "./Sections/Modal/Modal";
import Filters from "./Sections/Filters";
import SelectedFilters from "./Sections/SelectedFilters";
import Book from "./Sections/Book";

import markersAPI from "utils/markersAPI";

export default function AllBooks() {
  const books = useSelector((state) => state.books_store.books) || false;

  const [markedBooks, setMarkedBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sizeOfCards, setSizeOfCards] = useState(0);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    markersAPI.getUserMarkers((res) => {
      setMarkedBooks(res);
      setIsLoaded(true);
    });
  }, []);

  if (!books || !isLoaded) return <>Loading...</>;

  const listOfBooks = books.map((book, id) => (
    <Book
      key={book._id}
      id={id}
      book={book}
      markedBooks={markedBooks}
      handleModalOpen={() => {
        setModalContent(book);
        handleModalOpen();
      }}
      sizeOfCards={sizeOfCards}
    />
  ));

  const noResults = <h1 style={{ padding: ".5em" }}>No results</h1>;

  return (
    <div className="allBooks">
      <Filters setSizeOfCards={setSizeOfCards} />
      <SelectedFilters />
      <Grid spacing={4} container>
        {books.length ? listOfBooks : noResults}
      </Grid>
      <Modal
        modalContent={modalContent}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}
