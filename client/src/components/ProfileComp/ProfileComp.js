import React, { useEffect, useState, useRef } from 'react';
import "./profileComp.css";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/API"

function ProfileComp() {

    const { currentUser, logout } = useAuth()
    const [stateUser, setStateUser] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const bioRef = useRef()

    useEffect(() => {
        findCurrentUser()
    }, [])

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

    function viewUser() {
        // function to view user profile when clicked on in follower/following list
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

    return (
        <div>

            <div id="followerMod" className="hidden">
                <div className="card followerModal">
                    <div className="card-body">
                        <p>Followers</p>
                        {followers.map(follower => (
                            <div className="followers" key={follower.users.id}>
                                <p>{follower.users.first_name} {follower.users.last_name}</p>
                                <button onClick={viewUser} id={follower.users.id} className="followerViewBtn">View</button>
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
                            <div className="following" key={followings.users.id}>
                                <p>{followings.users.first_name} {followings.users.last_name}</p>
                                <button onClick={viewUser} id={followings.users.id} className="followingViewBtn">View</button>
                                <button onClick={unfollow} id={followings.users.id} className="unfollowingBtn">Unfollow</button>
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
                                <p>{user.bio}</p>
                                <div id="bioEditId" className="bioEdit hidden">
                                    <textarea ref={bioRef} className="bioTextEdit" placeholder="Bio"></textarea>
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
}

export default ProfileComp
