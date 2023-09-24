const Property = require('../../models/Rooms/roomTypeDetails')

module.exports = async (req, res) => {
    try {
        const { propertyId } = req.params;

        // Find all records with the given propertyId
        const rooms = await Property.find({ propertyId });

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ error: 'No rooms found for the given propertyId' });
        }

        // Extract only the "roomType" field from each record
        const extractedData = {
            roomName: rooms.map(room => ({
                roomName: room.roomName[0] ? room.roomName[0].roomName : '',
                roomTypeId: room.roomTypeId
            })),

        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
