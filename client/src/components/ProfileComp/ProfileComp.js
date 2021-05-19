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
            for (let i = 0; i < res.data.length - res.data.length + 1; i++) {
                user.push(res.data.find(savedUser => savedUser.email === theUser))
                setFollowers(res.data[i].followers)
                setFollowing(res.data[i].following)
            }
            setStateUser(user)
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

    function unfollow(e) {
        let clicked = e.target.id

        API.getUser().then(res => {
            let theUser = currentUser.email
            let user = [];
            for (let i = 0; i < res.data.length - res.data.length + 1; i++) {
                user.push(res.data.find(savedUser => savedUser.email === theUser))
            }
            let followingUsers = user[0].following
            let newUser = followingUsers.filter(removeFollow => (removeFollow.users.id !== clicked))

            API.removeFollow({
                id: stateUser[0]._id,
                user: newUser
            })

        })

        let theFollower = allUsers.find(theUser => clicked === theUser._id)
        let followerUsers = theFollower.followers
        let filteredFollowers = followerUsers.filter(f => stateUser[0]._id !== f.users.id)
        console.log(filteredFollowers)
        console.log(theFollower._id)

        API.removeFollower({
            id: theFollower._id,
            user: filteredFollowers
        })

    }

    function viewUser(e) {
        console.log(e.target.id)
        let searchId = allUsers.find(searched => e.target.id === searched._id)
        console.log(searchId)
        history.push("/profile/" + searchId._id)
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
        API.getFollower({
            userId: followUser[0]._id,
            users: {
                users: {
                    id: stateUser[0]._id,
                    first_name: stateUser[0].first_name,
                    last_name: stateUser[0].last_name

                }
            }
        })
    }


    const [file, setFile] = useState("");
    const [filePath, setFilePath] = useState("");

    function handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file)
            setFilePath(reader.result)
            console.log(file)
            console.log(file.size)
            console.log(reader.result)
            API.saveImage(reader.result).then(e => {
                console.log(e)
                let data = {
                    img: e.config,
                }
                API.updateUserImage({
                    id: stateUser[0]._id,
                    data
                })
            })

        }

        reader.readAsDataURL(file)
    }

    if (window.location.pathname === "/profile") {

        return (
            <div>
                <div id="followerMod" className="hidden">
                    <div className="card followerModal">
                        <div className="card-body">
                            <p>Followers</p>
                            {stateUser.map(user => (
                                user.followers.map(followerss => (
                                    <div className="followers" key={followerss.users.id}>
                                        <p className>{followerss.users.first_name} {followerss.users.last_name}</p>
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
                                        <p className>{followingss.users.first_name} {followingss.users.last_name}</p>
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
                            {/* <img className="userProfilePic" src={user.image} alt="profileImg">
                            </img> */}
                            <img className="userProfilePic" id="profilePic" src={user.image} alt="profilepic"></img>
                            <input type="file" id="img" name="img" accept="image/*" onChange={(e) => handleImageChange(e)}></input>
                        </div>
                        <div className="followDiv">
                            <p className="follower" onClick={followerView}>Followers: {user.followers.length}</p>
                            <p className="following" onClick={followingView}>Following: {user.following.length}</p>
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
                <div className="userDiv">
                    <p className="usernameProfile">{currentUserPath.username}</p>
                    <button onClick={followMe} id={currentUserPath._id}>Follow Me</button>
                    {/* <button onClick={unfollow} id={currentUserPath._id}>Unfollow Me</button> */}
                    <div className="profileImgDiv">
                        <img className="userProfilePic" src={currentUserPath.image} alt="profileImg">
                        </img>
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

            </div>
        )
    }
}

export default ProfileComp