const { request } = require('express');
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength:500,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required:true
    },
    endDate: {
        type: Date,
        required: true,
        validate:{
           validator: function (value) {
                return this.startDate <= value;
            },
            message:'End date must be after start date',
        },
    },
    status: {
        type: String,
        enum: ["active", 'on', 'hold', 'completed', 'cancelled'],
        default: 'active',
        required:true,
    },
    teamMembers:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }]
}, { timestamps: true });
projectSchema.index({ teamMembers: 1 });

module.exports = mongoose.model('Project', projectSchema);