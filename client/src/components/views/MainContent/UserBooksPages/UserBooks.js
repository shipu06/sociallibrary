import React, { useState, useEffect } from "react";
import Book from "../AllBooksPage/Sections/Book";
import Modal from "../AllBooksPage/Sections/Modal";
import Grid from "@material-ui/core/Grid";

export default function UserBooks({ title, fetchCallback }) {
  const [books, setBooks] = useState([]);
  const [modalBook, setModalBook] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCallback((res) => {
      setBooks(res);
    });
  }, [fetchCallback]);

  return (
    <div style={{ flexGrow: 1 }}>
      {books.message ? (
        <h1 style={{ padding: ".5em" }}>No access, login or register</h1>
      ) : (
        <>
          <h1 style={{ padding: ".5em" }}>{title}</h1>
          <Grid spacing={4} container>
            {books.map((book, id) => (
              <Book
                handleModalOpen={() => {
                  setModalBook(book);
                  setModalOpen(true);
                }}
                id={id}
                book={book}
                buttons={false}
              />
            ))}
          </Grid>
          <Modal
            modalContent={modalBook}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
          />
        </>
      )}
    </div>
  );
}
