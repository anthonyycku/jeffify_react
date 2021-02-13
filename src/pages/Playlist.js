import "./css/playlist.css"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Loader from "../Loader"

export default function Playlist(props) {
    const { user, setPlaylistID } = props;

    const img = "https://icons-for-free.com/download-icon-music-131964784909142833_512.png"
    const [playlists, setPlaylists] = useState()
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (user) {
            getUserPlaylist();
        }
    }, [reset])

    const getUserPlaylist = () => {
        axios.get("https://jeffify.herokuapp.com/user_playlists/" + user.id).then(response => {

            setPlaylists(response.data);
        })
    }

    const deletePlaylist = (id) => {
        axios.delete("https://jeffify.herokuapp.com/deleteplaylist/" + id)
        setReset(!reset)
    }


    if (!user) {
        return <div className="noentry">Please signup / login to access playlists.</div>
    } else if (!playlists) {
        return <Loader />
    } else {
        return <div className="homeContainer">
            <div className="row">
                <div className="col-sm-12 feature">
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 featureText">
                    <h5>YOUR PLAYLISTS</h5>
                </div>
            </div>

            <div className="row albumContainer">
                <div className="col-sm-9 albumsBox">
                    {playlists.map(result => {
                        return <div className="album playlistalbum">
                            <div>
                                <Link onClick={() => setPlaylistID(result.id)} to="/PlaylistSongs" style={{ cursor: "default" }} className="profilebox">
                                    <img src={img} className="albumimage" />
                                </Link>
                            </div>

                            <hr className="playlistHR" />
                            <div className="playlistName">
                                <p>{result.playlistName}</p>
                            </div>
                            <button onClick={() => deletePlaylist(result.id)} className="btn btn-dark">X</button>
                        </div>
                    })}
                </div>
            </div>

        </div >
    }
}