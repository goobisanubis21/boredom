const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boredomuserSchema = new Schema({
    name: {type: String},
    email: { type: String },
    firebase_id: { type: String },
    date: { type: Date, default: Date.now }
});

const Boredomuser = mongoose.model("boredomuser", boredomuserSchema);

module.exports = Boredomuser;