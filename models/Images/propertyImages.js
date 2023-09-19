const mongoose = require("mongoose");
const randomstring = require("randomstring");


const propertyImageSchema = mongoose.Schema({

    propertyId: { type: String, default: '', unique: false },

    propertyImages: [
        {
            imageId: {type: String, default:''},
            image: { type: String, default: '' },
            displayStatus: {type:String, default: '1' },
            imageDescription: {type: String, default: ''}
        }
    ]

});

const propertyImageModel = mongoose.model("propertyImages", propertyImageSchema)
module.exports = propertyImageModel