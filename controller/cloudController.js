const {default : axios} = require("axios");
const db = require("../models");

var cloudinary = require('cloudinary').v2

CLOUDINARY_URL = "cloudinary://157115772653517:fjF5zXv7zgzZmbzoZJ6GOklB9Bg@dtodsxdoy"

cloudinary.config({
    cloud_name: 'dtodsxdoy',
    api_key: '157115772653517',
    api_secret: 'fjF5zXv7zgzZmbzoZJ6GOklB9Bg' 
})

module.exports = {
    addImage: function(req, res) {
        if (req.body.imgId) {
            cloudinary.uploader.destroy(req.body.imgId, function(error,result){
                console.log()
            })
        }

        cloudinary.uploader.upload(req.body.img, function(error,result) {
            db.Boredomuser
                .findOneAndUpdate({ _id: req.body.id }, {profilePic: result.url, imgId: result.public_id})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        })
    }
}