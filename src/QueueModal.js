import "./queueModal.css"

export default function QueueModal(props) {
    const { setQueue, queue, currentSong } = props;
    return (
        <div className="queuemodal">

            <div className="row">
                <div className="col-sm-12 queuelist">
                    <h3>Queue</h3>
                    {queue.map(result => {
                        return <div className="queueSong">
                            {currentSong.song === result.song ?
                                <p><i class="fas fa-caret-right"></i> {result.song}</p>
                                :
                                <p>{result.song}</p>
                            }
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
}