const RatePlan = require('../../models/Rooms/ratePlan')

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const ratePlans = await RatePlan.find({ propertyId: propertyId });

        if (!ratePlans || ratePlans.length === 0) {
            return res.status(404).json({ error: 'No rate plans found for the given propertyId' });
        }

        // Extract data from all rate plans
        const extractedData = ratePlans.map(ratePlan => ({
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            ratePlanId: ratePlan.ratePlanId,
            rateTypeId: ratePlan.rateTypeId,
            roomTypeId: ratePlan.roomTypeId,
            inclusion: ratePlan.inclusion[0] || {},
            description: ratePlan.description[0] || {},
            MLO: ratePlan.MLO[0] || {},
            persentage: ratePlan.persentage[0] || {},
            value: ratePlan.value[0] || {},
            ratePlanName: ratePlan.ratePlanName[0] || {},
            priceIncrease: ratePlan.priceIncrease[0] || {},
            startDate: ratePlan.startDate[0] || {},
            endDate: ratePlan.endDate[0] || {},
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
