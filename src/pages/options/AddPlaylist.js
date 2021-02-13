import "./css/showplaylists.css"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PlaylistImage from "../playlistimage/PlaylistImage"
import Loader from "../../Loader"

export default function AddPlaylist(props) {
    const { user, songID } = props;

    const [playlists, setPlaylists] = useState([])
    const [images, setImages] = useState();

    useEffect(() => {
        if (user) {
            getUserPlaylist();
        }
    }, [])

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

    const addSong = (playlist_id) => {
        let object = { "songID": songID, "playlistID": playlist_id }
        axios.post(`https://jeffify.herokuapp.com/addtoplaylist/${songID}/${playlist_id}`)
            .then(response => {
                console.log(response.data);
            })
    }

    if (!user) {
        return <div className="noentry">Please signup / login to use this feature.</div>
    } else if (!playlists || !images) {
        return <Loader />
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
                        return <div className="playlistalbum selectPlaylist">
                            <Link onClick={() => addSong(result.id)} to="/home" style={{ cursor: "default" }} className="profilebox">
                                <PlaylistImage
                                    id={result.id}
                                    images={images}
                                />
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