import axios from 'axios';
import React, { useEffect, useState } from "react";
import "./css/search.css"
import Loader from "../Loader";


export default function Search(props) {
    const { setQueue, song } = props;

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
    }, [])

    const getallsongs = () => {
        axios.get("https://jeffify.herokuapp.com/songsearch").then(response => {
            setallsongs(response.data)
        })
    }

    const getallalbums = () => {

    }

    const getallartists = () => {

    }

    const handleChange = (event) => {
        console.log(event.target.value)
        let lowerCaseSearch = event.target.value.toLowerCase();

        if (lowerCaseSearch.length > 1) {
            let resultsongs = allsongs.filter(result => result.song.toLowerCase().includes(lowerCaseSearch));
            setfilteredsongs(resultsongs);
            if (resultsongs.length > 0) {
                setsongresult(true);
            }
        } else {
            setfilteredsongs([]);
            setsongresult(false)
        }
    }

    const playClick = (song) => {
        props.setCurrentAlbum(song.album);
        setQueue([song]);
        props.setqindex(0);
    }

    if (!allsongs) {
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
                        <div className="col-sm-6 albumfind">
                            <div className="artistsongtitle">
                                <h3>Albums</h3>
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