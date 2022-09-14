const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
    }

})

module.exports = mongoose.model("User", userSchema)