// const inventoryModel = require('../../models/manageInventory/manageInventory');
// const dumpInventoryRatesModel = require('../../models/manageInventory/dataDumpInventoryRates');

// module.exports = async (req, res) => {
//     try {
//         const roomTypeId = req.params.roomTypeId;
//         const { startDate, endDate, inventory, excludedDays } = req.body;

//         // Find the inventory document for the specified roomTypeId
//         const findInventory = await inventoryModel.findOne({ roomTypeId });
//         const findDumpInventory = await dumpInventoryRatesModel.findOne({ roomTypeId });

//         if (!findInventory || !findDumpInventory) {
//             return res.status(404).json({ message: "Inventory not found for the given roomTypeId" });
//         }

//         if (!findInventory.manageInventory) {
//             findInventory.manageInventory = [];
//         }

//         // Get today's date as a string in "yyyy-mm-dd" format
//         const today = new Date().toISOString().split('T')[0];

//         // Parse startDate as a Date object
//         const startDateObj = new Date(startDate).toISOString().split('T')[0];

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
//             if (excludedDays.includes(dayOfWeek)) {
//                 continue; // Skip updating inventory for excluded days
//             }

//             const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format

//             // Check if the date already exists in the inventory array
//             const existingEntry = findInventory.manageInventory.find(entry => entry.date === dateString);

//             if (existingEntry) {
//                 // If the date exists, update the inventory
//                 existingEntry.inventory = inventory;
//                 existingEntry.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//                 // findDumpInventory.manageInventory.push({ date: dateString, inventory, isBlocked: 'false', modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });

//                 const updatedDumpDocument = await dumpInventoryRatesModel.findOneAndUpdate(
//                     { roomTypeId: roomTypeId },
//                     {
//                         $push: { manageInventory: { date: dateString, inventory, isBlocked: 'false', modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } },

//                     },
//                     {
//                         new: true,
//                     }
//                 );

//                 if (!updatedDumpDocument) {
//                     return res.status(404).json({ message: "Document not found" });
//                 }
//             } else {
//                 // If the date does not exist, add a new entry
//                 // findDumpInventory.manageInventory.push({ date: dateString, inventory, isBlocked: 'false', modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
//                 // findInventory.manageInventory.push({ date: dateString, inventory, isBlocked: 'false', modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
//                 const updatedDocument = await inventoryModel.findOneAndUpdate(
//                     { roomTypeId: roomTypeId },
//                     {
//                         $push: { manageInventory: { date: dateString, inventory, isBlocked: 'false', modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } },
//                     },
//                     {
//                         new: true,
//                     }
//                 );

//                 const updatedDumpDocument = await dumpInventoryRatesModel.findOneAndUpdate(
//                     { roomTypeId: roomTypeId },
//                     {
//                         $push: { manageInventory: { date: dateString, inventory, isBlocked: 'false', modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } },
//                     },
//                     {
//                         new: true,
//                     }
//                 );
//             }
//         }

//         // Save the updated inventory document
//         await findInventory.save();
//         // await findDumpInventory.save();

//         return res.status(200).json({ message: "Inventory updated successfully" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };



const Inventory = require('../../models/manageInventory/manageInventory');
const roomType = require('../../models/Rooms/roomTypeDetails')
const manageInventory = async (req, res) => {
    try {
      const {
        userId,
        propertyId,
        roomTypeId,
        startDate,
        endDate,
        isAddedInventory,
        isBlockedInventory,
        inventory,
      } = req.body;
      
        // Get today's date as a string in "yyyy-mm-dd" format
        const today = new Date().toISOString().split("T")[0];
  
        // Parse startDate as a Date object
        const startDateObj = new Date(startDate).toISOString().split("T")[0];
  
        // Check if startDate is older than today's date
        if (startDateObj < today) {
          return res.status(400).json({
            message: "startDate must not be older than today's date",
            statuscode: 400,
          });
        }
  
        // Find the inventory document for the specified roomTypeId
        let findInventory = await Inventory.findOne({
          roomTypeId: roomTypeId,
          propertyId: propertyId,
        });
        let findRoom = await roomType
          .findOne({ propertyId: propertyId, roomTypeId: roomTypeId })
          .select("numberOfRooms");
        let baseInventory = findRoom.numberOfRooms[0].numberOfRooms;
  
         console.log(baseInventory)
        // Create the inventory record if it doesn't exist
        if (!findInventory) {
          findInventory = new Inventory({
            roomTypeId: roomTypeId,
            propertyId: propertyId,
            manageInventory: {
              addedInventory: [],
              blockedInventory: [],
            },
          });
        }
  
        // Calculate the number of days in the date range
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24)); //difference in the dates interval
  
        if (dayDifference < 0) {
          return res.status(400).json({
            message: "End date cannot be before the start date",
            statuscode: 400,
          });
        }
  
        for (let i = 0; i <= dayDifference; i++) {
          const date = new Date(start);
          date.setDate(date.getDate() + i);
  
          const dateString = date.toISOString().split("T")[0];
          // console.log(dateString)
         
            if (isAddedInventory) {
              // Find the index of the date in addedInventory, if it exists
              const existingEntryIndex =
                findInventory.manageInventory.addedInventory.findIndex(
                  (entry) => entry.date === dateString
                );
  
              if (existingEntryIndex !== -1) {
                // If the date exists, update the addedInventory
                findInventory.manageInventory.addedInventory[
                  existingEntryIndex
                ].addedInventory = inventory;
              } else {
                // If the date does not exist, add a new entry to addedInventory
                findInventory.manageInventory.addedInventory.push({
                  date: dateString,
                  addedInventory: inventory,
                });
              }
            }
  
  
            if (isBlockedInventory) {
              let addedInventory;
              // Update the blockedInventory array
  
              //const existingEntry = findInventory.manageInventory.blockedInventory.find((entry) => entry.date === dateString);
              const existingEntryIndex =
                findInventory.manageInventory.addedInventory.find(
                  (entry) => entry.date === dateString
                );
              if (!existingEntryIndex) {
                if (baseInventory < inventory) {
                  return res.status(400).json({
                    message: "Inventory value cannot be greater than baseInventory",
                    statuscode: 400,
                  });
                }
              } else {
                addedInventory = existingEntryIndex.addedInventory
              }
  
               console.log(addedInventory)
  
              const totalInventory = baseInventory + addedInventory;
               console.log(totalInventory)
              if (totalInventory < inventory) {
                return res.status(400).json({
                  message: "Inventory value cannot be greater than total inventory",
                  statuscode: 400,
                });
              }
              const existingEntry =
                findInventory.manageInventory.blockedInventory.findIndex(
                  (entry) => entry.date === dateString
                );
  
  
              if (existingEntry !== -1) {
                // If the date exists, update the blockedInventory
                findInventory.manageInventory.blockedInventory[
                  existingEntry
                ].blockedInventory = inventory;
              } else {
                // If the date does not exist, add a new entry to blockedInventory
                findInventory.manageInventory.blockedInventory.push({
                  date: dateString,
                  blockedInventory: inventory,
                });
              }
            }
          }
  
          // Save the updated inventory document
          await findInventory.save();
        return res
          .status(200)
          .json({ message: "Inventory updated successfully", statuscode: 200 });
     
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal server error", statuscode: 500 });
    }
  };

module.exports = manageInventory;
