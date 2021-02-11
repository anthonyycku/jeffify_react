import "./queueModal.css"

export default function QueueModal(props) {
    const { setQueue, queue, currentSong, qindex, setqindex } = props;

    const setSong = (index) => {
        if (index !== qindex) {
            setqindex(index)
        }
    }
    return (
        <div className="queuemodal">

            <div className="row">
                <div className="col-sm-12 queuelist">
                    <h3>Queue</h3>
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
                                    <div className="queueplay" onClick={() => setSong(index)}>
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