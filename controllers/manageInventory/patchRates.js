const rateModel = require('../../models/manageInventory/manageRates');
const dumpInventoryRatesModel = require('../../models/manageInventory/dataDumpInventoryRates');

module.exports = async (req, res) => {
    try {
        const rateTypeId = req.params.rateTypeId;
        const { startDate, endDate, price } = req.body;

        // Find the inventory document for the specified roomTypeId
        const findRates = await rateModel.findOne({ rateTypeId });

        if (!findRates) {
            return res.status(404).json({ message: "Rates not found for the given roomTypeId" });
        }
        let { roomTypeId } = findRates
        const findRoomTypeId = await dumpInventoryRatesModel.findOne({ roomTypeId })

        if (!findRates.manageRate) {
            findRates.manageRate = [];
        }

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
            const existingEntry = findRates.manageRate.find(entry => entry.date === dateString);

            if (existingEntry) {
                // If the date exists, update the price and modified date
                existingEntry.price = price;
                existingEntry.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) ;
                findRoomTypeId.manageRate.push({ date: dateString, price, rateTypeId: rateTypeId, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })  });
            } else {
                // If the date does not exist, add a new entry
                findRates.manageRate.push({ date: dateString, price, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })  });
                findRoomTypeId.manageRate.push({ date: dateString, price, rateTypeId: rateTypeId, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })  });
            }
        }

        // Save the updated price document
        await findRates.save();
        await findRoomTypeId.save();

        return res.status(200).json({ message: "Rates updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
