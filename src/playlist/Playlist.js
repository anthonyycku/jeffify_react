import './css/playlist.css'
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Loader from "../loader/Loader"
import PlaylistImage from "./playlistimage/PlaylistImage"

export default function Playlist(props) {
    const { user, setPlaylistID } = props;


    const [playlists, setPlaylists] = useState()
    const [images, setImages] = useState();
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                getUserPlaylist();
            }, 150)
        }
    }, [reset])

    const getUserPlaylist = () => {
        axios.get("https://jeffify.herokuapp.com/user_playlists/" + user.id).then(response => {
            setPlaylists(response.data);
            getImages();
        })
    }

    const getImages = () => {
        axios.get("https://jeffify.herokuapp.com/getplaylistpics/" + user.id).then(response => {
            let images = response.data;
            let result = {};

            for (let element of images) {
                if (!result[element.id]) {
                    result[element.id] = [element.image]
                } else {
                    let exists = [...result[element.id]];
                    if (!exists.includes(element.image)) {
                        result[element.id].push(element.image)
                    }
                }
            }
            for (let key in result) {
                result[key] = result[key].slice(0, 4);
            }

            setImages(result);
        })
    }

    const deletePlaylist = (id) => {
        axios.delete("https://jeffify.herokuapp.com/deleteplaylist/" + id).then(response => {
            setReset(!reset)
        })
    }


    if (!user) {
        return <div className="noentry">Please signup / login to access playlists.</div>
    } else if (!playlists || !images) {
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
                        return <div className="playlistalbum">
                            <div>
                                <Link onClick={() => setPlaylistID(result.id)} to="/PlaylistSongs" style={{ cursor: "default" }} className="profilebox">
                                    <PlaylistImage
                                        id={result.id}
                                        images={images}
                                    />
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