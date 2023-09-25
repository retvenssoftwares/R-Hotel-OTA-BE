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
ratePrice:[{
    basePrice: {
        type: String,
        default: ""
    },
    modifiedDate: {
        type: String,
        default: ""
    }
}],
   
    Inventory: [{
        baseInventory:{
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
        date: {
            type: String,
            default: ""
        }
    }],
    manageRate: [{
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