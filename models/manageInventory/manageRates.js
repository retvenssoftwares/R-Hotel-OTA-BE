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
    
    manageRates: {
        price: [{
            price: { type: String, default: '' },
            date: { type: String, default: "" }
        }],
        extraChildRate: [{
            date: { type: String, default: "" },
            extraChildRate: { type: String, default: "" }
        }],
        extraAdultRate: [{
            date: { type: String, default: "" },
            extraAdultRate: { type: String, default: "" }
        }],
    }

})

const rates = mongoose.model('manageRates', manageRates)

module.exports = rates