const mongoose = require("mongoose")
const randomstring = require("randomstring")

const rateDetails = new mongoose.Schema({

    propertyId: {
        type: String,
    },
    ratePlanId: {
        default: "",
        type: String
    },
    roomTypeId:{
        default: "",
        type: String
    },
    inclusion:[{
      inclusionId:{
        default:"",
        type:String
      },
      isSelected:{
        default:"",
        type:String
      }
    }],       
    description:{
        default: "",
        type: String
    },
    MLO:{
        default: "",
        type: String
    },
    percentage:{
        default: "",
        type: String
    },
    value:{
        default: "",
        type: String
    },
    rateTypeName:{
        default: "",
        type: String
    },
    startDate:{
        type: String,
        default: ""

    },
    priceIncrease:{
        type: String,
        default: ""
    },

    endDate:{
        type: String,
        default: ""

    },

    date: {
        type: String,
        default: ""
    }

})

const rateData = mongoose.model("ratePlan", rateDetails)
module.exports = rateData