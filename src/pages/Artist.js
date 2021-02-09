import axios from 'axios';
import "./css/artist.css";
import Loader from "../Loader";
import React, { useState, useEffect } from 'react';

export default function Artist(props) {
    const { artistID, song, setQueue } = props

    const [artist, setArtist] = useState();
    const [songs, setSongs] = useState();
    const [albums, setAlbums] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            getArtist();
            getSongs();
        }, 500)
    }, [])

    const getArtist = () => {
        axios.get("https://jeffify.herokuapp.com/artists/" + artistID).then(response => {
            setArtist(response.data)
        })
    }

    const getSongs = () => {
        axios.get("https://jeffify.herokuapp.com/artists/getall/" + artistID).then(response => {
            setSongs(response.data)
        })
    }

    const playClick = (song) => {
        props.setCurrentAlbum(song.album);
        setQueue([song]);
        props.setqindex(0);
    }


    if (!artistID || !songs || !artist) {
        return <Loader />
    } else {
        return (
            <div className="artistPage">
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
                {/* Songs list */}
                {songs.map(result => {
                    return <div className="row songRow" key={result.id}>
                        <div className="col-sm-10 song">

                            <div className="songPlay" onClick={() => playClick(result)}>
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <p>
                                <span style={{ marginLeft: "20px" }}>{result.name}</span>
                                {song && song.song === result.name ?
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
    }
}