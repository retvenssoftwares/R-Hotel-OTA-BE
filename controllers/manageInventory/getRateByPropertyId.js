// const rate = require('../../models/manageInventory/manageRates');
// const rateTypeModel = require('../../models/Rooms/rateType')

// module.exports = async (req, res) => {
//     try {
//         const roomTypeId = req.params.roomTypeId;
//         const startDate = req.query.startDate;

//         if (!startDate) {
//             return res.status(400).json({ error: 'Start date is required as a query parameter.' });
//         }

//         const manageRate = await rate.find({
//             roomTypeId: roomTypeId,
//             // $or: [
//             //     { 'manageInventory.modifiedDate': { $gte: startDate } },
//             //     { 'manageInventory': { $exists: false, $size: 0 } }
//             // ]
//         });

//         if (!manageRate || manageRate.length === 0) {
//             return res.status(404).json({ error: 'No Rate found for the given propertyId and date range.' });
//         }

//         // Extract ratesAndInventory data within the specified date range
//         const extractedData = manageRate.map(ratePlan => ({
//             date: ratePlan.date,
//             propertyId: ratePlan.propertyId,
//             rateTypeId: ratePlan.rateTypeId,
//             roomTypeId: ratePlan.roomTypeId,
//             ratePrice: ratePlan.ratePrice[0] || {},
//             manageRate: ratePlan.manageRate
//                 ? ratePlan.manageRate
//                       .filter(item => item.modifiedDate >= startDate)
//                       .slice(0, 7)
//                 : [] // Empty array if manageInventory is not defined
//         }));

//         return res.status(200).json(extractedData);
//     } catch (error) {
       
//         return res.status(500).json({ error: error.message });
//     }
// };

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

        // Extract ratesAndInventory data within the specified date range
        const extractedData = await Promise.all(manageRate.map(async (ratePlan) => {
            const rateType = await rateTypeModel.findOne({ rateTypeId: ratePlan.rateTypeId });

            return {
                date: ratePlan.date,
                propertyId: ratePlan.propertyId,
                rateTypeId: ratePlan.rateTypeId,
                roomTypeId: ratePlan.roomTypeId,
                ratePrice: ratePlan.ratePrice[0] || {},
                manageRate: ratePlan.manageRate
                    ? ratePlan.manageRate
                        .filter(item => item.modifiedDate >= startDate)
                        .slice(0, 7)
                    : [], // Empty array if manageInventory is not defined
                rateTypeName: rateType ? rateType.name[0]?.name : '' // Get the name from rateType model
            };
        }));

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
