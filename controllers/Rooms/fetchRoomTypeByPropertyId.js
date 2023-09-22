const Property = require('../../models/Onboarding/roomTypeDetails')

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
            roomType: rooms.map(room => room.roomType[0] ? room.roomType[0].roomType : ''),
        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
