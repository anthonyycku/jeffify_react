

export default function Playlist(props) {
    const { user } = props;
    if (!user) {
        return <div>No Entry</div>
    } else {
        return <div>Nice</div>
    }
}