import './App.css';
import './audiobox.css'
import React, { useState, useEffect } from "react";
import VolumeBox from "./VolumeBox"
import CurrentSong from "./CurrentSong"
import AudioPlayer from "./AudioPlayer"
import Play from "./Play"
import Pause from "./Pause"
import Bar from "./Bar"


export default function Audiobox(props) {
    const { currentTime, setCurrentTime, duration, playing, setPlaying, setClickedTime } = AudioPlayer();
    const { queue, qindex, setqindex, repeat, setRepeat } = props;



    useEffect(() => {
        let audio = document.getElementById("audio");

        if (qindex < queue.length) {
            audio.src = queue[qindex].audio
            setPlaying(true);
        } else {
            setPlaying(false);
        }

    }, [queue, qindex])

    const nextSong = () => {
        if (queue.length === 1) {
            if (!repeat) {
                setPlaying(false);
            } else {
                setPlaying(true);
            }
        } else {
            if (repeat) {
                setPlaying(true);
            } else {
                setqindex(qindex + 1);
            }
        }
    }

    const prevSong = () => {
        if (qindex !== 0 && currentTime < 3) {
            setqindex(qindex - 1);
        } else {
            let audio = document.getElementById("audio");
            audio.currentTime = 0;
        }
    }

    const forward = () => {
        if (!repeat) {
            setqindex(qindex + 1);
        } else {
            let audio = document.getElementById("audio");
            audio.currentTime = audio.duration;
        }
    }


    return (
        <div className="audiobox" onEnded={() => nextSong()}>
            {/* audio */}
            <audio id="audio">
                <source id="source" src="" type="audio/mp3" />
            </audio>

            <div className="row">
                {/* LEFT BOX */}
                <div className="col-sm-3 left">
                    <CurrentSong song={queue[qindex]} />
                </div>
                {/* AUDIO CONTROL */}
                <div className="col-sm-6 middle">
                    {/* audio controller */}
                    <div className="row">
                        <div className="col-sm-12 panel">
                            {/* RANDOM */}
                            <a className="random">
                                <i class="fad fa-random"></i>
                            </a>
                            {/* BACKWARD */}
                            <a className="backward" onClick={() => prevSong()}>
                                <i class="fas fa-step-backward"></i>
                            </a>
                            {/* PLAY BUTTON */}
                            {playing ?
                                <Pause handleClick={() => setPlaying(false)} />
                                :
                                <Play handleClick={() => setPlaying(true)} />
                            }
                            {/* FORWARD */}
                            <a className="forward" onClick={() => forward()}>
                                <i class="fas fa-step-forward"></i>
                            </a>
                            {/* REPEAT BUTTON */}

                            {!repeat ?
                                <a className="redo" onClick={() => setRepeat(true)}>
                                    <i class="far fa-redo"></i>
                                </a>
                                :
                                <a className="redoON" onClick={() => setRepeat(false)}>
                                    <i class="far fa-redo"></i>
                                </a>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12" style={{ color: "white" }}></div>
                    </div>
                    {/* bar */}
                    <div className="progressbar" style={{ color: "white" }} >
                        {document.getElementById("audio") && document.getElementById("audio").src !== "" ?
                            <Bar
                                currentTime={currentTime}
                                duration={duration}
                                onTimeUpdate={(time) => setClickedTime(time)}
                            />
                            :
                            null
                        }
                    </div>
                </div>
                {/* RIGHT BOX */}
                <div className="col-sm-3 right">
                    <VolumeBox />
                </div>
            </div>
        </div>
    )
}