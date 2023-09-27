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
    

    Inventory: [{
        baseInventory: {
            type: String,
            default: "",
        },
        modifiedDate: {
            type: String,
            default: ""
        }

    }],

    manageInventory: [{
        inventory: {
            type: String,
            default: "",
        },
        modifiedDate: {
            type: String,
            default: ""
        },
        isBlocked: {
            type: String,
            default: 'false'
        }
    }],
    

})

const inventory = mongoose.model('manageInventory', ManageInventory)

module.exports = inventory