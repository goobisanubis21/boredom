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

    unfollowThem: function (goodbye) {
        return axios.delete("../api/user/unfollow/" + goodbye.id, goodbye)
    },

    removeFollow: function (users) {
        return axios.put("../api/user/remove/" + users.id, users.user)
    },

    removeFollower: function (user) {
        return axios.put("../api/user/removefollower/" + user.id, user.user)
    },

    saveImage: function(image,imageId) {
        let data ={}
        if(imageId === undefined) {
            data = {
                img: image
            }
        }
        else {
            data = {
                img: image,
                imgId: imageId
            }
        }

        console.log(data)

        return axios.post('../api/cloudinary/', data)
    },
    updateUserImage: function(id) {
        axios.put("../api/user/updateImage/" + id.id, id.data)
    }
};