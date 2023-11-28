// const rateModel = require('../../models/manageInventory/manageRates');
// const dumpInventoryRatesModel = require('../../models/manageInventory/dataDumpInventoryRates');

// module.exports = async (req, res) => {
//     try {
//         const rateTypeId = req.params.rateTypeId;
//         const { startDate, endDate, price, excludedDays } = req.body;

//         // Find the inventory document for the specified roomTypeId
//         const findRates = await rateModel.findOne({ rateTypeId });

//         if (!findRates) {
//             return res.status(404).json({ message: "Rates not found for the given roomTypeId" });
//         }
//         let { roomTypeId } = findRates
//         // console.log(roomTypeId)
//         const findRoomTypeId = await dumpInventoryRatesModel.findOne({ roomTypeId })

//         if (!findRates.manageRate) {
//             findRates.manageRate = [];
//         }

//         // Get today's date as a string in "yyyy-mm-dd" format
//         const today = new Date().toISOString().split('T')[0];

//         // Parse startDate as a Date object
//         const startDateObj = new Date(startDate).toISOString().split('T')[0];

//         // console.log(startDateObj, today);
//         // Check if startDate is older than today's date
//         if (startDateObj < today) {
//             return res.status(400).json({ message: "startDate must not be older than today's date" });
//         }
//         // Calculate the number of days in the date range
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

//         if (dayDifference < 0) {
//             return res.status(400).json({ message: "End date cannot be before the start date" });
//         }

//         // Create entries for each date within the range
//         for (let i = 0; i <= dayDifference; i++) {
//             const date = new Date(start);
//             date.setDate(date.getDate() + i);

//             // Check if the day of the week is in the excluded list
//             const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
//             // console.log(dayOfWeek)
//             if (excludedDays.includes(dayOfWeek)) {
//                 continue; // Skip updating rates for excluded days
//             }

//             const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format

//             // Check if the date already exists in the ratesAndInventory array
//             const existingEntry = findRates.manageRate.find(entry => entry.date === dateString);

//             if (existingEntry) {
//                 // If the date exists, update the price and modified date
//                 existingEntry.price = price;
//                 existingEntry.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//                 // findRoomTypeId.manageRate.push({ date: dateString, price, rateTypeId: rateTypeId, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
//                 const updatedDumpDocument = await dumpInventoryRatesModel.findOneAndUpdate(
//                     { roomTypeId: roomTypeId },
//                     {
//                         $push: { manageRate: { rateTypeId, date: dateString, price, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } },
//                     },
//                     {
//                         new: true,
//                     }
//                 );
//             } else {
//                 // If the date does not exist, add a new entry
//                 // findRates.manageRate.push({ date: dateString, price, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
//                 // findRoomTypeId.manageRate.push({ date: dateString, price, rateTypeId: rateTypeId, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
//                 const updatedDocument = await rateModel.findOneAndUpdate(
//                     { rateTypeId: rateTypeId },
//                     {
//                         $push: { manageRate: { rateTypeId, date: dateString, price, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } },
//                     },
//                     {
//                         new: true,
//                     }
//                 );

//                 const updatedDumpDocument = await dumpInventoryRatesModel.findOneAndUpdate(
//                     { roomTypeId: roomTypeId },
//                     {
//                         $push: { manageRate: { rateTypeId, date: dateString, price, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } },
//                     },
//                     {
//                         new: true,
//                     }
//                 );
//             }
//         }

//         // Save the updated price document
//         await findRates.save();
//         // await findRoomTypeId.save();

//         return res.status(200).json({ message: "Rates updated successfully" });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }



const rateModel = require('../../models/manageInventory/manageRates');

const manageRates = async (req, res) => {
    try {
        const {
            propertyId,
            roomTypeId,
            rateTypeId,
            startDate,
            endDate,
            isPrice,
            isExtraAdultRate,
            isExtraChildRate,
            price,
            extraAdultRate,
            extraChildRate,
            days
        } = req.body


            // Get today's date as a string in "yyyy-mm-dd" format
            const today = new Date().toISOString().split('T')[0];

            // Parse startDate as a Date object
            const startDateObj = new Date(startDate).toISOString().split('T')[0];

            // Check if startDate is older than today's date
            if (startDateObj < today) {
                return res.status(400).json({ message: "startDate must not be older than today's date", statuscode: 400 });
            }

            // Find the rate document for the specified roomTypeId
            let findRates = await rateModel.findOne({ roomTypeId: roomTypeId, propertyId: propertyId, rateTypeId: rateTypeId });

            // Create the inventory record if it doesn't exist
            if (!findRates) {
                findRates = new rateModel({
                    roomTypeId: roomTypeId,
                    propertyId: propertyId,
                    rateTypeId: rateTypeId,
                    manageRates: {
                        price: [],
                        extraChildRate: [],
                        extraAdultRate: []
                    }
                });
            }

            // Calculate the number of days in the date range
            const start = new Date(startDate);
            const end = new Date(endDate);
            const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));//difference in the dates interval

            if (dayDifference < 0) {
                return res.status(400).json({ message: "End date cannot be before the start date", statuscode: 400 });
            }

            for (let i = 0; i <= dayDifference; i++) {
                const date = new Date(start);
                date.setDate(date.getDate() + i);

                const dateString = date.toISOString().split('T')[0];

                // Check if the day of the week is in the excluded list
                if (days) {
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    if (!days.includes(dayOfWeek)) {
                        continue; // Skip updating rates and restrictions for excluded days
                    }
                }

                // console.log(dateString)

                if (isPrice) {
                    // Update the addedInventory array
                    const existingEntry = findRates.manageRates.price.find(entry => entry.date === dateString);

                    if (existingEntry) {
                        existingEntry.price = price;
                    } else {
                        // If the date does not exist, add a new entry to addedInventory
                        findRates.manageRates.price.push({ date: dateString, price: price });
                    }
                }

                if (isExtraAdultRate) {
                    const existingEntry = findRates.manageRates.extraAdultRate.find(entry => entry.date === dateString);

                    if (existingEntry) {
                        // If the date exists, update the blockedInventory
                        existingEntry.extraAdultRate = extraAdultRate;
                    } else {
                        // If the date does not exist, add a new entry to blockedInventory
                        findRates.manageRates.extraAdultRate.push({ date: dateString, extraAdultRate: extraAdultRate });
                    }
                }

                if (isExtraChildRate) {
                    const existingEntry = findRates.manageRates.extraChildRate.find(entry => entry.date === dateString);

                    if (existingEntry) {
                        // If the date exists, update the blockedInventory
                        existingEntry.extraChildRate = extraChildRate;
                    } else {
                        // If the date does not exist, add a new entry to blockedInventory
                        findRates.manageRates.extraChildRate.push({ date: dateString, extraChildRate: extraChildRate });
                    }
                }


            }

            // Save the updated inventory document
            await findRates.save();
    
            return res.status(200).json({ message: "Rates updated successfully", statuscode: 200 });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", statuscode: 500 });
    }

}

module.exports= manageRates