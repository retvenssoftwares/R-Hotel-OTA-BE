const mongoose = require("mongoose");
const randomstring = require("randomstring");


const amenitySchema = new mongoose.Schema({

  amenityId: { type: String, default: randomstring.generate(10) },

  amenityName: { type: String, default: "", required: false },

  amenityType: { type: String, default: "", required: false },

  amenityCategory: { type: String, default: "", required: false},

  amenityCharges: { type: String, default: "", required: false },

  amenityDescription: { type: String, default: "", required: false },

  amenityIcon: { type: String, default: "", required: false },

  amenitySortCode : { type: String, default: "", required: false },

  createdBy : { type: String, default: "", required: false },

  modifiedBy : [{ type: String, default: "", required: false }],

  modifiedDate : [{ type: String, default: "", required: false }]


});

const amenities = mongoose.model("Amenities", amenitySchema)
module.exports = amenities