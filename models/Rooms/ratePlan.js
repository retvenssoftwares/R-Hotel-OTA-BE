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
    rateTypeId:{
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
    description:[{
        description:{
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],    
   

    MLOS:[{
        MLOS:{
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        },
    }],
   
    percentage:[{
        percentage:{
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        },
    }],

    value:[{
        value:{
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        },

    }],
   
   
    ratePlanName:[{
        ratePlanName:{
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        },
    }],

  priceIncrease:[{
    priceIncrease:{
        type: String,
        default: ""
    },
    modifiedDate: {
        default: "",
        type: String
    },

  }],
   

    startDate:[{
        startDate:{
            type: String,
            default: ""
    
        },
        modifiedDate: {
            default: "",
            type: String
        },
    }],
    
   endDate:[{
    endDate:{
        type: String,
        default: ""

    },
    modifiedDate: {
        default: "",
        type: String
    },

   }],
    

    date: {
        type: String,
        default: ""
    }

})

const rateData = mongoose.model("ratePlan", rateDetails)
module.exports = rateData