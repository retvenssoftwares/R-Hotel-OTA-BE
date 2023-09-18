const mongoose = require("mongoose")
const randomstring = require("randomstring")

const rateDetails = new mongoose.Schema({

    rateTypeId: {
        default: "",
        type: String
    },
    roomTypeId:{
        default: "",
        type: String
    },
    inclusion:[{
      inclusionType:{
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
    date: {
        type: String,
        default: ""
    }

})

const rateData = mongoose.model("rateType", rateDetails)
module.exports = rateData