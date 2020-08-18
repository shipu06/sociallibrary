import React from "react";
import Books from "./Books.js";
import { Route, Switch } from "react-router-dom";

export default function MainContent() {
  return (
    <div className="content__main">
      <Switch>
        <Route exact path="/books" render={<Books />} />
        {/* <Route exact path="/book" render={<p>33</p>} /> */}
      </Switch>
    </div>
  );
}
