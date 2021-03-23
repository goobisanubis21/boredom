import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./nav.css";
import { useAuth } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import API from '../../utils/API';

function Navbar() {

    const [error, setError] = useState("")
    const history = useHistory()
    const { currentUser, logout } = useAuth()
    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        showSearches()
    }, [search])

    function getAllUsers() {
        API.getUser().then(res => {
            setAllUsers(res.data)
        })
    }

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

    function handleInputChange(e) {
        setSearch(e.target.value)
        console.log(search)
        if (search === "") {
            setFiltered([])
        } else {
            setFiltered(allUsers.filter(all => all.full_name.toLowerCase().includes(search.toLowerCase()))) 
        }
    }

    function searchUser(e) {
        e.preventDefault()
        let searchId = allUsers.find(searched => search === searched.full_name)
        history.push("/profile/" + searchId._id)
    }

    function showSearches() {
        let searchResults = document.getElementById("searchResults")
        if (search === "") {
            searchResults.classList.add("hidden")
        } else {
            searchResults.classList.remove("hidden")
        }
    }

    function addToSearch (e) {
        const clicked = e.target.id
        const searchedValue = allUsers.find(user => user._id === clicked)
        setSearch(searchedValue.full_name)
    }

    return (
        <div className="mainNavDiv">
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
                        <a><Button className="nav-link" variant="link" onClick={handleLogout}>Log Out</Button></a>
                    </div>
                    <div className="searchForm">
                        <form onSubmit={searchUser}>
                            <input value={search} onChange={handleInputChange} type="text" placeholder="Search"></input>
                            <button className="searchBtn" type="submit">Find</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div id="searchResults" className="card searchResults hidden">
                <div className="card-body">
                    {filtered.map(filter => (
                        <p className="searchResultNames" onClick={addToSearch} value={filter.first_name + " " + filter.last_name} key={filter._id} id={filter._id}>{filter.first_name} {filter.last_name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar