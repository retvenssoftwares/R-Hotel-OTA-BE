const mongoose = require('mongoose');
const randomstring = require("randomstring");
///hotel owner's schema
const UserSchema = new mongoose.Schema({
    guestId: {
        default: "",
        type: String
    },
    otp:{
        default: "",
        type: String
    },
    time:{
        default: "",
        type: String
    },

    email: {
        type: String,
        default: "",
        unique: true,
    },
    isOtpVerified:{
       type:String,
       default:"false"
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
   
})

const signup = mongoose.model('userAccount', UserSchema);
module.exports = signup;
