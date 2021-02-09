import axios from "axios";
import "./css/songs.css"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader"


export default function Songs(props) {
    const [songs, setSongs] = useState([])
    const [album, setAlbum] = useState(null)
    const { setQueue, song } = props;

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

    const playClick = (song) => {
        props.setCurrentAlbum(song.album);
        setQueue([song]);
        props.setqindex(0);
    }


    if (songs.length > 0 && album !== null) {
        const { image, name, artist, year, id } = album
        return (
            <div className="songsContainer">
                <div className="row albumHeader">
                    <div className="col-sm-10 albumPic">
                        <img src={image} />
                        <div className="albumInfo">
                            <h1 className="songpagename">{name}</h1>
                            <Link to="/artist" style={{ textDecoration: "none" }} onClick={() => props.setArtistID(id)}>
                                <p className="songpageartist">{artist}</p>
                            </Link>
                            <h5>{year}</h5>
                            <h5><i class="fad fa-layer-group"></i> {songs.length} songs</h5>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="artistsongtitle">
                    <h3>Songs</h3>
                </div>
                {songs.map(result => {
                    return <div className="row songRow" key={result.id}>
                        <div className="col-sm-10 song">

                            <div className="songPlay" onClick={() => playClick(result)}>
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <p>
                                <span style={{ marginLeft: "20px" }}>{result.song}</span>
                                {song && song.song === result.song ?
                                    <span className="currentlyplaying"><i class="far fa-volume-up"></i></span>
                                    :
                                    null
                                }
                            </p>
                        </div>

                    </div>

                })}
            </div>
        )
    } else {
        return <Loader />
    }
}