import './App.css';
import './audiobox.css'
import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer"
import Play from "./Play"
import Pause from "./Pause"
import Bar from "./Bar"

export default function Audiobox(props) {
    const { currentTime, duration, playing, setPlaying, setClickedTime } = AudioPlayer();
    const [source, setSource] = useState("")
    const { queue } = props;

    useEffect(() => {
        let sourceSrc = document.getElementById("audio");

        sourceSrc.addEventListener("loadedsource", setSource(sourceSrc.src));
        if (source !== "" && currentTime === 0) {
            setPlaying(true);
        }
    })

    return (
        <div className="audiobox">
            {/* audio */}
            <audio id="audio">
                <source id="source" src="" type="audio/mp3" />
            </audio>

            <div className="row">
                {/* LEFT BOX */}
                <div className="col-sm-3 left">
                </div>
                {/* AUDIO CONTROL */}
                <div className="col-sm-6 middle">
                    {/* audio controller */}
                    <div className="row">
                        <div className="col-sm-12 panel">
                            <a className="random">
                                <i class="fad fa-random"></i>
                            </a>
                            <a className="backward">
                                <i class="fas fa-step-backward"></i>
                            </a>
                            {/* PLAY BUTTON */}
                            {playing ?
                                <Pause handleClick={() => setPlaying(false)} />
                                :
                                <Play handleClick={() => setPlaying(true)} />
                            }
                            <a className="forward">
                                <i class="fas fa-step-forward"></i>
                            </a>
                            <a className="redo">
                                <i class="far fa-redo"></i>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12" style={{ color: "white" }}></div>
                    </div>
                    {/* bar */}
                    <div className="progressbar" style={{ color: "white" }} >
                        <Bar
                            currentTime={currentTime}
                            duration={duration}
                            onTimeUpdate={(time) => setClickedTime(time)}
                        />
                    </div>
                </div>
                {/* RIGHT BOX */}
                <div className="col-sm-3 right">

                </div>
            </div>
        </div>
    )
}