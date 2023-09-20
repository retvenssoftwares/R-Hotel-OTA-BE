const mongoose = require("mongoose");
const randomstring = require("randomstring");


const roomTypeListSchema = new mongoose.Schema({

  roomTypeListId: { type: String, default: randomstring.generate(10), unique: true },

  roomTypeListName: { type: String, default: "", required: false },

  roomTypeListIcon: { type: String, default: "", required: false },

//   roomTypeSize:{type: String, default: ''},

//   roomTypeSortCode : { type: String, default: "", required: false, unique: true },

//   numberOfOccupants: {type: String, default: ""},

  createdBy : { type: String, default: "", required: false },

  modifiedBy : [{ type: String, default: "", required: false }],

  modifiedDate : [{ type: String, default: "", required: false }]

});

const roomTypesListModel = mongoose.model("roomtypesList", roomTypeListSchema)
module.exports = roomTypesListModel