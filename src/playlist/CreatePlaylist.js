import "../pages/css/playlist.css"
import "./css/create.css"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function CreatePlaylist(props) {
    const { user } = props;

    const [playlist, setPlaylist] = useState("");
    const [success, setSuccess] = useState(false)


    const handleChange = (event) => {
        setPlaylist(event.target.value)
    }

    const handleSubmit = (event) => {
        let object = { "name": playlist, "user_id": user.id }
        axios.post("https://jeffify.herokuapp.com/playlists", object).then(response => {
            setPlaylist("");

        })
    }

    if (!user) {
        return <div>
            <div className="noentry">Please signup / login to create playlists.</div>
        </div>
    } else {
        return <div className="row createplaylist">


            <div className="col-sm-12 create-playlist">
                <h1>Enter Playlist name</h1>
                <form onSubmit={handleSubmit}>
                    <div class="input-group mb-3">
                        <input
                            placeholder="(1-20 characters)"
                            id="create"
                            type="text"
                            maxLength={20}
                            className="form-control"
                            aria-label="create"
                            aria-describedby="basic-addon1"
                            autoComplete="off"
                            required
                            type="text"
                            onChange={handleChange}
                            value={playlist} />
                    </div>
                    {playlist.length > 0 ?
                        <Link to="/playlist" onClick={handleSubmit} className="btn btn-success">Create</Link>
                        :
                        <input className="btn btn-success createsubmit" type="submit" value="Create" />
                    }
                </form>
            </div>
        </div>
    }
}