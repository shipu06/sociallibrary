import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import Books from "./views/MainContent/Books.js";
import Admin from "./views/MainContent/Admin.js";

import NaviBar from "./views/NaviBar/NaviBar";
import Menu from "./views/Menu/Menu";
import MainContent from "./views/MainContent/MainContent";

import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../_actions/books_actions.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBooks());
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
              <Route exact path="/books">
                <Books />
              </Route>
              <Route exact path="/admin" component={Admin} />
            </Switch>
          )}
        </div>
      </div>

      {/* <NavBar /> */}
      {/* <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />

          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div> */}
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
