const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 4, maxlength: 50 },
        backgr_pic: { type: String, required: true, minlength: 4, maxlength: 50 },
        description: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }  
);

module.exports = mongoose.model("project", projectSchema);