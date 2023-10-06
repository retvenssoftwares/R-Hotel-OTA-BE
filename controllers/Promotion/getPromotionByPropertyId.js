

// const Promotion = require('../../models/Promotion/newPromotion');

// module.exports = async (req, res) => {
//     try {
//         const propertyId = req.params.propertyId;
//         const promotionsData = await Promotion.findOne({ propertyId: propertyId });

//         if (!promotionsData || promotionsData.length === 0) {
//             return res.status(404).json({ error: 'No promotion found for the given id' });
//         }

//         // Define an array of array names
//         const arrayNamesToExtract = [
//             'offerWhat',
//             'freeNightsRule',
//             'offerType',
//             'allUsersDiscount',
//             'loggedInUsersDiscount',
//             'setMaxLOS',
//             'maxStayDurationLOS',
//             'setMinLOS',
//             'minStayDurationLOS',
//             'setEarlyBirdRule',
//             'earlyBirdBookingWindow',
//             'setLastMinuteDeal',
//             'lastMinuteDealBookingWindow',
//             'applicableOnSelectedDays',
//             'applicableOnWhichDays',
//             'promotionApplicableFor',
//             'stayDate',
//             'bookingDate',
//             'keepBlackOut',
//             'blackOutDates',
//             'keepOfferNonRefundable',
//             'keepPayAtHotel',
//             'applyPromotionForAllRoomsAndRatePlans',
//             'ratePlanAndRoomType',
//             'whereToApplyPromotion',
//             'promotionName'
//         ];

//         // Extract the [0] objects from each specified array within promotions
//         const extractedData = promotionsData.map(promotion => {
//             const extractedObjects = {};
//             let promotionId = promotion.promotionId
//             arrayNamesToExtract.forEach(arrayName => {
//                 if (promotion && promotion[arrayName] && promotion[arrayName].length > 0) {

//                     extractedObjects[arrayName] = promotion[arrayName][0] || {};
//                 } else {
//                     extractedObjects[arrayName] = {};
//                 }
//             });

//             return { promotionId, date: promotionsData.date, promotions: extractedObjects };
//         });

//         return res.status(200).json(extractedData);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

const Promotion = require('../../models/Promotion/newPromotion');

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const promotionsData = await Promotion.find(
            { propertyId: propertyId },
            {
                _id: 0, // Exclude the _id field from the result
                promotionId: 1, // Include the promotionId field
                date: 1, // Include the date field
                offerWhat: { $slice: 1 }, // Get the first element of the offerWhat array
                freeNightsRule: { $slice: 1 }, // Get the first element of the freeNightsRule array
                offerType: { $slice: 1 }, // Get the first element of the offerType array
                allUsersDiscount: { $slice: 1 }, // Get the first element of the allUsersDiscount array
                loggedInUsersDiscount: { $slice: 1 }, // Get the first element of the loggedInUsersDiscount array
                setMaxLOS: { $slice: 1 }, // Get the first element of the setMaxLOS array
                maxStayDurationLOS: { $slice: 1 }, // Get the first element of the maxStayDurationLOS array
                setMinLOS: { $slice: 1 }, // Get the first element of the setMinLOS array
                minStayDurationLOS: { $slice: 1 }, // Get the first element of the minStayDurationLOS array
                setEarlyBirdRule: { $slice: 1 }, // Get the first element of the setEarlyBirdRule array
                earlyBirdBookingWindow: { $slice: 1 }, // Get the first element of the earlyBirdBookingWindow array
                setLastMinuteDeal: { $slice: 1 }, // Get the first element of the setLastMinuteDeal array
                lastMinuteDealBookingWindow: { $slice: 1 }, // Get the first element of the lastMinuteDealBookingWindow array
                applicableOnSelectedDays: { $slice: 1 }, // Get the first element of the applicableOnSelectedDays array
                applicableOnWhichDays: { $slice: 1 }, // Get the first element of the applicableOnWhichDays array
                promotionApplicableFor: { $slice: 1 }, // Get the first element of the promotionApplicableFor array
                stayDate: { $slice: 1 }, // Get the first element of the stayDate array
                bookingDate: { $slice: 1 }, // Get the first element of the bookingDate array
                keepBlackOut: { $slice: 1 }, // Get the first element of the keepBlackOut array
                blackOutDates: { $slice: 1 }, // Get the first element of the blackOutDates array
                keepOfferNonRefundable: { $slice: 1 }, // Get the first element of the keepOfferNonRefundable array
                keepPayAtHotel: { $slice: 1 }, // Get the first element of the keepPayAtHotel array
                applyPromotionForAllRoomsAndRatePlans: { $slice: 1 }, // Get the first element of the applyPromotionForAllRoomsAndRatePlans array
                ratePlanAndRoomType: { $slice: 1 }, // Get the first element of the ratePlanAndRoomType array
                whereToApplyPromotion: { $slice: 1 }, // Get the first element of the whereToApplyPromotion array
                promotionName: { $slice: 1 } // Get the first element of the promotionName array
            }
        );

        if (!promotionsData || promotionsData.length === 0) {
            return res.status(404).json({ error: 'No promotion found for the given id' });
        }

        // Create an array to store the extracted data
        const extractedData = [];

        // Extract the data for each promotion
        promotionsData.forEach(promotion => {
            const extractedPromotion = {
                promotionId: promotion.promotionId,
                date: promotion.date,
                propertyId: propertyId,
                offerWhat: promotion.offerWhat[0] || {},
                freeNightsRule: promotion.freeNightsRule[0] || {},
                offerType: promotion.offerType[0] || {},
                allUsersDiscount: promotion.allUsersDiscount[0] || {},
                loggedInUsersDiscount: promotion.loggedInUsersDiscount[0] || {},
                setMaxLOS: promotion.setMaxLOS[0] || {},
                maxStayDurationLOS: promotion.maxStayDurationLOS[0] || {},
                setMinLOS: promotion.setMinLOS[0] || {},
                minStayDurationLOS: promotion.minStayDurationLOS[0] || {},
                setEarlyBirdRule: promotion.setEarlyBirdRule[0] || {},
                earlyBirdBookingWindow: promotion.earlyBirdBookingWindow[0] || {},
                setLastMinuteDeal: promotion.setLastMinuteDeal[0] || {},
                lastMinuteDealBookingWindow: promotion.lastMinuteDealBookingWindow[0] || {},
                applicableOnSelectedDays: promotion.applicableOnSelectedDays[0] || {},
                applicableOnWhichDays: promotion.applicableOnWhichDays[0] || {},
                promotionApplicableFor: promotion.promotionApplicableFor[0] || {},
                stayDate: promotion.stayDate[0] || {},
                bookingDate: promotion.bookingDate[0] || {},
                keepBlackOut: promotion.keepBlackOut[0] || {},
                blackOutDates: promotion.blackOutDates[0] || {},
                keepOfferNonRefundable: promotion.keepOfferNonRefundable[0] || {},
                keepPayAtHotel: promotion.keepPayAtHotel[0] || {},
                applyPromotionForAllRoomsAndRatePlans: promotion.applyPromotionForAllRoomsAndRatePlans[0] || {},
                ratePlanAndRoomType: promotion.ratePlanAndRoomType[0] || {},
                whereToApplyPromotion: promotion.whereToApplyPromotion[0] || {},
                promotionName: promotion.promotionName[0] || {}

            };

            extractedData.push(extractedPromotion);
        });

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
