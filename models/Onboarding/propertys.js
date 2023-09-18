const mongoose = require('mongoose');
const randomstring = require("randomstring");

const propertySchema = new mongoose.Schema({
userId:{
    default:"",
    type:String
},
propertyId:{
    default:randomstring.generate(8),
    type:String

},
country:{
    default:"",
    type:this.toString
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
starRating:{
    default:"",
    type:String,
},
amenities:[{
    amenitiesID:{
        default:"",
        type:String
    }

}],

checkInTime:{
    from:{
        default:"",
        type:String
    },
    until:{
        default:"",
        type:String
    },
},

checkOutTime:{
    from:{
        default:"",
        type:String
    },
    until:{
        default:"",
        type:String
    },
},

///breakfast
serveBreakfast:{
    default:"",
    type:String
},
isBreakfastIncluded:{
    default:"",
    type:String,
},
breakFastPricePerPerson:{
    default:"",
    type:String
},
breakfastType:[{
    breakFastID:{
        default:"",
        type:String
    }
}],
////

//parking
parkingAvailable:{
    default:"",
    type:String
},

reserveParkingSpot:{
    default:"",
    type:String
},
parkingLocation:{
    default:"",
    type:String
},
parkingType:{
    default:"",
    type:String
},
 parkingPrice:{
    default:"",
    type:String
 }

})

const property = mongoose.model('property', propertySchema);
module.exports = property;