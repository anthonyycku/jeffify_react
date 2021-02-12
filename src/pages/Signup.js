import axios from "axios";
import React, { useState, useEffect } from 'react';
import "./css/signup.css"
import Loader from "../Loader"

export default function Signup(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [userExists, setUserExists] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [success, setSuccess] = useState(false);

    const [accounts, setAccounts] = useState();

    const { setIsLoggedIn, setUser, user } = props;

    useEffect(() => {
        checkUsers();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (passwordsMatch()) {
            if (validUser()) {
                createUser();
            } else {
                setInvalidUser(true);
                setWrongPassword(false);
                setUserExists(false);
                setUsername("");
            }
        } else {
            setWrongPassword(true);
            setUserExists(false);
            setInvalidUser(false);
            setPassword("");
            setConfirm("");
        }
    }

    const checkUsers = () => {
        axios.get("https://jeffify.herokuapp.com/accounts").then(response => {
            let accounts = response.data;
            setAccounts(accounts);
        })
    }

    const createUser = () => {
        let exists = false;

        for (let user of accounts) {
            if (user.username === username) {
                exists = true;
            }
        }

        if (!exists) {
            let object = { "username": username, "password": password }
            axios.post("https://jeffify.herokuapp.com/accounts", object).then(response => {
                setUser(response.data)
            })
            setUserExists(false);
            setWrongPassword(false);
            setInvalidUser(false);
            setUsername("");
            setPassword("");
            setConfirm("");
        } else {
            setUserExists(true);
            setWrongPassword(false);
            setInvalidUser(false);
            setUsername("");
        }
    }

    const passwordsMatch = () => {
        return (password === confirm)
    }

    const validUser = () => {
        return /^(?=.*[a-z])[a-z0-9]{3,10}$/.test(username)
    }

    const handleChange = event => {
        if (event.target.id === "username") {
            setUsername(event.target.value)
        }
        if (event.target.id === "password") {
            setPassword(event.target.value)
        }
        if (event.target.id === "confirm") {
            setConfirm(event.target.value)
        }
    }

    if (!accounts) {
        return <Loader />
    } else if (user) {
        return <div className="successPage">
            <div className="row">
                <div className="col-sm-12 signuptitle">
                    <h1>Signed in as: <u>{user.username}</u></h1>
                </div>
            </div>
        </div>
    } else {
        return <div className="signupdiv">
            <div className="row">
                <div className="col-sm-12 signuptitle">
                    <h1>Sign Up</h1>
                </div>
            </div>
            <div className="row signupform">
                <div className="col-sm-12 formcolumn">

                    <form onSubmit={handleSubmit}>
                        {/* username */}
                        <div class="input-group mb-3">
                            <input
                                placeholder="Username (3-10 characters)"
                                id="username"
                                type="text"
                                maxLength={10}
                                className="form-control"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                autoComplete="off"
                                required
                                type="text"
                                onChange={handleChange}
                                value={username} />
                        </div>
                        <hr />
                        {/* Password */}
                        <div class="input-group mb-3">
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                maxLength={12}
                                className="form-control"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                autoComplete="off"
                                required
                                onChange={handleChange}
                                value={password} />
                        </div>
                        {/* confirm password */}
                        <div class="input-group mb-3">
                            <input
                                placeholder="Confirm Password"
                                id="confirm"
                                type="password"
                                maxLength={12}
                                className="form-control"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                autoComplete="off"
                                required
                                onChange={handleChange}
                                value={confirm} />
                        </div>
                        <hr />
                        {/* Submit */}
                        <input type="submit" className="btn btn-success" value="SIGN UP" />
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 name-exists">
                    {userExists ?
                        <h6 className="alreadyExists">Username already exists, try another username</h6>
                        :
                        null
                    }
                </div>
            </div>

            <div className="row ">
                <div className="col-sm-12 wrong-password">
                    {wrongPassword ?
                        <h6 className="alreadyExists">Password mismatch! Try again</h6>
                        :
                        null
                    }
                </div>
            </div>

            <div className="row ">
                <div className="col-sm-12 invalid-user">
                    {invalidUser ?
                        <div className="invaliduser">
                            <h6 className="alreadyExists">Invalid username!</h6>
                            <h6 classname="alreadyExists">No caps or symbols</h6>
                            <h6 classname="alreadyExists">At least one letter</h6>
                        </div>
                        :
                        null
                    }
                </div>
            </div>

        </div>
    }
}