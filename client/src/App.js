import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";
import Tinder from "./view/Tinder";
import Summary from "./view/Summary";
import Settings from "./view/Settings";
import Test from "./view/Test";

function App() {
  return (
    <div className="min-h-screen h-screen min-w-screen w-screen bg-gradient-to-b from-slate-100 to-white-100 relative">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/tinder" element={<Tinder />} />
          <Route exact path="/summary" element={<Summary />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/test" element={<Test />} />
          <Route path="*" element={<Navigate to="/settings" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
