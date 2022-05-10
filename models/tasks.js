const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/users');

let taksSchema = new Schema(
    {
        task: { type: String, required: true, minlength: 4, maxlength: 50 },
        taskDescription: { type: String, required: true },
        status: { type: String },
        project: { type: Schema.Types.ObjectId, required: true, ref:'projects'},
        owner: { type: Schema.Types.ObjectId, required: true, ref:'users'},
        date: { type: Date, default: Date.now },
        deadline: { type: Date }
    }  
);

module.exports = mongoose.model("tasks", taksSchema);