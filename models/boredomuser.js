const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boredomuserSchema = new Schema({
    username: { type: String },
    full_name: {type: String},
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgEJf3figiiLmSgtwKnEgEkRw1qUf2ke1Bg&usqp=CAU" },
    followers: {
        users: {
            id: {
                type: String,
                default: "1"
            },
            first_name: {
                type: String,
                default: "Anthony"
            },
            last_name: {
                type: String,
                default: "Parrino"
            }
        }
    },
    following: {
        users: {
            id: {
                type: String,
                default: "1"
            },
            first_name: {
                type: String,
                default: "Anthony"
            },
            last_name: {
                type: String,
                default: "Parrino"
            }
        }
    },
    bio: { type: String, default: "No Bio" },
    date: { type: Date, default: Date.now }
});

const Boredomuser = mongoose.model("boredomuser", boredomuserSchema);

module.exports = Boredomuser;