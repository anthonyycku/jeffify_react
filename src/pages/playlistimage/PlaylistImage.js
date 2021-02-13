import "./css/playlistImage.css"

export default function PlaylistImage(props) {
    const { id, images } = props;
    const img = "https://www.clipartmax.com/png/full/15-153553_green-music-notes-clipart-music-note-clip-art.png"


    if (!images[id]) {
        return <img src={img} />
    } else if (images[id].length === 1) {
        return <img src={images[id][0]} alt="" />
    } else if (images[id].length === 2) {
        return <div className="twopics">
            <img className="pic1" src={images[id][0]} alt="" />
            <img className="pic2" src={images[id][1]} alt="" />
        </div>
    } else if (images[id].length === 3) {
        return <div className="threepics">
            <img className="pic1" src={images[id][0]} alt="" />
            <img className="pic2" src={images[id][1]} alt="" />
            <img className="pic3" src={images[id][2]} alt="" />
        </div>
    } else {
        return <div className="fourpics">
            <img className="pic1" src={images[id][0]} alt="" />
            <img className="pic2" src={images[id][1]} alt="" />
            <img className="pic3" src={images[id][2]} alt="" />
            <img className="pic4" src={images[id][3]} alt="" />
        </div>
    }
}