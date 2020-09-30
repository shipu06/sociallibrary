import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./mainContent.css";

import Books from "./AllBooksPage/AllBooks";
import Admin from "./AddBooksPage/Admin";
import UserBooks from "./UserBooksPages/UserBooks";

import { getUserBooks } from "../../../utils/getBooks";
import fetchMarkers from "../../../utils/fetchMarkers";

export default function MainContent() {
  const searchPhrase = useSelector(
    (state) => state.books_store.filters.searchPhrase
  );

  return (
    <div className="content__main">
      {searchPhrase.length ? (
        <>
          <h1>Searching for '{searchPhrase}'</h1>
          <Books />
        </>
      ) : (
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/myBooks">
            <UserBooks
              title={"Books that you have created:"}
              fetchCallback={getUserBooks}
            />
          </Route>
          <Route exact path="/markers">
            <UserBooks
              title={"Books that you have marked:"}
              fetchCallback={fetchMarkers.getUserMarkers}
            />
          </Route>
          <Route exact path="/add" component={Admin} />
        </Switch>
      )}
    </div>
  );
}
