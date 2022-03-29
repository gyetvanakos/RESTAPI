const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let taksSchema = new Schema(
    {
        task: { type: String, required: true, minlength: 4, maxlength: 50 },
        taskDescription: { type: String, required: true },
        status: { type: String, required: true },
    }  
);

module.exports = mongoose.model("task", taksSchema);