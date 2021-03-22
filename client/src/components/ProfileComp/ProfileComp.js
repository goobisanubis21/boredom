import React, { useEffect, useState } from 'react';
import "./profileComp.css";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/API"

function ProfileComp() {

    const { currentUser, logout } = useAuth()
    const [stateUser, setStateUser] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

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
        
    }

    function followingView() {

    }

    return (
        <div>
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
                                <button>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfileComp
