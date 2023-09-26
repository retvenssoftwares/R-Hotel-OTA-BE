const inventory = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const startDate = req.query.startDate;

        if (!startDate) {
            return res.status(400).json({ error: 'Start date is required as a query parameter.' });
        }

        const manageInventory = await inventory.find({
            propertyId: propertyId,
            // $or: [
            //     { 'manageInventory.modifiedDate': { $gte: startDate } },
            //     { 'manageInventory': { $exists: false, $size: 0 } }
            // ]
        });

        if (!manageInventory || manageInventory.length === 0) {
            return res.status(404).json({ error: 'No inventory found for the given propertyId and date range.' });
        }

        // Extract ratesAndInventory data within the specified date range
        const extractedData = manageInventory.map(ratePlan => ({
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            roomTypeId: ratePlan.roomTypeId,
            Inventory: ratePlan.Inventory[0] || {},
            manageInventory: ratePlan.manageInventory
                ? ratePlan.manageInventory
                      .filter(item => item.modifiedDate >= startDate)
                      .slice(0, 6)
                : [] // Empty array if manageInventory is not defined
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
