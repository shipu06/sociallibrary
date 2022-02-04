import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Menu from "./components/Menu";

import OtoDom from "./view/OtoDom.js";
import Tinder from "./view/Tinder.js";
import Settings from "./view/Settings";
import Summary from "./view/Summary";
import Swiper from "./view/Swiper";

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/otodom" component={OtoDom} />
        <Route exact path="/tinder" component={Tinder} />
        <Route exact path="/swiper" component={Swiper} />
        <Route exact path="/olx" component={() => <h1>OLX</h1>} />
        <Route exact path="/gumtree" component={() => <h1>Gumtree</h1>} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/summary" component={Summary} />
        <Redirect to="/settings" />
      </Switch>
    </>
  );
}

export default App;
