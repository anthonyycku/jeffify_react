import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
// IMPORT COMPONENTS
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import Front from "./pages/Front"

function App() {
  return (
    <div className="container-fluid">
      <Router>
        {/* NAVIGATION */}
        <div className="navContainer">
          <div className="topNav">
            <nav>
              <ul>
                <li><Link to="/">Front</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/playlist">Your Library</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* BODY */}
        <div className="bodyContainer">
          <Switch>
            <Route path="/" exact component={Front}></Route>
            <Route path="/home" component={Home} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>

        {/* AUDIO BOX */}
        <div className="audiobox">
          <div className="row">
            {/* LEFT BOX */}
            <div className="col-sm-3 left">

            </div>
            {/* AUDIO CONTROL */}
            <div className="col-sm-6 middle">
              {/* audio controller */}
              <div className="row">
                <div className="col-sm-12 panel">
                  <a className="random">
                    <i class="fad fa-random"></i>
                  </a>
                  <a className="backward">
                    <i class="fas fa-step-backward"></i>
                  </a>
                  <a className="play">
                    <i className="far fa-play-circle"></i>
                  </a>
                  <a className="forward">
                    <i class="fas fa-step-forward"></i>
                  </a>
                  <a className="redo">
                    <i class="far fa-redo"></i>
                  </a>
                </div>
              </div>
              {/* bar */}
              <div className="progressbar">

              </div>
            </div>
            {/* RIGHT BOX */}
            <div className="col-sm-3 right">

            </div>
          </div>
        </div>

      </Router>
    </div >
  );
}

export default App;
