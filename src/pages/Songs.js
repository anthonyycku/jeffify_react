import axios from "axios";
import "./css/songs.css"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader"
import Options from "./options/Options"
import ShowPlaylists from "./options/AddPlaylist"


export default function Songs(props) {
    const [songs, setSongs] = useState([])
    const [album, setAlbum] = useState(null)

    const { queue, setQueue, song, setPlaying, setCurrentAlbum, setSongID } = props;

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



    const activateOptions = (index) => {

        if (!document.getElementById(index).classList.contains("showOptions")) {
            document.getElementById(index).classList.add("showOptions");
            let optionsID = document.getElementById(index);
            let options = document.getElementsByClassName("options-list");
            for (let i = 0; i < options.length; i++) {
                if (options[i].classList.contains("showOptions") && options[i] !== optionsID) {
                    options[i].classList.remove("showOptions");
                }
            }
        } else {
            document.getElementById(index).classList.remove("showOptions");
            let options = document.getElementsByClassName("options-list");
            for (let i = 0; i < options.length; i++) {
                if (options[i].classList.contains("showOptions")) {
                    options[i].classList.remove("showOptions");
                }
            }
        }
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
                {songs.map((result, index) => {
                    return <div className="row songRow" key={result.id}>
                        <div className="col-sm-10 song">
                            {/* Play button */}
                            <div className="songPlay" onClick={() => playClick(result)}>
                                <i class="fas fa-play-circle"></i>
                            </div>
                            {/* Song text */}
                            <div>
                                <p>
                                    <span style={{ marginLeft: "20px" }}>{result.song}</span>
                                    {song && song.song === result.song ?
                                        <span className="currentlyplaying"><i class="far fa-volume-up"></i></span>
                                        :
                                        null
                                    }
                                </p>
                            </div>
                            {/* dots */}
                            <div className="options" onClick={() => activateOptions("options" + index)}>
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                            <div id={"options" + index} className="options-list">
                                <Options
                                    result={result}
                                    queue={queue}
                                    setPlaying={setPlaying}
                                    setCurrentAlbum={setCurrentAlbum}
                                    songID={result.id}
                                    setSongID={setSongID}
                                />
                            </div>
                        </div>
                    </div>
                })}
            </div>
        )
    } else {
        return <Loader />
    }
}