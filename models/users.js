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
        role: { type: Number,   default : 1 },
        avatar: { type: String, default :'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.w3schools.com%2Fhowto%2Fhowto_css_image_avatar.asp&psig=AOvVaw2YfLXCEWHVCpux3hDyRI5O&ust=1651580288009000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLjZk5XmwPcCFQAAAAAdAAAAABAD'  },
        date: { type: Date, default: Date.now }
    }
)
module.exports = mongoose.model("user", userSchema);