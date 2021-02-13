import "./css/playlist.css"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";

export default function Playlist(props) {
    const { user } = props;

    const img = "https://icons-for-free.com/download-icon-music-131964784909142833_512.png"
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (user) {
            getUserPlaylist();
        }
    }, [playlists])

    const getUserPlaylist = () => {
        axios.get("https://jeffify.herokuapp.com/user_playlists/" + user.id).then(response => {
            setPlaylists(response.data);
        })
    }


    if (!user) {
        return <div className="noentry">Please signup / login to access playlists.</div>
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

                            {props.currentAlbum === result.playlistName ?
                                <div>
                                    <Link to="/PlaylistSongs" style={{ cursor: "default" }}>
                                        <img style={{ opacity: "0.5" }} src={img} className="albumimage" />
                                    </Link>
                                    <div className="albumPlay"><i class="fas fa-volume-up"></i></div>
                                </div>
                                :
                                <div>
                                    <Link to="/PlaylistSongs" style={{ cursor: "default" }} className="profilebox">
                                        <img src={img} className="albumimage" />
                                    </Link>
                                    <div className="albumIcon"><i class="fal fa-play-circle"></i></div>
                                </div>
                            }
                            <hr className="playlistHR" />
                            <div className="playlistName">
                                <p>{result.playlistName}</p>
                            </div>

                        </div>
                    })}
                </div>
            </div>

        </div >
    }
}