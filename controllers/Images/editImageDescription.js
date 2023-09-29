const propertyImagesModel = require('../../models/Images/propertyImages')
const roomTypeImagesModel = require('../../models/Images/roomTypeImages');

//edit propertyImages description
module.exports.editPropertyImagesDesc = async (req, res) => {
    const { propertyId, imageId, imageDescription, displayStatus } = req.body;
    if (propertyId === undefined || imageId === undefined) {
        return res.status(200).json({ message: "propertyId, imageId, and imageDescription is required" });
    }
    try {
        const findAndUpdatePropertyRecord = await propertyImagesModel.updateOne(
            {
                propertyId,
                "propertyImages.imageId": imageId
            },
            {
                $set: {
                    "propertyImages.$.imageDescription": imageDescription,
                    "propertyImages.$.displayStatus": displayStatus
                }
            }
        )
        if (findAndUpdatePropertyRecord) {
            return res.status(200).json({ message: "Image edited successfully" });
        } else {
            return res.status(200).json({ message: "An error occurred" });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}


//edit roomTypeImages description
module.exports.editroomTypeImagesDesc = async (req, res) => {
    const { propertyId, roomTypeId, imageId, imageDescription, displayStatus } = req.body

    if (propertyId === undefined || imageId === undefined || roomTypeId === undefined) {
        return res.status(200).json({ message: "propertyId, roomTypeId, imageId, imageDescription is required" });
    }

    try {
        const findAndUpdatePropertyRecord = await roomTypeImagesModel.updateOne(
            {
                propertyId,
                roomTypeId,
                "roomTypeImages.imageId": imageId
                
            },
            {
                $set: {
                    "roomTypeImages.$.imageDescription": imageDescription,
                    "roomTypeImages.$.displayStatus": displayStatus
                }
            }
        )
        if (findAndUpdatePropertyRecord) {
            return res.status(200).json({ message: "Image edited successfully" });
        } else {
            return res.status(200).json({ message: "An error occurred" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}