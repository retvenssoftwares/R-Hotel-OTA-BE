const mongoose = require('mongoose');

const manageRates = new mongoose.Schema({
    propertyId: {
        type: String,
        default: ""
    },
    rateTypeId: {
        type: String,
        default: "",
    },
    roomTypeId: {
        type: String,
        default: "",
    },
    ratePrice: [{
        basePrice: {
            type: String,
            default: ""
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],

    
    manageRate: [{
        price: {
            type: String,
            default: "",
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }]

})

const rates = mongoose.model('manageRates', manageRates)

module.exports = rates