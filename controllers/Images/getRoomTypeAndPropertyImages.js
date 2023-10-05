const propertyImagesModel = require('../../models/Images/propertyImages')
const roomTypeImagesModel = require('../../models/Images/roomTypeImages');

module.exports.getRoomTypeImages = async (req, res) => {
    const getRoomTypeImagesData = await roomTypeImagesModel.findOne({ roomTypeId: req.params.roomTypeId})

    if (!getRoomTypeImagesData) {
        return res.status(200).json({ message: "ID not found" })
    }

    // Filter the roomTypeImages array to include only items with displayStatus '1'
    const images = getRoomTypeImagesData.roomTypeImages.filter(
        (image) => image.displayStatus === '1'
    );

    return res.status(200).json({ images })
}

module.exports.propertyImages = async (req, res) => {
    const getPropertyImages = await propertyImagesModel.findOne({ propertyId: req.params.propertyId})

    if (!getPropertyImages) {
        return res.status(200).json({ message: "ID not found" })
    }

    //const images = getPropertyImages.propertyImages

    const images = getPropertyImages.propertyImages.filter(
        (image) => image.displayStatus === '1'
    );
    //const description = getPropertyImages.description

    

    return res.status(200).json({ images })
}