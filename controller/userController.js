const db = require("../models");
const { findOneAndUpdate } = require("../models/boredomuser");

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
            .findByIdAndUpdate({_id: req.body.id}, {$set: {bio: req.body.bio}})
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(json(err)))
    },

    addNew: function (req, res) {
        db.Boredomuser
            .findByIdAndUpdate({ _id: req.params.id }, {$addToSet: {following: req.body}})
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },

    getUser: function (req, res) {
        db.Boredomuser
            .findOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));
    },
}