import './App.css';
import './audiobox.css'
import React, { useState, useEffect } from "react";
import VolumeBox from "./VolumeBox"
import QueueModal from "./QueueModal"
import CurrentSong from "./CurrentSong"
import AudioPlayer from "./AudioPlayer"
import Play from "./Play"
import Pause from "./Pause"
import Bar from "./Bar"


export default function Audiobox(props) {
    // const { currentTime, setCurrentTime, duration, playing, setPlaying, setClickedTime } = AudioPlayer();
    const { queue, setQueue, qindex, setqindex, repeat, setRepeat, random, setRandom } = props;
    const [randomQueue, setRandomQueue] = useState();
    const [queueUp, setQueueUp] = useState();

    const { currentTime, duration, playing, setPlaying, setClickedTime } = props;


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
                if (qindex !== queue.length - 1) {
                    if (random) {
                        setQueue(randomQueue)
                    }
                    setqindex(qindex + 1);
                } else {
                    setPlaying(false);
                }
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
        let audio = document.getElementById("audio");
        if (!repeat) {
            if (qindex !== queue.length - 1) {
                setqindex(qindex + 1);
            } else {
                audio.currentTime = audio.duration;
            }
        } else {
            audio.currentTime = audio.duration;
        }
    }

    const randomize = () => {
        setRandom(true);
        let currentqueue = queue;
        for (let i = qindex + 1; i < currentqueue.length - 1; i++) {
            let randomIndex = Math.floor(Math.random() * (currentqueue.length - i - 1)) + (i + 1)
            let temp = currentqueue[i];
            currentqueue[i] = currentqueue[randomIndex]
            currentqueue[randomIndex] = temp;
        }
        setRandomQueue(queue => [...currentqueue]);
    }

    const activateQ = () => {
        if (queueUp) {
            document.getElementById("modal").classList.toggle("displayoff")
            setTimeout(() => {
                setQueueUp(false);
                document.getElementById("modal").classList.toggle("displayoff")
            }, 450)
        } else {
            setQueueUp(true);
        }
    }

    return (
        <div className="audiobox" >
            {/* audio */}
            <audio id="audio" onEnded={() => nextSong()}>
                <source id="source" src="" type="audio/mp3" />
            </audio>

            {/* QUEUE MODAL */}
            <div id="modal">
                {queueUp ?
                    <QueueModal
                        setQueue={setQueue}
                        queue={queue}
                        currentSong={queue[qindex]}
                        setqindex={setqindex}
                        qindex={qindex} />
                    :
                    null
                }
            </div>

            {/*  */}
            <div className="row">
                {/* LEFT BOX */}
                <div className="col-sm-3 left">
                    <CurrentSong song={queue[qindex]} />
                </div>

                {/* audio controller */}
                <div className="col-sm-6 middle">
                    <div className="row">
                        <div className="col-sm-12 panel">
                            {/* RANDOM */}
                            {!random ?
                                <a className="random" onClick={() => randomize()}>
                                    <i class="fad fa-random"></i>
                                </a>
                                :
                                <a className="random randomON" onClick={() => setRandom(false)}>
                                    <i class="fad fa-random"></i>
                                </a>
                            }
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
                <button className="queue" onClick={() => activateQ()}>Queue ({queue.length})</button>
                <div className="col-sm-3 right">
                    <VolumeBox />
                </div>
            </div>
        </div>
    )
}