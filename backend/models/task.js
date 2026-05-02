const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required:true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    deadline: {
        type: Date,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Task", taskSchema);