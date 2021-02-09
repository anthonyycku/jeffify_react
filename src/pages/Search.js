import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/search.css"
import Loader from "../Loader";


export default function Search(props) {
    const { setQueue, song } = props;

    const [noresult, setnoresult] = useState();

    const [allsongs, setallsongs] = useState();
    const [allalbums, setallalbums] = useState();
    const [allartists, setallartists] = useState();

    const [filteredsongs, setfilteredsongs] = useState([]);
    const [filteredalbums, setfilteredalbums] = useState([]);
    const [filteredartists, setfilteredartists] = useState([]);

    const [songresult, setsongresult] = useState(false);
    const [albumresult, setalbumresult] = useState(false);
    const [artistresult, setartistresult] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        getallsongs();
        getallalbums();
    }, [])

    const getallsongs = () => {
        axios.get("https://jeffify.herokuapp.com/songsearch").then(response => {
            setallsongs(response.data)
        })
    }

    const getallalbums = () => {
        axios.get("https://jeffify.herokuapp.com/albums").then(response => {
            setallalbums(response.data);
        })
    }

    const getallartists = () => {

    }

    const handleChange = (event) => {
        let lowerCaseSearch = event.target.value.toLowerCase();

        if (lowerCaseSearch.length > 1) {
            let resultsongs = allsongs.filter(result => result.song.toLowerCase().includes(lowerCaseSearch));
            setfilteredsongs(resultsongs);
            if (resultsongs.length > 0) {
                setsongresult(true);
            } else {
                setsongresult(false)
            }
            let resultalbums = allalbums.filter(result => result.name.toLowerCase().includes(lowerCaseSearch))
            setfilteredalbums(resultalbums);
            if (resultalbums.length > 0) {
                setalbumresult(true)
            } else {
                setalbumresult(false)
            }

            if (filteredsongs.length == 0 && filteredalbums.length == 0) {
                setnoresult(true);
            } else {
                setnoresult(false);
            }
        } else {
            setfilteredsongs([]);
            setfilteredalbums([]);
            setsongresult(false)
            setalbumresult(false)
            setnoresult(false)
        }

    }

    const playClick = (song) => {
        props.setCurrentAlbum(song.album);
        setQueue([song]);
        props.setqindex(0);
    }

    const getSpecificAlbum = (id, album) => {
        axios.get("https://jeffify.herokuapp.com/queue/" + id).then(response => {
            props.setQueue(response.data)
            props.setqindex(0)
        })
        props.setCurrentAlbum(album)
    }

    if (!allsongs || !allalbums) {
        return <Loader />
    } else {
        return (
            <div>
                <div className="row searchdiv">
                    <div className="col-sm-12 searchbox">
                        <label htmlFor="search">Search for songs, albums, artists</label>
                        {/* SEARCH BAR */}
                        <input onChange={(e) => handleChange(e)}
                            id="search"
                            type="text"
                            placeholder="Start Searching..."
                            autoComplete="off"
                        />
                    </div>
                </div>
                {noresult ?
                    <div className="row noresult">
                        <div className="col-sm-12">
                            <h3>No results match your input.</h3>
                        </div>
                    </div>
                    :
                    null}

                <div className="row songalbumrow">
                    {/* SONG FIND */}
                    {songresult ?
                        <div id="songresult">
                            <div className="artistsongtitle">
                                <h3>Songs</h3>
                            </div>
                            <div className="col-sm-10 songfind">

                                {filteredsongs.map(result => {
                                    return <div className="row songRow" key={result.id}>
                                        <div className="col-sm-10 song">

                                            <div className="songPlay" onClick={() => playClick(result)}>
                                                <i class="fas fa-play-circle"></i>
                                            </div>
                                            <p>
                                                <span style={{ marginLeft: "20px" }}>{result.song} -
                                            <span style={{ color: "rgb(121, 121, 121)" }}> {result.artist}</span></span>
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
                        </div>
                        :
                        null
                    }


                    {/* ALBUM FIND */}
                    {albumresult ?
                        <div id="albumresult">
                            <div className="artistsongtitle">
                                <h3>Albums</h3>
                            </div>
                            <div className="col-sm-10 albumfind">
                                {/* ALBUM CODE */}
                                {filteredalbums.map(result => {
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
                                        <Link to="/artist" style={{ textDecoration: "none" }} onClick={() => props.setArtistID(result.artistID)}>
                                            <p className="artist">{result.artist}</p>
                                        </Link>
                                    </div>
                                })}
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                {/* ARTIST FIND */}

                {artistresult ?
                    <div className="row artistrow">
                        <hr />
                        <div className="col-sm-6">
                            <div className="artistsongtitle">
                                <h3>Artists</h3>
                            </div>

                        </div>
                    </div>
                    :
                    null}
            </div>
        )
    }
}