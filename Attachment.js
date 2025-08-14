const mongoose = require('mongoose');
const attachmentSchema = new mongoose.Schema({
    filename: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    url: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    fileType: {
        type: String,
        required: true,
        enum:['image/jpeg', 'image/png', 'application/pdf', 'application/msword']
    },
    filePath: {
        type: String,
        required:true,
    }
}, { timestamps: true });

attachmentSchema.index = ({ uploadedBy: 1 });
module.exports = mongoose.model('Attachment', attachmentSchema);