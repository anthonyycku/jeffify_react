import "../css/songs.css"

export default function Options(props) {
    const { setPlaying, queue, result } = props;

    const handleClick = () => {
        let newQ = queue;
        newQ.push(result);
        setPlaying(true);

        if (queue.length === 1) {
            let audio = document.getElementById("audio");
            audio.src = queue[0].audio
        }

        document.getElementsByClassName("showOptions")[0].classList.remove("showOptions");

    }

    return <div id="optionsmodal">
        <ul className="list-group">
            <li onClick={() => handleClick()} className="list-group-item">Add to queue</li>
            <li className="list-group-item" style={{ borderTop: "1px grey solid" }}>Add to playlist</li>
        </ul>
    </div>
}