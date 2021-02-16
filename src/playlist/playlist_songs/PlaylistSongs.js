import "../css/playlistsongs.css"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader"
import Options from "../../pages/options/Options"
import axios from "axios"

export default function PlaylistSongs(props) {
    const { setLastPage, setqindex, playlistID, user, queue, setQueue, song, setPlaying, setCurrentAlbum, setSongID } = props;
    const [songs, setSongs] = useState([])
    const [playlistInfo, setPlaylistInfo] = useState();
    const [reset, setReset] = useState(false);
    const img = "https://icons-for-free.com/download-icon-music-131964784909142833_512.png"

    useEffect(() => {
        window.scrollTo(0, 0)
        setLastPage("/playlistsongs");
        setTimeout(() => {
            getSongs();
        }, 100)
        getPlaylistInfo();

    }, [reset])

    const getSongs = () => {
        axios.get("https://jeffify.herokuapp.com/playlistsongs/" + playlistID).then(response => {
            let storage = [];
            let newArray = [];

            for (let i = 0; i < response.data.length; i++) {
                if (!storage.includes(response.data[i].id)) {
                    newArray.push(response.data[i])
                    storage.push(response.data[i].id)
                }
            }

            setSongs(newArray)
        })
    }


    const getPlaylistInfo = () => {
        axios.get("https://jeffify.herokuapp.com/playlists/" + playlistID).then(response => {
            setPlaylistInfo(response.data)
        })
    }

    const removeSong = (id) => {
        axios.delete("https://jeffify.herokuapp.com/deletefromplaylist/" + id).then(response => {
            setReset(!reset)
        })

    }

    const playClick = (song) => {
        setQueue([song]);
        props.setqindex(0);
        setCurrentAlbum();
    }

    const playEntire = () => {
        setQueue(songs);
        setqindex(0);
        setCurrentAlbum();
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

    if (!user) {
        return <div className="noentry">Please signup / login to access this feature.</div>
    } else if (!playlistID || !playlistInfo || !songs) {
        return <Loader />
    } else {
        const { name } = playlistInfo
        return <div className="songsContainer">
            <div className="row albumHeader">
                <div className="col-sm-10 albumPic">
                    <img src={img} />
                    <div className="albumInfo">
                        <h1 className="songpagename">{name}</h1>
                        <h5><i class="fad fa-layer-group"></i> {songs.length} songs</h5>
                        <button className="playlistbutton btn btn-success" onClick={playEntire}>Play playlist</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 playlist-song-title">
                    <h3>Songs ({songs.length})</h3>

                </div>
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
                        <button onClick={() => removeSong(result.songplaylistID)} className="btn btn-dark removesong">X</button>
                    </div>

                </div>
            })
            }
        </div >
    }
}