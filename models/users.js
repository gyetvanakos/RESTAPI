const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const avatarImg = "https://i.stack.imgur.com/l60Hf.png";

let userSchema = new Schema(
    {
        first_name: { type: String, required: true, max: 255 },
        last_name: { type: String, required: true,  max: 255 },
        email:{
            type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim: true
        },
        password: { type: String, required: true, min: 6, max: 255 },
        date: { type: Date, default: Date.now }
    }
)
module.exports = mongoose.model("user", userSchema);