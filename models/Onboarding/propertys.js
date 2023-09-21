const mongoose = require('mongoose');
const randomstring = require("randomstring");

const propertySchema = new mongoose.Schema({
userId:{
    default:"",
    type:String
},
propertyId:{
   default:"",
    type:String

},
date:{
    type:String
},
country:{
    default:"",
    type:String
},
propertyAddress:{
    default:"",
    type:String
},

propertyAddress1:{
    default:"",
    type:String
},
postCode:{
    default:"",
    type:String
},
city:{
    default:"",
    type:String
},
latitude:{
    default:"",
    type:String,

},
longitude:{
    default:"",
    type:String
},

propertyName:{
    default:"",
    type:String,
},
Rating:[{
    rating:{
        default:"",
        type:String,
    },
}],

propertyManagement:{
    default:"",
    type:String,
},
management:{
    default:"",
    type:String,
},
amenities:[{
    amenitiesID:{
        default:"",
        type:String
    },
    isSelected:{
        default:"",
        type:String
    }

}],

checkInTime:[{
    checkInFrom:{
        default:"",
        type:String
    },
    checkInUntil:{
        default:"",
        type:String
    },
}],

checkOutTime:[{
    checkOutFrom:{
        default:"",
        type:String
    },
    checkOutUntil:{
        default:"",
        type:String
    },
}],


////
 roomType:[{
    roomTypeId:{
        default:"",
        type:String
    }
 }]

})

const property = mongoose.model('property', propertySchema);
module.exports = property;