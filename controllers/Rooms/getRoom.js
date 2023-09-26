const Property = require('../../models/Rooms/roomTypeDetails')

module.exports = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const room = await Property.findOne({ roomTypeId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        
        // Extract the first item from each array
        const {
            description,
            numberOfRooms,
            bedType,
            roomSize,
            smoking,
            roomName,
            roomType,
            generalAmenities,
            propertyId,
            userId
        } = room;

        // Create a new object with extracted data
        const extractedData = {
            userId,
            propertyId,
            roomTypeId,
            description: description[0] || {},
            numberOfRooms: numberOfRooms[0] || {},
            bedType: bedType[0] || {},
            roomSize: roomSize[0] || {},
            smoking: smoking[0] || {},
            roomName: roomName[0] || {},
            roomType: roomType[0] || {},
            generalAmenities
        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
