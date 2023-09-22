const inventory = require('../../models/manageInventory/manageInventory')

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const ratePlans = await inventory.find({ propertyId: propertyId });

        if (!ratePlans || ratePlans.length === 0) {
            return res.status(404).json({ error: 'No inventory found for the given propertyId' });
        }

        // Extract data from all rate plans
        const extractedData = ratePlans.map(ratePlan => ({
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            roomTypeId: ratePlan.roomTypeId,
            Inventory: ratePlan.Inventory[0] || {},
            ratesAndInventory:ratePlan.ratesAndInventory

        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
