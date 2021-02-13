import React, { useState, useEffect } from "react";

export default function VolumeBox(props) {

    const setVolume = () => {
        let audio = document.getElementById("audio");
        let currentVolume = document.getElementById("volume").value;
        audio.volume = currentVolume / 100
    }
    return (
        <div className="row">
            <div className="col-sm-12 volumebox">
                <i class="fa fa-volume-down"></i>
                <input id="volume" type="range" min="0" max="100" step="1" onChange={() => setVolume()} />
                <i class="fa fa-volume-up"></i>
            </div>
        </div>
    )
}