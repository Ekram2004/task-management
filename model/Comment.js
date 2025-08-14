const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        maxlength: 100,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required:true
    },
    likes: {
        type: Number,
        default:0,
    }
}, { timestamps: true });

commentSchema.index({ task: 1 });
module.exports = mongoose.model('Comment', commentSchema);
