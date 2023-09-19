const propertyImagesModel = require('../../models/Images/propertyImages')
const roomTypeImagesModel = require('../../models/Images/roomTypeImages');

//edit propertyImages description
module.exports.editPropertyImagesDesc = async (req, res) => {
    const { propertyId, imageId, imageDescription } = req.body

    try {
        const findAndUpdatePropertyRecord = await propertyImagesModel.updateOne(
            {
                propertyId,
                "propertyImages.imageId": imageId
            },
            {
                $set: {
                    "propertyImages.$.imageDescription": imageDescription
                }
            }
        )
        if (findAndUpdatePropertyRecord) {
            return res.status(200).json({ message: "Description updated successfully" });
        } else {
            return res.status(200).json({ message: "An error occurred" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}


//edit roomTypeImages description
module.exports.editroomTypeImagesDesc = async (req, res) => {
    const { propertyId, roomTypeId, imageId, imageDescription } = req.body

    try {
        const findAndUpdatePropertyRecord = await roomTypeImagesModel.updateOne(
            {
                propertyId,
                roomTypeId,
                "roomTypeImages.imageId": imageId
            },
            {
                $set: {
                    "roomTypeImages.$.imageDescription": imageDescription
                }
            }
        )
        if (findAndUpdatePropertyRecord) {
            return res.status(200).json({ message: "Description updated successfully" });
        } else {
            return res.status(200).json({ message: "An error occurred" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}