const mongoose = require("mongoose");
const randomstring = require("randomstring");


const inclusionSchema = new mongoose.Schema({
    inclusionId: {type: String, default: randomstring.generate(8), unique: true},
    inclusionName: {type: String, default: ''},
    inclusionType: {type: String, default: ''},
    // inclusionCharges: {type: String, default: ''},
    inclusionDescription: {type: String, default: ''},
    inclusionIcon: {type: String, default: ''}
  });

const inclusionModel = mongoose.model("inclusions", inclusionSchema)
module.exports = inclusionModel