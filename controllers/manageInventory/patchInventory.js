// const inventoryModel = require('../../models/manageInventory/manageInventory');

// module.exports = async (req, res) => {
//     try {
//         const roomTypeId = req.params.roomTypeId;
//         const { ratesAndInventory } = req.body;

//         // Find the inventory document for the specified roomTypeId
//         const findInventory = await inventoryModel.findOne({ roomTypeId });

//         if (!findInventory) {
//             return res.status(404).json({ message: "Inventory not found for the given roomTypeId" });
//         }

//         // Iterate through the incoming ratesAndInventory array
//         for (const update of ratesAndInventory) {
//             const { inventory, date } = update;

//             // Check if the date already exists in the ratesAndInventory array
//             const existingEntry = findInventory.ratesAndInventory.find(entry => entry.date === date);

//             if (existingEntry) {
//                 // If the date exists, update the inventory
//                 existingEntry.inventory = inventory;
//             } else {
//                 // If the date does not exist, add a new entry
//                 findInventory.ratesAndInventory.unshift({ inventory, date });
//             }
//         }

//         // Save the updated inventory document
//         await findInventory.save();

//         return res.status(200).json({ message: "Inventory updated successfully" });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }



const inventoryModel = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const { startDate, endDate, inventory } = req.body;

        // Find the inventory document for the specified roomTypeId
        const findInventory = await inventoryModel.findOne({ roomTypeId });

        if (!findInventory) {
            // Handle the case where no inventory document was found
            return res.status(404).json({ message: "Inventory not found for the given roomTypeId" });
        }

        // Iterate through the dates within the specified date range
        for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
            const formattedDate = date.toISOString().slice(0, 10); // Format the date as "YYYY-MM-DD"

            // Check if the date already exists in the ratesAndInventory array
            const existingEntry = findInventory.ratesAndInventory.find(entry => entry.date === formattedDate);

            if (existingEntry) {
                // If the date exists, update the inventory
                existingEntry.inventory = inventory;
            } else {
                // If the date does not exist, add a new entry
                findInventory.ratesAndInventory.unshift({ inventory, date: formattedDate });
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
