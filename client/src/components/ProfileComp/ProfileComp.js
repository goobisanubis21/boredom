import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import "./profileComp.css";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/API"

function ProfileComp() {

    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [stateUser, setStateUser] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [currentUserPath, setCurrentUserPath] = useState([])
    const bioRef = useRef()


    useEffect(() => {
        findCurrentUser()
        getAllUsers()
    }, [])

    useEffect(() => {

        let locationWindow = []
        locationWindow.push(window.location.pathname.split("/"))
        let currentId = locationWindow[0][2]
        let clickedUserPath = allUsers.find(everyone => currentId === everyone._id)
        if (clickedUserPath === undefined) {
            return
        } else {
            setCurrentUserPath(clickedUserPath)
        }
    }, [window.location.pathname])

    useEffect(() => {
        history.push("/profile")
    }, [window.location.reload])

    function getAllUsers() {
        API.getUser().then(res => {
            setAllUsers(res.data)
        })
    }

    function findCurrentUser() {
        API.getUser().then(res => {
            let theUser = currentUser.email
            let user = [];
            let follower = [];
            let following = [];
            for (let i = 0; i < res.data.length - res.data.length + 1; i++) {
                user.push(res.data.find(savedUser => savedUser.email === theUser))
                follower.push(res.data[i].followers)
                following.push(res.data[i].following)
            }
            setStateUser(user)
            setFollowers(follower)
            setFollowing(following)
        })
    }

    function followerView() {
        let followerMod = document.getElementById("followerMod")
        followerMod.classList.toggle("show")

    }

    function followingView() {
        let followingMod = document.getElementById("followingMod")
        followingMod.classList.toggle("show")
    }

    function unfollow() {
        // function to delete the following user from the user who is deleteing's db and must also delete the user who is deleteing from the following user's db
    }

    function viewUser(e) {
        console.log(e.target.id)
    }

    function editBio() {
        let edit = document.getElementById("bioEditId")
        edit.classList.toggle("hidden")
    }

    function saveBio() {
        API.updateBio({
            id: stateUser._id,
            bio: bioRef.current.value
        }).then(window.location.reload())
    }

    function followMe(e) {
        let clicked = e.target.id
        let followUser = []
        let clickedFollow = allUsers.find(everyone => clicked === everyone._id)
        followUser.push(clickedFollow)
        console.log(followUser)
        API.addFollower({
            id: stateUser[0]._id,
            followingId: followUser[0]._id,
            first: followUser[0].first_name,
            last: followUser[0].last_name
        })
    }

    if (window.location.pathname === "/profile") {

        return (
            <div>
                {/* <div id="followerMod" className="hidden">
                    <div className="card followerModal">
                        <div className="card-body">
                            <p>Followers</p>
                            {followers.map(follower => (
                                <div className="followers" key={follower.id}>
                                    <p>{follower.first_name} {follower.last_name}</p>
                                    <button onClick={viewUser} id={follower.id} className="followerViewBtn">View</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="followingMod" className="hidden">
                    <div className="card followingModal">
                        <div className="card-body">
                            <p>Following</p>
                            {following.map(followings => (
                                <div className="following" key={followings.id}>
                                    <p>{followings.first_name} {followings.last_name}</p>
                                    <button onClick={viewUser} id={followings.id} className="followingViewBtn">View</button>
                                    <button onClick={unfollow} id={followings.id} className="unfollowingBtn">Unfollow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {stateUser.map(user => (
                    <div className="userDiv" key={user.email}>
                        <p className="usernameProfile">{user.username}</p>
                        <div className="profileImgDiv">
                            <img className="userProfilePic" src={user.image} alt="profileImg">
                            </img>
                        </div>
                        <div className="followDiv">
                            <p className="follower" onClick={followerView}>Followers: {followers.length}</p>
                            <p className="following" onClick={followingView}>Following: {following.length}</p>
                        </div>
                        <div className="bioDiv">
                            <p>BIO</p>
                            <div className="card">
                                <div className="card-body">
                                    <h4>{user.first_name} {user.last_name}</h4>
                                    <p>{user.bio}</p>
                                    <div id="bioEditId" className="bioEdit hidden">
                                        <textarea defaultValue={user.bio} ref={bioRef} className="bioTextEdit"></textarea>
                                        <button onClick={saveBio} className="bioSaveBtn">Save</button>
                                    </div>
                                    <button onClick={editBio}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>
                <div id="followerMod" className="hidden">
                    <div className="card followerModal">
                        <div className="card-body">
                            <p>Followers</p>
                            {followers.map(follower => (
                                <div className="followers" key={follower.id}>
                                    <p>{follower.first_name} {follower.last_name}</p>
                                    <button onClick={viewUser} id={follower.id} className="followerViewBtn">View</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="followingMod" className="hidden">
                    <div className="card followingModal">
                        <div className="card-body">
                            <p>Following</p>
                            {following.map(followings => (
                                <div className="following" key={followings.id}>
                                    <p>{followings.first_name} {followings.last_name}</p>
                                    <button onClick={viewUser} id={followings.id} className="followingViewBtn">View</button>
                                    <button onClick={unfollow} id={followings.id} className="unfollowingBtn">Unfollow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="userDiv">
                    <p className="usernameProfile">{currentUserPath.username}</p>
                    <button onClick={followMe} id={currentUserPath._id}>Follow Me</button>
                    <div className="profileImgDiv">
                        <img className="userProfilePic" src={currentUserPath.image} alt="profileImg">
                        </img>
                    </div>
                    <div className="followDiv">
                        <p className="follower" onClick={followerView}>Followers: {followers.length}</p>
                        <p className="following" onClick={followingView}>Following: {following.length}</p>
                    </div>
                    <div className="bioDiv">
                        <p>BIO</p>
                        <div className="card">
                            <div className="card-body">
                                <h4>{currentUserPath.first_name} {currentUserPath.last_name}</h4>
                                <p>{currentUserPath.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ) */}
            </div>
        )
    }
}

export default ProfileComp