const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    members:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
}, { timestamps: true });

teamSchema.index({ members: 1 });
module.exports = mongoose.model('Team', teamSchema);