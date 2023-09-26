const rateTypeModel = require('../../models/Rooms/rateType');
const manageInventoryModel = require('../../models/manageInventory/manageInventory')

module.exports = async (req, res) => {
    try {
        // const findRateType = req.params.ratePlanId
        const {
            rateTypeId,
            name,
            roomTypeId,
            basePrice,
            roomType,
            taxIncluded,
            refundable
        } = req.body

        // Create an object with the updated data
        const updatedFields = {};
        const inventoryUpdatedFields = {}

        if (name) {
            updatedFields.name = { $each: [{ name, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (basePrice) {
            updatedFields.basePrice = { $each: [{ basePrice, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
            inventoryUpdatedFields.ratePrice = { $each: [{ basePrice, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (roomType) {
            updatedFields.roomType = { $each: [{ roomType, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (taxIncluded) {
            updatedFields.taxIncluded = { $each: [{ taxIncluded, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (refundable) {
            updatedFields.refundable = { $each: [{ refundable, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        // Find the property by roomTypeId and update it
        const updatedRateType = await rateTypeModel.findOneAndUpdate(
            { rateTypeId }, // Find by rateTypeId
            {
                $push: updatedFields, // Push updated fields to arrays
            },
            { new: true } // Return the updated document
        );
        // Find the property by roomTypeId and update it
        const updatedInventory = await manageInventoryModel.findOneAndUpdate(
            { roomTypeId }, // Find by roomTypeId
            {
                $push: inventoryUpdatedFields, // Push updated fields to arrays
            },
            { new: true } // Return the updated document
        );
        return res.status(200).json({ message: "Rate type updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}