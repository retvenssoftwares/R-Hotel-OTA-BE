const mongoose = require("mongoose")
const randomstring = require("randomstring")

const roomDetails = new mongoose.Schema({
    roomTypeId : {type:String , default: randomstring.generate()},
    numberOfRooms : {type:String , default:""},
    bedType : [{
        bedTypeId : {type:String , default: ""},
    }],
    guestStayInRoom : {type:String , default:""},
    roomSize : {type:String , default:""},
    smoking:{type:String , default:""},
    generalAmenities:[{
        amenitiesId : {type:String , default:""}
    }],
    isBathRoomPrivate  :{type:String , default:""},
    bathRoomItems : [{
        bathRoomItemsId:{type:String , default:""}
    }],
    outDoorsAndViews:[{
        outDoorsAndViewsId :{type:String, default:""}
    }],
    foodAndDrink :[{
        foodAndDrinkId:{type:String , default:""}
    }],
    roomName : {
        type:String,
        default:""
    },
    chargePerNight :{
        type:String,
        default:""
    }

})

const roomData = mongoose.model("roomDetails" ,roomDetails )
module.exports = roomData