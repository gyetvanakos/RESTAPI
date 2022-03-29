const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        first_name: { type: String, required: true, min: 6, max: 255 },
        last_name: { type: String, required: true, min: 6, max: 255 },
        email: { type: String, required: true, min: 6, max: 255 },
        password: { type: String, required: true, min: 6, max: 255 },
        role: { type: String, required: true, min: 6, max: 255 },
        avatar: { type: String, required: true, min: 6, max: 255 },
        date: { type: Date, default: Date.now }
    }
)
module.exports = mongoose.model("user", userSchema);