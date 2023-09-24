const RateType = require('../../models/Rooms/rateType')

module.exports = async (req, res) => {
    try {
        const rateTypeId = req.params.rateTypeId;
        const rateTypes = await RateType.find({ rateTypeId: rateTypeId });

        if (!rateTypes || rateTypes.length === 0) {
            return res.status(404).json({ error: 'No rate type found for the given id' });
        }

        // Extract data from all rate plans
        const extractedData = rateTypes.map(ratePlan => ({
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            rateTypeId: ratePlan.rateTypeId,
            roomTypeId: ratePlan.roomTypeId,
            name: ratePlan.name[0] || {},
            basePrice: ratePlan.basePrice[0] || {},
            roomType: ratePlan.roomType[0] || {},
            taxIncluded: ratePlan.taxIncluded[0] || {},
            refundable: ratePlan.refundable[0] || {},
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
