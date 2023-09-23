const inventoryModel = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const { ratesAndInventory } = req.body;

        // Find the inventory document for the specified roomTypeId
        const findInventory = await inventoryModel.findOne({ roomTypeId });

        if (!findInventory) {
            return res.status(404).json({ message: "Inventory not found for the given roomTypeId" });
        }

        // Iterate through the incoming ratesAndInventory array
        for (const update of ratesAndInventory) {
            const { inventory, date } = update;

            // Check if the date already exists in the ratesAndInventory array
            const existingEntry = findInventory.ratesAndInventory.find(entry => entry.date === date);

            if (existingEntry) {
                // If the date exists, update the inventory
                existingEntry.inventory = inventory;
            } else {
                // If the date does not exist, add a new entry
                findInventory.ratesAndInventory.unshift({ inventory, date });
            }
        }

        // Save the updated inventory document
        await findInventory.save();

        return res.status(200).json({ message: "Inventory updated successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
