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
    name:[{
        name: {
            type: String,
            default: ""
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
 
basePrice:[{
    basePrice: {
        type: String,
        default: "",
    },
    modifiedDate: {
        default: "",
        type: String
    }
}],
   
roomType:[{
    roomType: {
        type: String,
        default: "",
    },
    modifiedDate: {
        default: "",
        type: String
    }
}],
taxIncluded:[{
  
    taxIncluded: {
        type: String,
        default: "",
    },
    modifiedDate: {
        default: "",
        type: String
    }
}],

refundable:[{
    refundable: {
        type: String,
        default: "",
    },
    modifiedDate: {
        default: "",
        type: String
    }
}],

   
   
    date: {
        type: String,
        default: ""
    }

})

const rateType = mongoose.model("rateType", rateTypeSchema)
module.exports = rateType