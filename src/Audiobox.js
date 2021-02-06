import './App.css';

export default function Audiobox() {

    return (
        <div className="audiobox">
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
                            <a className="play">
                                <i className="far fa-play-circle"></i>
                            </a>
                            <a className="forward">
                                <i class="fas fa-step-forward"></i>
                            </a>
                            <a className="redo">
                                <i class="far fa-redo"></i>
                            </a>
                        </div>
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