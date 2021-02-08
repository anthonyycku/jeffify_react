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

  useEffect(() => {
    let audio = document.getElementById("audio");
    audio.addEventListener("ended", function () {
      let newQueue = queue;
      newQueue.shift();
      setQueue(queue => [...newQueue]);
    })
  }, [queue])

  return (
    <div className="container-fluid">
      <Router>
        <Nav setPage={setPage} page={page} />
        <Audiobox setQueue={setQueue} queue={queue} />
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
              render={() => <Songs
                albumID={albumID}
                setCurrentAlbum={setCurrentAlbum}
                setQueue={setQueue}
              />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>


      </Router>
    </div >
  );
}

export default App;
