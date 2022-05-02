const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/users');

let taksSchema = new Schema(
    {
        task: { type: String, required: true, minlength: 4, maxlength: 50 },
        taskDescription: { type: String, required: true },
        status: { type: Boolean, required: true },
        project: { type: Schema.Types.ObjectId, required: true, ref:'projects'},
        owner: { type: Schema.Types.ObjectId, required: true, ref:'users'}
    }  
);

module.exports = mongoose.model("tasks", taksSchema);