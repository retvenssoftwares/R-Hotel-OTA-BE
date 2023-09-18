const mongoose = require("mongoose")
const randomstring = require("randomstring")

const roomDetails = new mongoose.Schema({
    roomTypeId: { type: String, default: "" },
    propertyId: {
        type: String,
    },
    numberOfRooms: { type: String, default: "" },
    bedType: [{
        bedTypeId: { type: String, default: "" },
        numberOfBeds: { type: String, default: "" }
    }],
    roomSize: { type: String, default: "" },
    smoking: { type: String, default: "" },
    generalAmenities: [{
        amenitiesId: { type: String, default: "" }
    }],
    baseAdult: {
        default: "",
        type: String
    },
    maxAdult: {
        default: "",
        type: String
    },
    maxChild: {
        default: "",
        type: String
    },
    maxOccupancy: {
        default: "",
        type: String
    },
    baseRate: {
        default: "",
        type: String
    },
    extraAdultRate: {
        default: "",
        type: String
    },
    extraChildRate: {
        default: "",
        type: String
    },

    roomName: {
        type: String,
        default: ""
    },
    roomType: {
        type: String,
        default: ""
    },

    date: {
        type: String,
        default: ""
    }

})

const roomData = mongoose.model("roomType", roomDetails)
module.exports = roomData