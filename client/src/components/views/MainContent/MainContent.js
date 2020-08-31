import React from "react";
import { Route, Switch } from "react-router-dom";
import Books from "./Books.js";
import UserBooks from "./UserBooks.js";

export default function MainContent() {
  return (
    <Switch>
      <Route exact path="/books" render={<Books />} />
      <Route exact path="/myBooks" render={<UserBooks />} />
    </Switch>
  );
}
