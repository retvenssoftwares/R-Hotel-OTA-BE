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

    basePrice: {
        type: String,
        default: ""
    },
    baseInventory: {
        type: String,
        default: ""
    },
    ratesAndInventory: [{
        inventory: {
            type: String,
            default: "",
        },
        price: {
            type: String,
            default: "",
        },
        date: {
            type: String,
            default: ""
        }
    }]




})

const inventory = mongoose.model('manageInventory', ManageInventory)

module.exports = inventory