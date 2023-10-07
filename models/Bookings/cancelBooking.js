const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const randomstring = require('randomstring')

const cancleBooking = mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    propertyId: {
        type: String,
        default: ""
    },
    checkInDate: {
        type: String,
        default: ""
    },
    checkOutDate: {
        type: String,
        default: ""
    },
    bookingId: {
        type: String,
        default: ""
    },
    roomDetails: [{
        roomTypeId: {
            type: String,
            default: ""
        },
        ratePlanId: {
            type: String,
            default: ""
        },
        reservationId: {
            type: String,
            default: randomstring.generate(15)
        },
        guestGender: {
            type: String,
            default: ""
        },
        baseAdult: {
            type: String,
            default: ""
        },
        guestAddress1: {
            type: String,
            default: ""
        },
        guestAddress2: {
            type: String,
            default: ""
        },
        purposeOfTravel: {
            type: String,
            default: ""
        },
        extraChild: {
            type: String,
            default: ""
        },
        extraAdult: {
            type: String,
            default: ""
        },
        guestDevice: {
            type: String,
            default: ""
        },
        guestLocation: {
            type: String,
            default: ""
        },
        roomPrice: {
            type: String,
            default: ""
        },
        roomTax: {
            type: String,
            default: ""
        },
        guestFirstName: {
            type: String,
            default: ""
        },
        guestLastName: {
            type: String,
            default: ""
        },
        guestEmail: {
            type: String,
            default: ""
        },
        guestCity: {
            type: String,
            default: ""
        },
        guestState: {
            type: String,
            default: ""
        },
        guestCountry: {
            type: String,
            default: ""
        },
        guestZipCode: {
            type: String,
            default: ""
        },
        guestPhoneNumber: {
            type: String,
            default: ""
        },
        estimatedArrival: {
            type: String,
            default: ""
        },
        specialRequest: {
            type: String,
            default: "",
        },
        salutation: {
            type: String,
            default: ""
        },

    }],

    roomNights: {
        type: String,
        default: ""
    },
    totalRoomRate: {
        type: String,
        default: ""
    },
    totalTax: {
        type: String,
        default: "",
    },
    totalAmount: {
        type: String,
        default: "",
    },
    bookingStatus: {
        type: String,
        default: "Pending",
    },
    paymentStatus: {
        type: String,
        default: "",
    },
    paymentMode: {
        type: String,
        default: "",
    },
    madeBy: {
        type: String,
        default: "",
    },
    createdAt: {
        type: String,
        default: "",
    },
    timeStamp: {
        type: String,
        default: ''
    },
    refundStatus : {
        type : String,
        default : ""
    }

})

module.exports = mongoose.model('cancelBooking', cancleBooking);
