const mongoose = require('mongoose');

const ratesInventoryDump = new mongoose.Schema({
    propertyId: {
        type: String,
        default: ""
    },
    roomTypeId: {
        type: String,
        default: "",
    },

    manageInventory: [{
        inventory: {
            type: String,
            default: "",
        },
        modifiedDate: {
            type: String,
            default: ""
        },
        date: {
            type: String,
            default: ""
        },
        isBlocked: {
            type: String,
            default: 'false'
        }
    }],
    manageRate: [{
        rateTypeId: { type: String, default: '' },
        price: {
            type: String,
            default: "",
        },
        modifiedDate: {
            type: String,
            default: ""
        },
        date: {
            type: String, 
            default: ''
        }
    }],
    date: {
        type: String,
        default: 'false'
    }

})

const inventoryRateDump = mongoose.model('dumpInventoryRates', ratesInventoryDump)

module.exports = inventoryRateDump