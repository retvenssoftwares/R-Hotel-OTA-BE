const mongoose = require('mongoose');

const ManageInventory = new mongoose.Schema({
    propertyId: {
        type: String,
        default: ""
    },
    roomTypeId: {
        type: String,
        default: "",
    },
    manageInventory: {
        addedInventory: [{
            addedInventory: { type: Number, default: "" },
            date: { type: String, default: "" }
        }],
        blockedInventory: [{
            blockedInventory: { type: Number, default: "" },
            date: { type: String, default: '' }
        }],
    },

})

const inventory = mongoose.model('manageInventory', ManageInventory)

module.exports = inventory