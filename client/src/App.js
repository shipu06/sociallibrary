import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import OtoDom from "./view/OtoDom.js";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/otodom" component={OtoDom} />
        <Route exact path="/olx" component={() => <h1>OLX</h1>} />
        <Route exact path="/gumtree" component={() => <h1>Gumtree</h1>} />
        <Redirect to="/otodom" />
      </Switch>
    </>
  );
}

export default App;
