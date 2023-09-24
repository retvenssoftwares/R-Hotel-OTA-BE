const RateType = require('../../models/Rooms/rateType')

module.exports = async (req, res) => {
    try {
        const rateTypeId = req.params.rateTypeId;
        const rateTypes = await RateType.findOne({ rateTypeId: rateTypeId });

        if (!rateTypes || rateTypes.length === 0) {
            return res.status(404).json({ error: 'No rate type found for the given id' });
        }

        // Extract data from all rate plans
        const extractedData ={
            date: rateTypes.date,
            propertyId: rateTypes.propertyId,
            rateTypeId: rateTypes.rateTypeId,
            roomTypeId: rateTypes.roomTypeId,
            name: rateTypes.name[0] || {},
            basePrice: rateTypes.basePrice[0] || {},
            roomType: rateTypes.roomType[0] || {},
            taxIncluded: rateTypes.taxIncluded[0] || {},
            refundable: rateTypes.refundable[0] || {},
        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
