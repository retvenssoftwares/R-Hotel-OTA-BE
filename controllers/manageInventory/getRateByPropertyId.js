;

const rate = require('../../models/manageInventory/manageRates');
const rateTypeModel = require('../../models/Rooms/rateType');

module.exports = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const startDate = req.query.startDate;

        if (!startDate) {
            return res.status(400).json({ error: 'Start date is required as a query parameter.' });
        }

        const manageRate = await rate.find({
            roomTypeId: roomTypeId
        });

        if (!manageRate || manageRate.length === 0) {
            return res.status(404).json({ error: 'No Rate found for the given roomTypeId.' });
        }
        // Parse startDate as a Date object
        const startDateObj = new Date(startDate);

        // Calculate endDate as 6 days after startDate
        const endDateObj = new Date(startDateObj);
        endDateObj.setDate(startDateObj.getDate() + 6);

        // Convert startDate and endDate to formatted strings
        const startDateStr = startDateObj.toISOString().split('T')[0];
        const endDateStr = endDateObj.toISOString().split('T')[0];

        // Extract rates data within the specified date range
        const extractedData = await Promise.all(manageRate.map(async (ratePlan) => {
            const rateType = await rateTypeModel.findOne({ rateTypeId: ratePlan.rateTypeId });

            console.log(startDateStr, endDateStr)

            return {
                date: ratePlan.date,
                propertyId: ratePlan.propertyId,
                rateTypeId: ratePlan.rateTypeId,
                roomTypeId: ratePlan.roomTypeId,
                ratePrice: ratePlan.ratePrice[0] || {},
                manageRate: ratePlan.manageRate
                    ? ratePlan.manageRate.filter(
                        (item) => item.date <= endDateStr && item.date >= startDateStr
                    )
                    : [],  // Empty array if manageInventory is not defined
                rateTypeName: rateType ? rateType.name[0]?.name : '' // Get the name from rateType model
            };
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
