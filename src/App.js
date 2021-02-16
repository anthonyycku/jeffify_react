import './css/App.css';
// React Router
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import axios from "axios";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Playlist from "./playlist/Playlist";
import Search from "./pages/Search";
import Songs from "./pages/Songs";
import Nav from "./navigation/Nav";
import Audiobox from "./audio/Audiobox"
import AudioPlayer from "./audio/AudioPlayer"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import CreatePlaylist from "./playlist/CreatePlaylist"
import PlaylistSongs from "./playlist/playlist_songs/PlaylistSongs"
import AddPlaylists from "./pages/options/AddPlaylist"

function App() {
  const { currentTime, setCurrentTime, duration, playing, setPlaying, setClickedTime } = AudioPlayer();

  //Audio states
  const [page, setPage] = useState("home");
  const [queue, setQueue] = useState([]);
  const [qindex, setqindex] = useState(0);
  const [repeat, setRepeat] = useState();
  const [random, setRandom] = useState();

  //song info state
  const [currentAlbum, setCurrentAlbum] = useState();
  const [albumID, setAlbumID] = useState();
  const [artistID, setArtistID] = useState();
  const [songID, setSongID] = useState();

  //Playlist state
  const [playlistID, setPlaylistID] = useState();

  // User state
  const [user, setUser] = useState()

  // User history
  const [lastPage, setLastPage] = useState("/home");

  useEffect(() => {
    window.addEventListener("click", (e) => {
      e.stopPropagation();
      if (document.getElementsByClassName("showOptions").length > 0) {
        if (e.target.className !== "list-group-item" && e.target.className !== "fas fa-ellipsis-h") {
          document.getElementsByClassName("showOptions")[0].classList.remove("showOptions")
        }
      }
    })

    return () => {
      window.removeEventListener("click", (e) => {
        e.stopPropagation();
        if (document.getElementsByClassName("showOptions").length > 0) {
          if (e.target.className !== "list-group-item" && e.target.className !== "fas fa-ellipsis-h") {
            document.getElementsByClassName("showOptions")[0].classList.remove("showOptions")
          }
        }
      })
    }

  }, [])



  return (
    <div className="container-fluid">

      <Router>

        <Nav
          setPage={setPage}
          page={page}
          user={user}
          setUser={setUser}
        />

        <Audiobox
          setQueue={setQueue}
          queue={queue}
          qindex={qindex}
          setqindex={setqindex}
          repeat={repeat}
          setRepeat={setRepeat}
          random={random}
          setRandom={setRandom}
          currentTime={currentTime}
          duration={duration}
          playing={playing}
          setPlaying={setPlaying}
          setClickedTime={setClickedTime}
          setCurrentAlbum={setCurrentAlbum}
        />

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
                setLastPage={setLastPage}
              />} />

            <Route path="/playlist"
              render={() => <Playlist
                user={user}
                setPage={setPage("playlist")}
                setPlaylistID={setPlaylistID}
              />}
            />

            <Route path="/search" render={() => <Search
              albumID={albumID}
              setAlbumID={setAlbumID}
              currentAlbum={currentAlbum}
              setArtistID={setArtistID}
              setCurrentAlbum={setCurrentAlbum}
              setQueue={setQueue}
              setqindex={setqindex}
              song={queue[qindex]}
              queue={queue}
              setPlaying={setPlaying}
              setSongID={setSongID}
              setLastPage={setLastPage}
            />} />

            <Route path="/songs"
              render={() => <Songs
                albumID={albumID}
                setArtistID={setArtistID}
                setCurrentAlbum={setCurrentAlbum}
                setQueue={setQueue}
                setqindex={setqindex}
                song={queue[qindex]}
                queue={queue}
                setPlaying={setPlaying}
                setSongID={setSongID}
                setLastPage={setLastPage}
              />} />

            <Route path="/artist"
              render={() => <Artist
                artistID={artistID}
                currentAlbum={currentAlbum}
                setAlbumID={setAlbumID}
                setCurrentAlbum={setCurrentAlbum}
                setQueue={setQueue}
                setqindex={setqindex}
                song={queue[qindex]}
                queue={queue}
                setPlaying={setPlaying}
                setSongID={setSongID}
                setLastPage={setLastPage}
              />} />

            <Route path="/signup"
              render={() => <Signup
                setUser={setUser}
                user={user}
              />}
            />

            <Route path="/login"
              render={() => <Login
                setUser={setUser}
                user={user}
              />}
            />

            <Route path="/createplaylist"
              render={() => <CreatePlaylist
                user={user}
              />}
            />

            <Route path="/playlistsongs"
              render={() => <PlaylistSongs
                user={user}
                albumID={albumID}
                setArtistID={setArtistID}
                setCurrentAlbum={setCurrentAlbum}
                setQueue={setQueue}
                setqindex={setqindex}
                song={queue[qindex]}
                queue={queue}
                setPlaying={setPlaying}
                setSongID={setSongID}
                playlistID={playlistID}
                setLastPage={setLastPage}
              />}
            />

            <Route path="/selectplaylists"
              render={() => <AddPlaylists
                user={user}
                songID={songID}
                lastPage={lastPage}
              />}
            />
            <Redirect from="/" to="/home" />

          </Switch>
        </div>


      </Router>
    </div >
  );
}

export default App;
