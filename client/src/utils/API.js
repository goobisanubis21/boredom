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
        return axios.put("../api/user/" + id.userId, id.users)
    },

    getFollower: function (id) {
        return axios.put("../api/user/add/" + id.userId, id.users)
    },

    uploadPhoto: function (img) {
        return axios.put("../api/user/photo/" + img.userId, img.image)
    },

    unfollowThem: function (goodbye) {
        return axios.delete("../api/user/unfollow/" + goodbye.id, goodbye)
    },

    removeFollow: function (users) {
        return axios.put ("../api/user/remove/" + users.id, users.user)
    }
};