

const Promotion = require('../../models/Promotion/promotion');

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const promotionsData = await Promotion.findOne({ propertyId: propertyId });

        if (!promotionsData || promotionsData.promotions.length === 0) {
            return res.status(404).json({ error: 'No promotion found for the given id' });
        }

        // Define an array of array names
        const arrayNamesToExtract = [
            'offerWhat',
            'freeNightsRule',
            'offerType',
            'allUsersDiscount',
            'loggedInUsersDiscount',
            'setMaxLOS',
            'maxStayDurationLOS',
            'setMinLOS',
            'minStayDurationLOS',
            'setEarlyBirdRule',
            'earlyBirdBookingWindow',
            'setLastMinuteDeal',
            'lastMinuteDealBookingWindow',
            'applicableOnSelectedDays',
            'applicableOnWhichDays',
            'promotionApplicableFor',
            'stayDate',
            'bookingDate',
            'keepBlackOut',
            'blackOutDates',
            'keepOfferNonRefundable',
            'keepPayAtHotel',
            'applyPromotionForAllRoomsAndRatePlans',
            'ratePlanAndRoomType',
            'whereToApplyPromotion',
            'promotionName'
        ];

        // Extract the [0] objects from each specified array within promotions
        const extractedData = promotionsData.promotions.map(promotion => {
            const extractedObjects = {};
            let promotionId = promotion.promotionId
            arrayNamesToExtract.forEach(arrayName => {
                if (promotion && promotion[arrayName] && promotion[arrayName].length > 0) {

                    extractedObjects[arrayName] = promotion[arrayName][0] || {};
                } else {
                    extractedObjects[arrayName] = {};
                }
            });

            return { promotionId, date: promotionsData.date, promotions: extractedObjects };
        });

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
