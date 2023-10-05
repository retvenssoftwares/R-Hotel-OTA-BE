const Promotion = require('../../models/Promotion/promotion')

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const promotions = await Promotion.findOne({ propertyId: propertyId });
        console.log(promotions)
        if (!promotions || promotions.length === 0) {
            return res.status(404).json({ error: 'No promotion found for the given id' });
        }

        // Extract data from all rate plans
        // const extractedData ={
        //     date: promotions.promotions,
            // propertyId: rateTypes.propertyId,
            // rateTypeId: rateTypes.rateTypeId,
            // roomTypeId: rateTypes.roomTypeId,
            // name: rateTypes.name[0] || {},
            // basePrice: rateTypes.basePrice[0] || {},
            // roomType: rateTypes.roomType[0] || {},
            // taxIncluded: rateTypes.taxIncluded[0] || {},
            // refundable: rateTypes.refundable[0] || {},
        // };

        return res.status(200).json(promotions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
