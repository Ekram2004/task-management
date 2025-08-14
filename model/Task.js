const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength:100,
    },
    description: {
        type: String,
        maxlength:500,
    },
    status: {
        type: String,
        enum: ["open", "in progress", "completed", "blocked", "on hold"],
        default: "in progress",
        required:true
    },
    dueDate: {
        type: Date,
        default: ()=> new Date(Date.now()+ 7*24*60*60*1000)
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required:true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    }
}, { timestamps: true });

taskSchema.index({ assignedTo: 1, project: 1, status: 1 });
module.exports = mongoose.model('Task', taskSchema);