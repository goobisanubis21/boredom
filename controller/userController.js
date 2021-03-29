const db = require("../models");

module.exports = {

    findAll: function (req, res) {
        db.Boredomuser
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(json(err)))
    },

    save: function (req, res) {
        db.Boredomuser
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err))
    },

    update: function (req, res) {
        db.Boredomuser
            .findByIdAndUpdate({ _id: req.body.id }, { $set: { bio: req.body.bio } })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(json(err)))
    },

    addNew: function (req, res) {
        db.Boredomuser
            .findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { following: req.body } })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },

    getUser: function (req, res) {
        db.Boredomuser
            .findOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },

    getNew: function (req, res) {
        db.Boredomuser
            .findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { followers: req.body } })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },

    addPhoto: function (req, res) {
        db.Boredomuser
        console.log(req.body)
        // .findByIdAndUpdate({ _id: req.params.id }, { $set: { image: req.body } })
        // .then(dbModel => res.json(dbModel))
        // .catch(err => console.log(err))
    },

    seeYa: function (req, res) {
        db.Boredomuser
            .findByIdAndUpdate({ _id: req.params.id }, { $set: { following: req.body } })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err))
    },

    seeYaFollower: function (req, res) {
        db.Boredomuser
        // console.log(req.params.id)
        // console.log(req.body)
        .findByIdAndUpdate({ _id: req.params.id }, { $set: { followers: req.body } })
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err))
    }
}