const inventoryModel = require('../../models/manageInventory/manageInventory');
const dumpInventoryRatesModel = require('../../models/manageInventory/dataDumpInventoryRates')

module.exports = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const { startDate, endDate, isBlocked } = req.body;

        // Find the inventory document for the specified roomTypeId
        const findInventory = await inventoryModel.findOne({ roomTypeId });
        const findDumpInventory = await dumpInventoryRatesModel.findOne({ roomTypeId });

        if (!findInventory) {
            return res.status(404).json({ message: "Inventory not found for the given roomTypeId" });
        }

        if (!findInventory.manageInventory) {
            findInventory.manageInventory = [];
        }

        const { Inventory } = findInventory
        let baseInventory = Inventory[0].baseInventory;

        // Parse startDate as a Date object
        const startDateObj = new Date(startDate);

        // Get today's date
        const today = new Date();

        // Check if startDate is older than today's date
        if (startDateObj < today) {
            return res.status(400).json({ message: "startDate must not be older than today's date" });
        }
        //  console.log(baseInventory)
        // Calculate the number of days in the date range
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

        if (dayDifference < 0) {
            return res.status(400).json({ message: "End date cannot be before the start date" });
        }

        // Create entries for each date within the range
        for (let i = 0; i <= dayDifference; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format

            // Check if the date already exists in the ratesAndInventory array
            const existingEntry = findInventory.manageInventory.find(entry => entry.date === dateString);

            if (existingEntry) {
                // If the date exists, update the inventory
                existingEntry.isBlocked = isBlocked;
                existingEntry.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                findDumpInventory.manageInventory.push({ date: dateString, inventory: baseInventory, isBlocked: isBlocked, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });

            } else {
                // If the date does not exist, add a new entry
                findInventory.manageInventory.push({ date: dateString, inventory: baseInventory, isBlocked: isBlocked, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
                findDumpInventory.manageInventory.push({ date: dateString, inventory: baseInventory, isBlocked: isBlocked, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
            }
        }

        // Save the updated inventory document
        await findInventory.save();
        await findDumpInventory.save();

        return res.status(200).json({ message: "Stopsell implemented successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}