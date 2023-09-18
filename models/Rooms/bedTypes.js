const mongoose = require("mongoose");
const randomstring = require("randomstring");


const bedTypeSchema = new mongoose.Schema({

  bedTypeId: { type: String, default: randomstring.generate(10), unique: true },

  bedTypeName: { type: String, default: "", required: false },

  bedTypeIcon: { type: String, default: "", required: false },

  bedTypeSize:{type: String, default: ''},

  bedTypeSortCode : { type: String, default: "", required: false, unique: true },

  numberOfOccupants: {type: String, default: ""},

  createdBy : { type: String, default: "", required: false },

  modifiedBy : [{ type: String, default: "", required: false }],

  modifiedDate : [{ type: String, default: "", required: false }]

});

const bedTypes = mongoose.model("bedtypes", bedTypeSchema)
module.exports = bedTypes