import axios from "axios";
import "./css/songs.css"
import React, { useState, useEffect } from "react";
import Loader from "../Loader"


export default function Songs(props) {
    const [songs, setSongs] = useState([])
    const [album, setAlbum] = useState(null)

    useEffect(() => {
        getSongs();
        getAlbum();
    }, [])

    const getSongs = () => {
        const { albumID } = props.location.state
        axios.get("https://jeffify.herokuapp.com/specific/" + albumID).then(response => {
            setSongs(response.data)
        })
    }
    const getAlbum = () => {
        const { albumID } = props.location.state;
        axios.get("https://jeffify.herokuapp.com/find/" + albumID).then(response => {
            setAlbum(response.data)
        })
    }

    if (songs.length > 0 && album !== null) {
        const { image, name, artist } = album
        return (
            <div className="songsContainer">
                <div className="row albumHeader">
                    <div className="col-sm-6 albumPic">
                        <img src={image} />
                        <div className="albumInfo">
                            <h1>{name}</h1>
                            <h4>{artist}</h4>
                            <h5><i class="fad fa-layer-group"></i> {songs.length} songs</h5>
                        </div>
                    </div>
                </div>
                {songs.map(result => {
                    return <div className="row songRow">
                        <div className="col-sm-10 song">
                            <p><i class="fas fa-play-circle"></i> <span>{result.name}</span></p>
                        </div>

                    </div>

                })}
            </div>
        )
    } else {
        return <Loader />
    }
}