const mongoose = require("mongoose")

const rateTypeSchema = new mongoose.Schema({
    rateTypeId: {
        type: String,
        default: "",
    },
    roomTypeId: { type: String, default: "" },

    propertyId: {
        default: "",
        type: String

    },
    name: {
        type: String,
        default: ""
    },
    // inclusion: [{
    //     inclusionId: {
    //         default: "",
    //         type: String
    //     },
    //     isSelected: {
    //         default: "",
    //         type: String
    //     }
    // }],
    basePrice: {
        type: String,
        default: "",
    },
    roomType: {
        type: String,
        default: "",
    },
    taxIncluded: {
        type: String,
        default: "",
    },
    refundable: {
        type: String,
        default: "",
    },
   
    date: {
        type: String,
        default: ""
    }

})

const rateType = mongoose.model("rateType", rateTypeSchema)
module.exports = rateType