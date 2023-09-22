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
    ratePlan:[{
        ratePlanId: {type: String, default: ''},
        isActive: {type: String, default: 'true'},
        modifiedDate: {type: String, default:''}
    }],
    description: [{
        description: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    numberOfRooms: [{
        numberOfRooms: { type: String, default: "" },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    bedType: [{
        bedTypeId: { type: String, default: "" },
    }],
    roomSize: [{
        roomSize: { type: String, default: "" },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    smoking: [{
        smoking: { type: String, default: "" },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    generalAmenities: [{
        amenitiesId: { type: String, default: "" },
        isSelected: { type: String, default: '' },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    baseAdult: [{
        baseAdult: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    baseChild: [{
        baseChild: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    maxAdult: [{
        maxAdult: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    maxChild: [{
        maxChild: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    maxOccupancy: [{
        maxOccupancy: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    baseRate: [{
        baseRate: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    extraAdultRate: [{
        extraAdultRate: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    extraChildRate: [{
        extraChildRate: {
            default: "",
            type: String
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],

    roomName: [{
        roomName: {
            type: String,
            default: ""
        },
        modifiedDate: {
            default: "",
            type: String
        }
    }],
    roomType: [{
        roomType: {
            type: String,
            default: ""
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

const roomData = mongoose.model("roomType", roomDetails)
module.exports = roomData