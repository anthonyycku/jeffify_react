import './App.css';
// React Router
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import Nav from "./Nav";
import Audiobox from "./Audiobox"

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="container-fluid">
      <Router>

        <Nav setPage={setPage} page={page} />

        {/* BODY */}
        <div className="bodyContainer">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/search" component={Search} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>

        <Audiobox />

      </Router>
    </div >
  );
}

export default App;
