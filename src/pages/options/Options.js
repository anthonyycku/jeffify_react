import "../css/songs.css"

export default function Options(props) {
    const { setQueue, queue, result } = props;

    const handleClick = () => {
        let newQ = queue;
        newQ.push(result);

        document.getElementsByClassName("showOptions")[0].classList.remove("showOptions");

    }

    return <div id="optionsmodal">
        <ul className="list-group">
            <li onClick={() => handleClick()} className="list-group-item">Add to queue</li>
        </ul>
    </div>
}