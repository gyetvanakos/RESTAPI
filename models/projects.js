const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const bgrPicture = "https://newevolutiondesigns.com/images/freebies/rainbow-facebook-cover-1.jpg";


let projectSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 4, maxlength: 50 },
        backgr_pic: { type: String, default:bgrPicture },
        description: { type: String, required: true },
        date: { type: Date, default: Date.now },
        users: [{ type: String }],
        ownerId: { type: Schema.Types.ObjectId, required: true, ref:'users'},
    }  
);

module.exports = mongoose.model("project", projectSchema);