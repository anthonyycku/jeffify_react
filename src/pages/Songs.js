import axios from "axios";
import "./css/songs.css"
import React, { useState, useEffect } from "react";
import Loader from "../Loader"
import AudioPlayer from "../AudioPlayer"


export default function Songs(props) {
    const [songs, setSongs] = useState([])
    const [album, setAlbum] = useState(null)
    const { setQueue } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        getSongs();
        getAlbum();
    }, [])

    const getSongs = () => {
        const { albumID } = props;
        axios.get("https://jeffify.herokuapp.com/songs/" + albumID).then(response => {
            setSongs(response.data)
        })
    }
    const getAlbum = () => {
        const { albumID } = props;
        axios.get("https://jeffify.herokuapp.com/albums/" + albumID).then(response => {
            setAlbum(response.data)
        })
    }

    const playClick = (link, album) => {
        props.setCurrentAlbum(album);
        setQueue([{ audio: link }]);
        props.setqindex(0);
    }


    if (songs.length > 0 && album !== null) {
        const { image, name, artist, year } = album
        return (
            <div className="songsContainer">
                <div className="row albumHeader">
                    <div className="col-sm-6 albumPic">
                        <img src={image} />
                        <div className="albumInfo">
                            <h1>{name}</h1>
                            <h4>{artist}</h4>
                            <h5>{year}</h5>
                            <h5><i class="fad fa-layer-group"></i> {songs.length} songs</h5>
                        </div>
                    </div>
                </div>
                {songs.map(result => {
                    return <div className="row songRow" key={result.id}>
                        <div className="col-sm-10 song">

                            <div className="songPlay" onClick={() => playClick(result.audio, result.album)}>
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <span style={{ marginLeft: "20px" }}>{result.name}</span>

                        </div>

                    </div>

                })}
            </div>
        )
    } else {
        return <Loader />
    }
}