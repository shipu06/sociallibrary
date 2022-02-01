import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import OtoDom from "./view/OtoDom.js";
import Menu from "./components/Menu";
import Settings from "./view/Settings";

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/otodom" component={OtoDom} />
        <Route exact path="/olx" component={() => <h1>OLX</h1>} />
        <Route exact path="/gumtree" component={() => <h1>Gumtree</h1>} />
        <Route exact path="/settings" component={Settings} />
        <Redirect to="/settings" />
      </Switch>
    </>
  );
}

export default App;
