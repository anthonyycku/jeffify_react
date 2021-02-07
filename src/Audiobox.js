import './App.css';
import AudioPlayer from "./AudioPlayer"
import Play from "./Play"
import Pause from "./Pause"

export default function Audiobox(props) {
    const { currentTime, duration, playing, setPlaying, setClickedTime } = AudioPlayer();

    return (
        <div className="audiobox">
            {/* audio */}
            <audio id="audio">
                <source id="source" src="https://jeffify.s3.amazonaws.com/sorry.mp3" type="audio/mp3" />
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
                    <div className="progressbar">

                    </div>
                </div>
                {/* RIGHT BOX */}
                <div className="col-sm-3 right">

                </div>
            </div>
        </div>
    )
}