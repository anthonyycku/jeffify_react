import './App.css';
// React Router
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import Songs from "./pages/Songs";
import Nav from "./Nav";
import Audiobox from "./Audiobox"

function App() {
  const [page, setPage] = useState("home");
  const [queue, setQueue] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState();
  const [albumID, setAlbumID] = useState();

  return (
    <div className="container-fluid">
      <Router>
        <Nav setPage={setPage} page={page} />
        <Audiobox queue={queue} />
        <div className="bodyContainer">
          <Switch>
            <Route path="/home"
              render={() => <Home
                setQueue={setQueue}
                currentAlbum={currentAlbum}
                setCurrentAlbum={setCurrentAlbum}
                setAlbumID={setAlbumID}
              />} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/search" component={Search} />
            <Route path="/songs"
              render={() => <Songs albumID={albumID} setCurrentAlbum={setCurrentAlbum}
              />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>


      </Router>
    </div >
  );
}

export default App;
