const mongoose = require('mongoose');
const randomstring = require("randomstring");
///hotel owner's schema
const UserSchema = new mongoose.Schema({
    userId: {
        default: "",
        type: String
    },

    email: {
        type: String,
        default: "",
        unique: true,
        required: true
    },

    password: [{
        pwd: {

            default: "",
            type: String,
            required: true
        },
    }],

    firstName: {
        default: "",
        type: String
    },
    lastName: {
        default: "",
        type: String
    },
    phoneNumber: {
        default: "",
        type: String
    },
    role: [{
        role: {
            type: String,
            default: ''
        },
        modifiedDate: { type: String }
    }],
    sessionId: {
        default: "",
        type: String

    },

    Property: [{
        propertyId: {
            type: String,
            default: ""
        }
    }],
    date: {
        type: String
    }
})

const signup = mongoose.model('registration', UserSchema);
module.exports = signup;
