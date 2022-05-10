const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/users');
const statuses = [{
    status: "open",
    icon: "⭕️",
    color: "#EB5A46"
}, {
    status: "in progress",
    icon: "🔆️",
    color: "#00C2E0"
}, {
    status: "in review",
    icon: "📝",
    color: "#C377E0"
}, {
    status: "done",
    icon: "✅",
    color: "#3981DE"
}];

let taksSchema = new Schema(
    {
        task: { type: String, required: true, minlength: 4, maxlength: 50 },
        taskDescription: { type: String, required: true },
        status: {
            type: String, statuses, default:"open"
        },
        project: { type: Schema.Types.ObjectId, required: true, ref:'projects'},
        owner: { type: Schema.Types.ObjectId, required: true, ref:'users'},
        date: { type: Date, default: Date.now },
        deadline: { type: Date }
    }  
);

module.exports = mongoose.model("tasks", taksSchema);