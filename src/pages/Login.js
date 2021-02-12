import "./css/signup.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader"

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accounts, setAccounts] = useState();
    const { user, setUser } = props;

    const [noAccount, setNoAccount] = useState(false);

    useEffect(() => {
        checkUsers();
    }, [])

    const checkUsers = () => {
        axios.get("https://jeffify.herokuapp.com/accounts").then(response => {
            let accounts = response.data;
            setAccounts(accounts);
        })
    }

    const handleChange = event => {
        if (event.target.id === "username") {
            setUsername(event.target.value)
        }
        if (event.target.id === "password") {
            setPassword(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let found = false;

        for (let user of accounts) {
            if (user.username === username && user.password === password) {
                found = true;
                setNoAccount(false);
                setUser({ id: user.id, username: user.username })
            }
        }
        if (!found) {
            setNoAccount(true);
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
                    <h1>LOGIN</h1>
                </div>
            </div>
            <div className="row signupform">
                <div className="col-sm-12 formcolumn">

                    <form onSubmit={handleSubmit}>
                        {/* username */}
                        <div class="input-group mb-3">
                            <input
                                placeholder="Username"
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
                        <hr />
                        {/* Submit */}
                        <input type="submit" className="btn btn-success" value="LOG IN" />
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 name-exists">
                    {noAccount ?
                        <h6 className="alreadyExists">Username or password incorrect! Try again.</h6>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    }
}