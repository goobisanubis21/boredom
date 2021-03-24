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
        console.log(id.id)
        axios.get("../api/user/" + id.id).then(res => {
            let user = res.data
            // let newFollower = []
            let newFollower = user.following
            newFollower.push({
                    "id": id.followingId,
                    "first_name": id.first,
                    "last_name": id.last
            });
            console.log(newFollower)
            user.following = newFollower
            console.log(user)

            axios.put("../api/user/" + id.id, user).then(res => {
                return res.data
            })
        })
    }
};