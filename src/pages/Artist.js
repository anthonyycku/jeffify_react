import axios from 'axios';
import "./css/artist.css";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Options from "./options/Options"

export default function Artist(props) {
    const { artistID, song, setQueue, queue, setPlaying } = props

    const [artist, setArtist] = useState();
    const [songs, setSongs] = useState();
    const [albums, setAlbums] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)

        getAlbums();

        setTimeout(() => {
            getSongs();
        }, 100)
        setTimeout(() => {
            getArtist();
        }, 200)

    }, [])

    const getArtist = () => {
        axios.get("https://jeffify.herokuapp.com/artists/" + parseInt(artistID)).then(response => {
            setArtist(response.data)
        })
    }

    const getSongs = () => {
        axios.get("https://jeffify.herokuapp.com/artistsongs/" + parseInt(artistID)).then(response => {
            setSongs(response.data)
        })
    }

    const getAlbums = () => {
        axios.get("https://jeffify.herokuapp.com/findalbum/" + artistID).then(response => {
            setAlbums(response.data);
        })
    }

    const getSpecificAlbum = (id, album) => {
        axios.get("https://jeffify.herokuapp.com/queue/" + id).then(response => {
            props.setQueue(response.data)
            props.setqindex(0)
        })
        props.setCurrentAlbum(album)
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


    if (!artistID || !songs || !artist || !albums) {
        return <Loader />
    } else {
        return (
            <div className="artistPage">
                {/* ARTIST NAME */}
                <div className="row">
                    <div className="col-sm-12 artistImage">
                        <img style={{ width: "200px", height: "200px" }} src={artist.image} alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 artistName">
                        <h3>{artist.name}</h3>
                    </div>
                </div>
                <hr />
                <div className="artistsongtitle">
                    <h3>All Songs <span>({songs.length})</span></h3>
                </div>
                {/* Songs list */}
                {songs.map((result, index) => {
                    return <div className="row songRow" key={result.id}>
                        <div className="col-sm-10 song">

                            <div className="songPlay" onClick={() => playClick(result)}>
                                <i class="fas fa-play-circle"></i>
                            </div>
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
                                <Options result={result} queue={queue} setPlaying={setPlaying} />
                            </div>
                        </div>
                    </div>
                })}
                {/* ALBUM TITLE */}
                <hr />

                <div className="artistsongtitle">
                    <h3>All Albums <span>({albums.length})</span></h3>
                </div>


                {/* ALBUMS */}
                <div className="row albumContainer">
                    <div className="col-sm-12 albumsBox">
                        {albums.map(result => {
                            return <div key={result.id} className="album">

                                {props.currentAlbum === result.name ?
                                    <div>
                                        <Link to="/songs" onClick={() => props.setAlbumID(result.id)} style={{ cursor: "default" }}>
                                            <img style={{ opacity: "0.5" }} src={result.image} className="albumimage" />
                                        </Link>
                                        <div onClick={() => getSpecificAlbum(result.id, result.name)} className="albumPlay"><i class="fas fa-volume-up"></i></div>
                                    </div>
                                    :
                                    <div>
                                        <Link to="/songs" onClick={() => props.setAlbumID(result.id)} style={{ cursor: "default" }} className="profilebox">
                                            <img src={result.image} className="albumimage" />
                                        </Link>
                                        <div onClick={() => getSpecificAlbum(result.id, result.name)} className="albumIcon"><i class="fal fa-play-circle"></i></div>
                                    </div>
                                }
                                <Link to="/songs" style={{ textDecoration: "none" }} onClick={() => props.setAlbumID(result.id)} >
                                    <p className="albumName">{result.name}</p>
                                </Link>
                                <div>
                                    <p className="artist" style={{ color: "white" }}>{result.year}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

            </div>
        )
    }
}