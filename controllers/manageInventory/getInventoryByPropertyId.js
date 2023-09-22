const inventory = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Both start date and end date are required as query parameters.' });
        }

        const manageInventory = await inventory.find({
            propertyId: propertyId,
            'ratesAndInventory.date': {
                $gte: startDate,
                $lte: endDate
            }
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
            ratesAndInventory: ratePlan.ratesAndInventory.filter(item => item.date >= startDate && item.date <= endDate)
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
