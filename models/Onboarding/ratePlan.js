const mongoose = require("mongoose")

const ratePlanSchema = new mongoose.Schema({
rateTypeId:{
    type:String,
    default:"",
},
roomTypeId: { type: String, default: "" },
rateTypeId: {
    default: "",
    type: String
},
propertyId:{
    default:"",
     type:String
 
 },
name:{
    type:String,
    default:""
},
inclusion:[{
    inclusionId:{
        type:String,
        default:"",
    }

}],
basePrice:{
    type:String,
    default:"",
},
roomType:{
    type:String,
    default:"",
},
taxIncluded:{
    type:String,
    default:"",
},
refundable:{
    type:String,
    default:"",
},
startDate:{
    type:String,
    default:"",
},
endDate:{
    type:String,
    default:"",
},
date: {
    type: String,
    default: ""
}

})

const ratePlan = mongoose.model("ratePlan", ratePlanSchema)
module.exports = ratePlan