import "./css/currentsong.css"

export default function CurrentSong(props) {
    const { song } = props;

    if (!song) {
        return null;
    } else {
        return (
            <div className="currentsongbox">
                <div className="imageprofile">
                    <img src={song.image} alt="" />
                </div>
                <div className="songinformation">
                    <p className="songtitle">{song.song}</p>
                    <p className="songartist">{song.artist}</p>
                </div>
            </div>
        )
    }
}