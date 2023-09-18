const mongoose = require("mongoose");
const randomstring = require("randomstring");

const bathroomItemsSchema = new mongoose.Schema({

  bathroomItemId: { type: String, default: randomstring.generate(10), unique: true },

  bathroomItemName: { type: String, default: "", required: false },

  bathroomItemSortCode : { type: String, default: "", required: false, unique: true },

  createdBy : { type: String, default: "", required: false },

  modifiedBy : [{ type: String, default: "", required: false }],

  modifiedDate : [{ type: String, default: "", required: false }]

});

const bathroomItems = mongoose.model("bathroomitems", bathroomItemsSchema)
module.exports = bathroomItems