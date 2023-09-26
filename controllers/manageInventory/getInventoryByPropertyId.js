const inventory = require('../../models/manageInventory/manageInventory');
const roomTypeModel = require('../../models/Rooms/roomTypeDetails');

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const startDate = req.query.startDate;

        if (!startDate) {
            return res.status(400).json({ error: 'Start date is required as a query parameter.' });
        }

        const manageInventory = await inventory.find({
            propertyId: propertyId,
        });

        // Find all unique roomTypeIds in the inventory
        const findRoomTypes = await inventory.find({ propertyId: propertyId }).distinct('roomTypeId');

        // Get roomType names for the found roomTypeIds
        const getRoomTypeNames = await roomTypeModel.find(
            { roomTypeId: { $in: findRoomTypes } },
            { _id: 0, roomName: { $slice: 1 } }
        );

        if (!manageInventory || manageInventory.length === 0) {
            return res.status(404).json({ error: 'No inventory found for the given propertyId and date range.' });
        }

        // Create a mapping of roomTypeId to roomName
        const roomTypeNamesMap = {};
        getRoomTypeNames.forEach((roomType) => {
            if (roomType.roomName.length > 0) {
                roomTypeNamesMap[roomType.roomTypeId] = roomType.roomName[0].roomName;
            }
        });

        // Extract ratesAndInventory data within the specified date range
        const extractedData = manageInventory.map((ratePlan) => ({
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            roomTypeId: ratePlan.roomTypeId,
            roomName: roomTypeNamesMap[ratePlan.roomTypeId] || '', // Get roomName from the map
            Inventory: ratePlan.Inventory[0] || {},
            manageInventory: ratePlan.manageInventory
                ? ratePlan.manageInventory
                      .filter((item) => item.modifiedDate >= startDate)
                      .slice(0, 6)
                : [], // Empty array if manageInventory is not defined
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
