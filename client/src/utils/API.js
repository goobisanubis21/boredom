import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveUser: function (userData) {
        return axios.post("api/user", userData)
    },

    getUser: function () {
        return axios.get("api/user")
    },

    updateBio: function (bioInfo) {
        return axios.put("api/user", bioInfo)
    },

    addFollower: function (id) {
        // console.log(id.users)
        // axios.get("../api/user/" + id.id).then(res => {
        //     let user = res.data
        //     if (user.following !== undefined) {
        //         user.following = [{
        //             "id": id.followingId,
        //             "first_name": id.first,
        //             "last_name": id.last
        //         }]
        //     } else {

        //     let newFollower = user.following
        //     newFollower.push({
        //             "id": id.followingId,
        //             "first_name": id.first,
        //             "last_name": id.last
        //     });

        //     console.log(newFollower)
        //     user.following = newFollower
        //     console.log(user)
        // }

        // })

        // axios.get("../api/user/" + id.users.users.id).then(res => {
        //     let theUser = res.data
        //     console.log(theUser)
        //     let newFollowing = theUser.following
        //     Object.assign(newFollowing, id.users)
        //     console.log(newFollowing)

            return axios.put("../api/user/" + id.userId, id.users)

        // })
    }
};