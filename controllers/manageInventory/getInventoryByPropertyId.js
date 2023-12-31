const inventory = require('../../models/manageInventory/manageInventory');
const roomTypeModel = require('../../models/Rooms/roomTypeDetails');
const io = require('socket.io')();
// const socket = io('http://localhost:8000');

module.exports = (io)=>{
return async (req,res)=>{

    try {
        const propertyId = req.params.propertyId;
        const startDate = req.query.startDate;

        if (!startDate) {
            return res.status(400).json({ error: 'Start date is required as a query parameter.' });
        }

        // Parse startDate as a Date object
        const startDateObj = new Date(startDate);

        // Calculate endDate as 6 days after startDate
        const endDateObj = new Date(startDateObj);
        endDateObj.setDate(startDateObj.getDate() + 6);

        // Convert startDate and endDate to formatted strings
        const startDateStr = startDateObj.toISOString().split('T')[0];
        const endDateStr = endDateObj.toISOString().split('T')[0];

        // Find manageInventory records for the given propertyId
        const manageInventory = await inventory.find({ propertyId: propertyId });

        if (!manageInventory || manageInventory.length === 0) {
            return res.status(404).json({ error: 'No inventory found for the given propertyId and date range.' });
        }

        // Find all unique roomTypeIds in the inventory
        const uniqueRoomTypeIds = [...new Set(manageInventory.map((ratePlan) => ratePlan.roomTypeId))];

        // Get roomType names for the found roomTypeIds
        const roomTypeNamesMap = {};

        const getRoomTypeNames = await roomTypeModel.find(
            { roomTypeId: { $in: uniqueRoomTypeIds } },
            { _id: 0, roomTypeId: 1, roomName: 1 }
        );

        getRoomTypeNames.forEach((roomType) => {
            roomTypeNamesMap[roomType.roomTypeId] = roomType.roomName[0]?.roomName || '';
        });

        // Extract ratesAndInventory data within the specified date range
        const extractedData = manageInventory.map((ratePlan) => ({
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            roomTypeId: ratePlan.roomTypeId,
            roomName: roomTypeNamesMap[ratePlan.roomTypeId], // Get roomName from the map
            Inventory: ratePlan.Inventory[0] || {},
            manageInventory: ratePlan.manageInventory
                ? ratePlan.manageInventory.filter(
                      (item) => item.date <= endDateStr && item.date >= startDateStr
                  )
                : [], // Empty array if manageInventory is not defined
        }));

        // io.emit('getInventoryData', extractedData);
      

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
    
};
