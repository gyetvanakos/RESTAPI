const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


let userSchema = new Schema(
    {
        first_name: { type: String, required: true, max: 255 },
        last_name: { type: String, required: true,  max: 255 },
        email:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is in valid')
                }
            },
            trim: true
        },
        password: { type: String, required: true, min: 6, max: 255 },
        role: {
            type: String,
            default: 'user',
            enum: ["user", "admin"]
           },
        avatar: { type: String },
        date: { type: Date, default: Date.now }
    }
)
module.exports = mongoose.model("user", userSchema);