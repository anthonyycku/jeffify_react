import "./queueModal.css"

export default function QueueModal(props) {
    const { setQueue, queue, currentSong } = props;

    const setSong = (index) => {

    }
    return (
        <div className="queuemodal">

            <div className="row">
                <div className="col-sm-12 queuelist">
                    <h3>Queue</h3>
                    <hr />
                    {queue.map((result, index) => {
                        return <div className="queueSong">
                            {currentSong.song === result.song ?
                                <div>
                                    <i class="fas fa-caret-right"></i>
                                    {result.song}
                                    <i class="far fa-play-circle"></i>
                                </div>
                                :
                                <div>
                                    {result.song}
                                    <i class="far fa-play-circle"></i>
                                </div>
                            }
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
}