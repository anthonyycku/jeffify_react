import "../css/songs.css"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Options(props) {
    const { setPlaying, queue, result, setCurrentAlbum, setSongID, songID } = props;


    const handleClick = () => {
        let newQ = queue;
        newQ.push(result);
        setPlaying(true);
        if (queue.length === 1) {
            setCurrentAlbum(result.album);
            let audio = document.getElementById("audio");
            audio.src = queue[0].audio
        }
        document.getElementsByClassName("showOptions")[0].classList.remove("showOptions");
    }

    const goPlaylist = () => {
        setSongID(songID);
    }

    return <div id="optionsmodal">
        <ul className="list-group">
            {/* Add to queue */}
            <li onClick={() => handleClick()} className="list-group-item">Add to queue</li>
            {/* Add to playlist */}
            <Link onClick={goPlaylist} to="/selectplaylists" style={{ textDecoration: "none", color: "white" }}>
                <li className="list-group-item" style={{ borderTop: "1px grey solid" }}>Add to playlist</li>
            </Link>
        </ul>

    </div>

}