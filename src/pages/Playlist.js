import "./css/playlist.css"

export default function Playlist(props) {
    const { user } = props;
    if (!user) {
        return <div className="noentry">Please signup / login to access playlists.</div>
    } else {
        return <div>Nice</div>
    }
}