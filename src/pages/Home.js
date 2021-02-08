import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";
import Loader from '../Loader';

export default function Home(props) {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
        getAlbums();
    }, [])

    const getAlbums = () => {
        axios.get("https://jeffify.herokuapp.com/albums").then(response => {
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

    const randomizeAlbum = () => {
        let newAlbum = albums;
        for (let i = newAlbum.length - 1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * newAlbum.length)
            let temp = newAlbum[i];
            newAlbum[i] = newAlbum[randomIndex];
            newAlbum[randomIndex] = temp;
        }
        setAlbums(previous => [...newAlbum])
    }

    if (albums.length > 0) {
        return (
            <div className="homeContainer">
                <div className="row">
                    <div className="col-sm-12 feature">
                        <h1>WELCOME TO <span>JEFFIFY</span></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 featureText">
                        <h5>FEATURED</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 randomDiv">
                        <button onClick={() => randomizeAlbum()} className="randomize"><i class="fas fa-random"></i></button>
                        <p>Randomize</p>
                    </div>
                </div>

                <div className="row albumContainer">
                    <div className="col-sm-9 albumsBox">
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
                                <p className="artist">{result.artist}</p>
                            </div>
                        })}
                    </div>
                </div>

            </div>
        )
    } else {
        return <Loader />
    }
}