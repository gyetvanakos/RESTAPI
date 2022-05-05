const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 4, maxlength: 50 },
        backgr_pic: { type: String, required: true, minlength: 4, maxlength: 255 },
        description: { type: String, required: true },
        date: { type: Date, default: Date.now },
        users: [{ type: Schema.Types.ObjectId, required: true, ref:'users'}]
    }  
);

module.exports = mongoose.model("project", projectSchema);