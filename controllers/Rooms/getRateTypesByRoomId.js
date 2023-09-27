const rateTypeModel = require('../../models/Rooms/rateType');

module.exports = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const findRateTypes = await rateTypeModel.find({ roomTypeId: roomTypeId });

        if (!findRateTypes || findRateTypes.length === 0) {
            return res.status(404).json({ error: 'No rate types found for the given roomTypeId' });
        }

        // Extract data from all rate types
        const extractedData = findRateTypes.map(rateType => ({
            rateTypeId: rateType.rateTypeId,
            propertyId: rateType.propertyId,
            roomTypeId: rateType.roomTypeId,
            name: rateType.name[0] || {},
            basePrice: rateType.basePrice[0] || {},
            taxIncluded: rateType.taxIncluded[0] || {},
            refundable: rateType.refundable[0] || {},
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
