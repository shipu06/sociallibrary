import React, { useState, useEffect } from "react";
import { Book } from "./Books";
import Grid from "@material-ui/core/Grid";

export default function UserBooks({ title, fetchCallback }) {
  const [books, setBooks] = useState([]);

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
              <Book id={id} book={book} buttons={false} />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
