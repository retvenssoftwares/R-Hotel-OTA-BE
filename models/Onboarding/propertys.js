const mongoose = require('mongoose');
const randomstring = require("randomstring");

const propertySchema = new mongoose.Schema({
    userId: {
        default: "",
        type: String
    },
    propertyId: {
        default: "",
        type: String

    },
    date: {
        type: String
    },
    country: {
        default: "",
        type: String
    },
    propertyAddress: [{
        propertyAddress: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],

    propertyAddress1: [{
        propertyAddress1: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],
    postCode: [{
        postCode: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],

    city: [{
        city: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],
    location: [{

        latitude: {
            default: "",
            type: String,

        },
        longitude: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],

    propertyName: [{
        propertyName: {
            default: "",
            type: String,
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],

    rating: [{
        rating: {
            default: "",
            type: String,
        },
        modifiedDate: {
            type: String,
            default: ""
        }

    }],


    propertyManagement: {
        default: "",
        type: String,
    },
    management: {
        default: "",
        type: String,
    },
    amenities: [{
        amenitiesId: {
            default: "",
            type: String
        },
        isSelected: {
            default: "",
            type: String
        }

    }],

    checkInTime: [{
        checkInFrom: {
            default: "",
            type: String
        },
        checkInUntil: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],

    checkOutTime: [{
        checkOutFrom: {
            default: "",
            type: String
        },
        checkOutUntil: {
            default: "",
            type: String
        },
        modifiedDate: {
            type: String,
            default: ""
        }
    }],


    coverPhoto:[{
        coverPhotoId:{
            default:"",
            type:String,

        },
        coverPhoto:{
            default:"",
            type:String,
        },
        modifiedDate: {
            type: String,
            default: ""
        },

    }],

    hotelLogo:[{
        hotelLogoId:{
            default:"",
            type:String,
        },
        hotelLogo:{
            default:"",
            type:String,
        },
        modifiedDate: {
            type: String,
            default: ""
        },

    }],

    ////
    roomType: [{
        roomTypeId: {
            default: "",
            type: String
        }
    }]

})

const property = mongoose.model('property', propertySchema);
module.exports = property;