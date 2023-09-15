const mongoose = require('mongoose');

///hotel owner's schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "",
        unique:true,
       required: true
    },

    password: [{
       
        default: "",
        type: String, 
    
        required: true
    }],

    firstName:{
        default:"",
        type:String
    },
    lastName:{
        default:"",
        type:String
    },
    phoneNumber:{
        default:"",
        type:String
    },

     date:{
        type:String
     }
})


const signup = mongoose.model('registration', UserSchema);
module.exports = signup;
