const ratePlanModel = require('../../models/Rooms/ratePlan')

module.exports = async (req, res) => {
    try {
        const ratePlanId = req.params.ratePlanId;
        const ratePlan = await ratePlanModel.findOne({ ratePlanId: ratePlanId });

        if (!ratePlan || ratePlan.length === 0) {
            return res.status(404).json({ error: 'No rate plan found for the given id' });
        }

        // Extract data from all rate plans
        const extractedData ={
            date: ratePlan.date,
            propertyId: ratePlan.propertyId,
            ratePlanId: ratePlan.ratePlanId,
            roomTypeId: ratePlan.roomTypeId,
            ratePlanName: ratePlan.ratePlanName[0] || {},
            rateTypeId: ratePlan.rateTypeId,
            description: ratePlan.description[0] || {},
            MLOS: ratePlan.MLOS[0] || {},
            percentage: ratePlan.percentage[0] || {},
        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
