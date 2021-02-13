import "./queueModal.css"

export default function QueueModal(props) {
    const { setQueue, queue, currentSong, qindex, setqindex, setCurrentAlbum } = props;

    const clearq = () => {
        setQueue([]);
        setqindex(0);
        setCurrentAlbum();
        document.getElementById("audio").src = "";
    }

    const setSong = (result, index) => {
        if (index !== qindex) {
            setqindex(index)
        }
        setCurrentAlbum(result.album);
    }
    return (
        <div className="queuemodal">

            <div className="row">
                <div className="col-sm-12 queuelist">
                    <div className="queuetitle">
                        <h3>Queue</h3>
                        <button onClick={clearq} className="clearq btn btn-danger">Clear</button>
                    </div>
                    <hr />
                    {queue.map((result, index) => {
                        return <div className="queueSong">
                            {qindex === index ?
                                <div style={{ color: "rgb(1, 211, 1)" }}>
                                    {result.song}
                                    <div className="queueplay">
                                        <i class="fas fa-volume-up"></i>
                                    </div>
                                </div>
                                :
                                <div>
                                    {result.song}
                                    <div className="queueplay" onClick={() => setSong(result, index)}>
                                        <i className="far fa-play-circle"></i>
                                    </div>
                                </div>
                            }
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
}