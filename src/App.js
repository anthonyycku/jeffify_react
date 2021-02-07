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
  const [play, setPlay] = useState(false);

  useEffect(() => {
  }, [])

  // MUSIC METHODS
  function playAudio() {
    const audio = document.getElementById("audio");
    setPlay(true)
    audio.play();
  }
  function pauseAudio() {
    const audio = document.getElementById("audio");
    setPlay(false)
    audio.pause();
  }

  return (
    <div className="container-fluid">
      {/* AUDIO */}
      <audio id="audio">
        <source id="source" src="https://jeffify.s3.amazonaws.com/sorry.mp3" type="audio/mp3"></source>
      </audio>
      {/*  */}
      <Router>

        <Nav setPage={setPage} page={page} />

        {/* BODY */}
        <div className="bodyContainer">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/search" component={Search} />
            <Route path="/songs" component={Songs} />
            {/* <Route path="/createlist" component={ } /> */}
            <Redirect from="/" to="/home" />
          </Switch>
        </div>

        <Audiobox play={play} setPlay={setPlay} playAudio={playAudio} pauseAudio={pauseAudio} />

      </Router>
    </div >
  );
}

export default App;
