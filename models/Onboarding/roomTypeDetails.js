const mongoose = require("mongoose")
const randomstring = require("randomstring")

const roomDetails = new mongoose.Schema({
    roomTypeId: { type: String, default: "" },
    propertyId: {
        type: String,
    },
    userId: {
        default: "",
        type: String
    },
    description: [{
        description: {
            default: "",
            type: String
        }
    }],
    numberOfRooms: [{numberOfRooms: { type: String, default: "" }}],
    bedType: [{
        bedTypeId: { type: String, default: "" },
    }],
    roomSize: [{roomSize: { type: String, default: "" }}],
    smoking: [{smoking:{ type: String, default: "" }}],
    generalAmenities: [{
        amenitiesId: { type: String, default: "" },
        isSelected: { type: String, default: '' }
    }],
    baseAdult: [{baseAdult:{
        default: "",
        type: String
    }}],
    baseChild: [{baseChild:{
        default: "",
        type: String
    }}],
    maxAdult: [{maxAdult:{
        default: "",
        type: String
    }}],
    maxChild: [{maxChild:{
        default: "",
        type: String
    }}],
    maxOccupancy: [{maxOccupancy:{
        default: "",
        type: String
    }}],
    baseRate: [{baseRate: {
        default: "",
        type: String
    }}],
    extraAdultRate: [{extraAdultRate:{
        default: "",
        type: String
    }}],
    extraChildRate: [{extraChildRate:{
        default: "",
        type: String
    }}],

    roomName: [{roomName: {
        type: String,
        default: ""
    }}],
    roomType: [{roomType:{
        type: String,
        default: ""
    }}],

    date: {
        type: String,
        default: ""
    }

})

const roomData = mongoose.model("roomType", roomDetails)
module.exports = roomData