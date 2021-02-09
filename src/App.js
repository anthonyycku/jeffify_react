import './App.css';
// React Router
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import Songs from "./pages/Songs";
import Nav from "./Nav";
import Audiobox from "./Audiobox"

function App() {
  const [page, setPage] = useState("home");
  const [queue, setQueue] = useState([]);
  const [qindex, setqindex] = useState(0);
  const [repeat, setRepeat] = useState();

  const [currentAlbum, setCurrentAlbum] = useState();
  const [albumID, setAlbumID] = useState();
  const [artistID, setArtistID] = useState();


  return (
    <div className="container-fluid">
      <Router>
        <Nav setPage={setPage} page={page} />
        <Audiobox
          queue={queue}
          qindex={qindex}
          setqindex={setqindex}
          repeat={repeat}
          setRepeat={setRepeat} />
        <div className="bodyContainer">
          <Switch>
            <Route path="/home"
              render={() => <Home
                setQueue={setQueue}
                currentAlbum={currentAlbum}
                setCurrentAlbum={setCurrentAlbum}
                setAlbumID={setAlbumID}
                setqindex={setqindex}
                setArtistID={setArtistID}
              />} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/search" component={Search} />
            <Route path="/songs"
              render={() => <Songs
                albumID={albumID}
                setCurrentAlbum={setCurrentAlbum}
                setQueue={setQueue}
                setqindex={setqindex}
                song={queue[qindex]}
              />} />
            <Route path="/artist"
              render={() => <Artist
                artistID={artistID}
                setCurrentAlbum={setCurrentAlbum}
                setQueue={setQueue}
                setqindex={setqindex}
                song={queue[qindex]}
              />} />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>


      </Router>
    </div >
  );
}

export default App;
