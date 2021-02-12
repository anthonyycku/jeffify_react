import './App.css';
import './nav.css'
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from "react-router-dom";

export default function Nav(props) {
    const { user, setUser } = props;

    const homeStyle = (page) => {
        if (page === "home") {
            return {
                backgroundColor: "rgb(169, 169, 169, 0.66)"
            }
        }
    }
    const playlistStyle = (page) => {
        if (page === "playlist") {
            return {
                backgroundColor: "rgb(169, 169, 169, 0.66)"
            }
        }
    }
    const searchStyle = (page) => {
        if (page === "search") {
            return {
                backgroundColor: "rgb(169, 169, 169, 0.66)"
            }
        }
    }

    return (
        <div className="navContainer">
            <div className="topNav">
                <nav>
                    <ul>
                        <li className="title"><i class="fab fa-spotify"></i> Jeffify</li>
                        <li onClick={() => props.setPage("search")} style={searchStyle(props.page)}><Link className="link" to="/search"><i class="fas fa-search"></i> Search</Link></li>
                        <li onClick={() => props.setPage("home")} style={homeStyle(props.page)}><Link className="link" to="/home"><i class="fas fa-home-lg-alt"></i> Home</Link></li>
                        <li onClick={() => props.setPage("playlist")} style={playlistStyle(props.page)}><Link className="link" to="/playlist"><i class="fal fa-books"></i> Library</Link></li>
                        <hr style={{ color: "white" }} />
                        <li><Link to="/createlist" className="link playlist">Create Playlist</Link></li>
                    </ul>

                    {user ?
                        <div className="signupul profile-user">
                            <p>Signed in as: </p>
                            <p className="username">{user.username}</p>
                            <p className="logout" onClick={() => setUser(null)}>Logout</p>
                        </div>
                        :
                        <ul className="signupul">
                            <li onClick={() => props.setPage("signup")} className="userlink"><Link className="link signuplink" to="/signup">Sign-up</Link></li>
                            <li className="userlink"><Link className="link signuplink">Log-in</Link></li>
                        </ul>
                    }
                </nav>
            </div>
        </div>
    )
}