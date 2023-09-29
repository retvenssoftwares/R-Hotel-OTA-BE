const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    propertyId: {
        type: String,
        required: false,
    },
    activities: [{
        employeeName: {
            type: String,
            required: false,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        module: {
            type: String,
            required: false,
        },
        location: String,
        durationMinutes: Number,
        deviceOrEquipment: String,
        notes: String,
        role: String,
        actionType: String,
        statusCode: {type: String, default: ''}
    }],
    date: { type: String, default: '' }
});

const activityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = activityLog;
