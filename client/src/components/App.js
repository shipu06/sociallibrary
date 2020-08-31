import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import Books from "./views/MainContent/Books.js";
import Admin from "./views/MainContent/Admin.js";

import NaviBar from "./views/NaviBar/NaviBar";
import Menu from "./views/Menu/Menu";
import UserBooks from "./views/MainContent/UserBooks";

import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../_actions/books_actions.js";
import { loadSessionData } from "../_actions/user_actions";
import { getUserBooks } from "../utils/getBooks";
import fetchMarkers from "../utils/fetchMarkers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBooks());
    dispatch(loadSessionData());
  }, []);

  const searchPhrase = useSelector(
    (state) => state.books_store.filters.searchPhrase
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NaviBar />
      <div className="content">
        <Menu />
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
      </div>

      {/* <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div> */}
    </Suspense>
  );
}

export default App;
