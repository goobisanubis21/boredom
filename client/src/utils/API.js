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
    }
};