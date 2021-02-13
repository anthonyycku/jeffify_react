import "./css/showplaylists.css"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function AddPlaylist(props) {
    const { user, songID } = props;
    const img = "https://icons-for-free.com/download-icon-music-131964784909142833_512.png"

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (user) {
            getUserPlaylist();
        }
    }, [])

    const getUserPlaylist = () => {
        axios.get("https://jeffify.herokuapp.com/user_playlists/" + user.id).then(response => {
            setPlaylists(response.data);
        })
    }

    const addSong = (playlist_id) => {
        let object = { "songID": songID, "playlistID": playlist_id }
        axios.post(`https://jeffify.herokuapp.com/addtoplaylist/${songID}/${playlist_id}`)
            .then(response => {
                console.log(response.data);
            })
    }

    if (!user) {
        return <div className="noentry">Please signup / login to use this feature.</div>
    } else {
        return <div className="homeContainer">
            <div className="row">
                <div className="col-sm-12 featureText">
                    <h5>SELECT A PLAYLIST</h5>
                </div>
            </div>

            <div className="row albumContainer">
                <div className="col-sm-9 albumsBox">
                    {playlists.map(result => {
                        return <div className="album playlistalbum selectPlaylist">
                            <Link onClick={() => addSong(result.id)} to="/home" style={{ cursor: "default" }} className="profilebox">
                                <img src={img} className="albumimage" />
                            </Link>
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