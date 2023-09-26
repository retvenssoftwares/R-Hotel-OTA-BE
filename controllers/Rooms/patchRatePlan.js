const ratePlanModel = require('../../models/Rooms/ratePlan');
// const manageInventoryModel = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const ratePlanId = req.params.ratePlanId
        const {
            description,
            MLOS,
            percentage,
            value,
            ratePlanName,
            priceIncrease,
            startDate,
            endDate
        } = req.body

        // Create an object with the updated data
        const updatedFields = {};

        if (description) {
            updatedFields.description = { $each: [{ description, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (MLOS) {
            updatedFields.MLOS = { $each: [{ MLOS, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
            // inventoryUpdatedFields.ratePrice = { $each: [{ basePrice, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (percentage) {
            updatedFields.percentage = { $each: [{ percentage, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (value) {
            updatedFields.value = { $each: [{ value, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (ratePlanName) {
            updatedFields.ratePlanName = { $each: [{ ratePlanName, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (priceIncrease) {
            updatedFields.priceIncrease = { $each: [{ priceIncrease, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (startDate) {
            updatedFields.startDate = { $each: [{ startDate, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (endDate) {
            updatedFields.endDate = { $each: [{ endDate, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        // Find the property by roomTypeId and update it
        const updatedRatePlan = await ratePlanModel.findOneAndUpdate(
            { ratePlanId }, // Find by ratePlanId
            {
                $push: updatedFields, // Push updated fields to arrays
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json({ message: "Rate plan updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}