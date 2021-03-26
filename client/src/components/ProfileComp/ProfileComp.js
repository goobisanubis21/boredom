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
    // let following1 = [];


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
            // let follower = [];
            // let following = [];
            for (let i = 0; i < res.data.length - res.data.length + 1; i++) {
                user.push(res.data.find(savedUser => savedUser.email === theUser))
                // follower.push(res.data[i].followers)
                // following.push(res.data[i].following)
                setFollowers(res.data[i].followers)
                setFollowing(res.data[i].following)
            }
            setStateUser(user)
            // setFollowers(follower)
            // setFollowing(following)
        })
    }

    // function findFollowing() {
    //     API.getUser().then(res => {
    //         let theUser = currentUser.email
    //         let user = [];
    //         let follower = [];
    //         let following1= []
    //         for (let i = 0; i < res.data.length - res.data.length + 1; i++) {
    //             user.push(res.data.find(savedUser => savedUser.email === theUser))
    //             // follower.push(res.data[i].followers)
    //             following1.push(res.data[i].following)
    //         }
    //         return following1
    //         // console.log(following1.length)
    //     })
    // }

    // useEffect(() => {
    //     findFollowing()
    //     console.log(findFollowing())
    // }, [])

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
            id: stateUser[0]._id,
            bio: bioRef.current.value
        })
            .then(window.location.reload())
    }

    function followMe(e) {
        let clicked = e.target.id
        let followUser = []
        let clickedFollow = allUsers.find(everyone => clicked === everyone._id)
        followUser.push(clickedFollow)
        console.log(followUser)
        API.addFollower({
            userId: stateUser[0]._id,
            users: {
                users: {
                    id: followUser[0]._id,
                    first_name: followUser[0].first_name,
                    last_name: followUser[0].last_name

                }
            }
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
                </div> */}


                <div id="followerMod" className="hidden">
                <div className="card followerModal">
                    <div className="card-body">
                        <p>Followers</p>
                        {stateUser.map(user => (
                            user.followers.map(followerss => (
                                <div className="followers" key={followerss.users.id}>
                                    <p>{followerss.users.first_name} {followerss.users.last_name}</p>
                                    <button onClick={viewUser} id={followerss.users.id} className="followerViewBtn">View</button>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
            <div id="followingMod" className="hidden">
                <div className="card followingModal">
                    <div className="card-body">
                        <p>Following</p>
                        {stateUser.map(followings => (
                            followings.following.map(followingss => (
                                <div className="following" key={followingss.users.id}>
                                    <p>{followingss.users.first_name} {followingss.users.last_name}</p>
                                    <button onClick={viewUser} id={followingss.users.id} className="followingViewBtn">View</button>
                                    <button onClick={unfollow} id={followingss.users.id} className="unfollowingBtn">Unfollow</button>
                                </div>
                            ))
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
                {/* <div id="followerMod" className="hidden">
                <div className="card followerModal">
                    <div className="card-body">
                        <p>Followers</p>
                        {stateUser.map(follower => (
                            <div className="followers" key={follower.followers.users.id}>
                                <p>{follower.followers.users.first_name} {follower.followers.users.last_name}</p>
                                <button onClick={viewUser} id={follower.followers.users.id} className="followerViewBtn">View</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="followingMod" className="hidden">
                <div className="card followingModal">
                    <div className="card-body">
                        <p>Following</p>
                        {stateUser.map(followings => (
                            <div className="following" key={followings.following.users.id}>
                                <p>{followings.following.users.first_name} {followings.following.users.last_name}</p>
                                <button onClick={viewUser} id={followings.following.users.id} className="followingViewBtn">View</button>
                                <button onClick={unfollow} id={followings.following.users.id} className="unfollowingBtn">Unfollow</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

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
                )
            </div>
        )
    }
}

export default ProfileComp