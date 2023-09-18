const mongoose = require("mongoose");
const randomstring = require("randomstring");


const roomTypeImagesSchema = new mongoose.Schema({

    propertyId: { type: String, default: '', unique: false },

    roomTypeId: {type: String, default: ''},

    roomTypeImages: [
        {
            imageId: {type: String, default:''},
            image: { type: String, default: '' },
            displayStatus: {type:String, default: '' },
            imageDescription: {type: String, default: ''}
        }
    ]

});

const roomTypeImageModel = mongoose.model("roomTypeImages", roomTypeImagesSchema)
module.exports = roomTypeImageModel