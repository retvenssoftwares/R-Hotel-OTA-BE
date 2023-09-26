const rateType = require('../../models/Rooms/rateType');

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const rateTypes = await rateType.find({ propertyId: propertyId });

        if (!rateTypes || rateTypes.length === 0) {
            return res.status(404).json({ error: 'No rate types found for the given propertyId' });
        }

        // Extract data from all rate types
        const extractedData = rateTypes.map(rateType => ({
            date: rateType.date,
            propertyId: rateType.propertyId,
            rateTypeId: rateType.rateTypeId,
            roomTypeId: rateType.roomTypeId,
            name: rateType.name[0] || {},
            basePrice: rateType.basePrice[0] || {},
            roomType: rateType.roomType[0] || {},
            taxIncluded: rateType.taxIncluded[0] || {},
            refundable: rateType.refundable[0] || {}
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
