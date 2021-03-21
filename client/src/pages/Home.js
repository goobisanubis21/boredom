import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap"
import API from '../utils/API';

function Home() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [stateUser, setStateUser] = useState([])

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

    useEffect(() => {
        findCurrentUser()
    }, [])

    function findCurrentUser() {
        API.getUser().then(res => {
            let theUser = currentUser.email
            let user = [];
            for (let i = 0; i < res.data.length - res.data.length + 1; i++) {
                user.push(res.data.find(savedUser => savedUser.email === theUser))
            }
            setStateUser(user)

        })
    }
    
    return (
        <div>
            {stateUser.map(user => (
                <div key={user.email}>
                    <p><span>{user.username}</span> is logged in</p>
                </div>
            ))}
            <div>
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}

export default Home
