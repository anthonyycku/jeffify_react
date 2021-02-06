import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";
import Loader from '../Loader';

export default function Home(props) {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        getAlbums();
    }, [])

    const getAlbums = () => {
        axios.get("https://jeffify.herokuapp.com/albums").then(response => {
            setAlbums(response.data)
        })
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

                <div className="row albumContainer">
                    <div className="col-sm-9 albumsBox">
                        {albums.map(result => {
                            return <div key={result.id} className="album">
                                <img src={result.image} />
                                <Link to={{ pathname: "/songs", state: { albumID: result.id } }} className="albumInfo">
                                    <p className="albumName">{result.name}</p>
                                    <p className="artist">{result.artist}</p>
                                </Link>
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