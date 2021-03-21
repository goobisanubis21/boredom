import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./nav.css";
import { useAuth } from "../../context/AuthContext";
import { Button } from "react-bootstrap"

function Navbar() {

    const [error, setError] = useState("")
    const history = useHistory()
    const { currentUser, logout } = useAuth()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
            console.log(error)
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Logo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-link" href="/adventure">Adventure</a>
                        <a className="nav-link" href="/recent">Recent</a>
                        <a className="nav-link" href="/profile">Profile</a>
                        <Button variant="link" onClick={handleLogout}>Log Out</Button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
