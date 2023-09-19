const mongoose = require("mongoose");
const randomstring = require("randomstring");


const roomTypeImagesSchema = mongoose.Schema({

    propertyId: { type: String, default: '', unique: false },

    roomTypeId: {type: String, default: ''},

    roomTypeImages: [
        {
            imageId: {type: String, default:''},
            image: { type: String, default: '' },
            displayStatus: {type:String, default: '1' },
            imageDescription: {type: String, default: ''}
        }
    ]

});

const roomTypeImageModel = mongoose.model("roomTypeImages", roomTypeImagesSchema)
module.exports = roomTypeImageModel