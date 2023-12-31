// const promotionModel = require('../../models/Promotion/promotion');

// module.exports = async (req, res) => {
//     try {
//         let propertyId = req.params.propertyId;
//         let promotionId = req.params.promotionId;
//         const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//         // Find the promotion record based on propertyId
//         const findPromotion = await promotionModel.findOne({ propertyId: propertyId });
//         if (!findPromotion) {
//             return res.status(404).json({ message: "Promotion record not found" });
//         }

//         // Find the promotion object with matching promotionId
//         const promotionToUpdate = findPromotion.promotions.find(promo => promo.promotionId === promotionId);
//         if (!promotionToUpdate) {
//             return res.status(404).json({ message: "Promotion with given promotionId not found" });
//         }

//         // Update the fields you want to update
//         if (req.body.offerWhat) {
//             promotionToUpdate.offerWhat.unshift({ offerWhat: req.body.offerWhat, date: date });
//         }
//         if (req.body.bookNights || req.body.freeNights) {
//             promotionToUpdate.freeNightsRule.unshift({ bookNights: req.body.bookNights, freeNights: req.body.freeNights, date: date });
//         }
//         if (req.body.offerType) {
//             promotionToUpdate.offerType.unshift({ offerType: req.body.offerType, date: date });
//         }
//         if (req.body.allUsersDiscount) {
//             promotionToUpdate.allUsersDiscount.unshift({ allUsersDiscount: req.body.allUsersDiscount, date: date });
//         }
//         if (req.body.loggedInUsersDiscount) {
//             promotionToUpdate.loggedInUsersDiscount.unshift({ loggedInUsersDiscount: req.body.loggedInUsersDiscount, date: date });
//         }
//         if (req.body.setMaxLOS) {
//             promotionToUpdate.setMaxLOS.unshift({ setMaxLOS: req.body.setMaxLOS, date: date });
//         }
//         if (req.body.maxStayDurationLOS) {
//             promotionToUpdate.maxStayDurationLOS.unshift({ maxStayDurationLOS: req.body.maxStayDurationLOS, date: date });
//         }
//         if (req.body.setMinLOS) {
//             promotionToUpdate.setMinLOS.unshift({ setMinLOS: req.body.setMinLOS, date: date });
//         }
//         if (req.body.minStayDurationLOS) {
//             promotionToUpdate.minStayDurationLOS.unshift({ minStayDurationLOS: req.body.minStayDurationLOS, date: date });
//         }
//         if (req.body.setEarlyBirdRule) {
//             promotionToUpdate.setEarlyBirdRule.unshift({ setEarlyBirdRule: req.body.setEarlyBirdRule, date: date });
//         }
//         if (req.body.earlyBirdBookingWindow) {
//             promotionToUpdate.earlyBirdBookingWindow.unshift({ earlyBirdBookingWindow: req.body.earlyBirdBookingWindow, date: date });
//         }
//         if (req.body.setLastMinuteDeal) {
//             promotionToUpdate.setLastMinuteDeal.unshift({ setLastMinuteDeal: req.body.setLastMinuteDeal, date: date });
//         }
//         if (req.body.lastMinuteDealBookingWindow) {
//             promotionToUpdate.lastMinuteDealBookingWindow.unshift({ lastMinuteDealBookingWindow: req.body.lastMinuteDealBookingWindow, date: date });
//         }
//         if (req.body.applicableOnSelectedDays) {
//             promotionToUpdate.applicableOnSelectedDays.unshift({ applicableOnSelectedDays: req.body.applicableOnSelectedDays, date: date });
//         }
//         if (req.body.daysArray) {
//             const { daysArray } = req.body
//             promotionToUpdate.applicableOnWhichDays.unshift({ applicableOnWhichDays: daysArray, date: date });
//         }
//         if (req.body.promotionApplicableFor) {
//             promotionToUpdate.promotionApplicableFor.unshift({ promotionApplicableFor: req.body.promotionApplicableFor, date: date });
//         }
//         if (req.body.stayStartDate || req.body.stayKeepEndDate || req.body.stayEndDate) {
//             promotionToUpdate.stayDate.unshift({ stayStartDate: req.body.stayStartDate, stayKeepEndDate: req.body.stayKeepEndDate, stayEndDate: req.body.stayEndDate, date: date });
//         }
//         if (req.body.bookingStartDate || req.body.bookingKeepEndDate || req.body.bookingEndDate) {
//             promotionToUpdate.bookingDate.unshift({ bookingStartDate: req.body.bookingStartDate, bookingKeepEndDate: req.body.bookingKeepEndDate, bookingEndDate: req.body.bookingEndDate, date: date });
//         }
//         if (req.body.keepBlackOut) {
//             promotionToUpdate.keepBlackOut.unshift({ keepBlackOut: req.body.keepBlackOut, date: date });
//         }
//         if (req.body.datesArray) {
//             const { datesArray } = req.body
//             promotionToUpdate.blackOutDates.unshift({ blackOutDates: datesArray, date: date });
//         }
//         if (req.body.keepOfferNonRefundable) {
//             promotionToUpdate.keepOfferNonRefundable.unshift({ keepOfferNonRefundable: req.body.keepOfferNonRefundable, date: date });
//         }
//         if (req.body.keepPayAtHotel) {
//             promotionToUpdate.keepPayAtHotel.unshift({ keepPayAtHotel: req.body.keepPayAtHotel, date: date });
//         }
//         if (req.body.applyPromotionForAllRoomsAndRatePlans) {
//             promotionToUpdate.applyPromotionForAllRoomsAndRatePlans.unshift({ applyPromotionForAllRoomsAndRatePlans: req.body.applyPromotionForAllRoomsAndRatePlans, date: date });
//         }
//         if (req.body.whereToApplyPromotion) {
//             promotionToUpdate.whereToApplyPromotion.unshift({ whereToApplyPromotion: req.body.whereToApplyPromotion, date: date });
//         }
//         if (req.body.promotionName) {
//             promotionToUpdate.promotionName.unshift({ promotionName: req.body.promotionName, date: date });
//         }
//         // Handle ratePlanAndRoomType field
//         if (req.body.roomTypeId) {
//             const { roomTypeId } = req.body
//             promotionToUpdate.ratePlanAndRoomType.unshift({roomTypeId: roomTypeId});
//         }


//         await findPromotion.save();
//         res.status(200).json({ message: "Promotion updated successfully" });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

const promotionModel = require('../../models/Promotion/newPromotion');

module.exports = async (req, res) => {
    try {
        // let propertyId = req.params.propertyId;
        let promotionId = req.params.promotionId;
        const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        // Find the promotion record based on propertyId
        const findPromotion = await promotionModel.findOne({ promotionId: promotionId });
        if (!findPromotion) {
            return res.status(404).json({ message: "Promotion record not found" });
        }

        // Update the fields you want to update
        if (req.body.offerWhat) {
            findPromotion.offerWhat.unshift({ offerWhat: req.body.offerWhat, date: date });
        }
        if (req.body.bookNights || req.body.freeNights) {
            findPromotion.freeNightsRule.unshift({ bookNights: req.body.bookNights, freeNights: req.body.freeNights, date: date });
        }
        if (req.body.offerType) {
            findPromotion.offerType.unshift({ offerType: req.body.offerType, date: date });
        }
        if (req.body.allUsersDiscount) {
            findPromotion.allUsersDiscount.unshift({ allUsersDiscount: req.body.allUsersDiscount, date: date });
        }
        if (req.body.loggedInUsersDiscount) {
            findPromotion.loggedInUsersDiscount.unshift({ loggedInUsersDiscount: req.body.loggedInUsersDiscount, date: date });
        }
        if (req.body.setMaxLOS) {
            findPromotion.setMaxLOS.unshift({ setMaxLOS: req.body.setMaxLOS, date: date });
        }
        if (req.body.maxStayDurationLOS) {
            findPromotion.maxStayDurationLOS.unshift({ maxStayDurationLOS: req.body.maxStayDurationLOS, date: date });
        }
        if (req.body.setMinLOS) {
            findPromotion.setMinLOS.unshift({ setMinLOS: req.body.setMinLOS, date: date });
        }
        if (req.body.minStayDurationLOS) {
            findPromotion.minStayDurationLOS.unshift({ minStayDurationLOS: req.body.minStayDurationLOS, date: date });
        }
        if (req.body.setEarlyBirdRule) {
            findPromotion.setEarlyBirdRule.unshift({ setEarlyBirdRule: req.body.setEarlyBirdRule, date: date });
        }
        if (req.body.earlyBirdBookingWindow) {
            findPromotion.earlyBirdBookingWindow.unshift({ earlyBirdBookingWindow: req.body.earlyBirdBookingWindow, date: date });
        }
        if (req.body.setLastMinuteDeal) {
            findPromotion.setLastMinuteDeal.unshift({ setLastMinuteDeal: req.body.setLastMinuteDeal, date: date });
        }
        if (req.body.lastMinuteDealBookingWindow) {
            findPromotion.lastMinuteDealBookingWindow.unshift({ lastMinuteDealBookingWindow: req.body.lastMinuteDealBookingWindow, date: date });
        }
        if (req.body.applicableOnSelectedDays) {
            findPromotion.applicableOnSelectedDays.unshift({ applicableOnSelectedDays: req.body.applicableOnSelectedDays, date: date });
        }
        if (req.body.daysArray) {
            const { daysArray } = req.body
            findPromotion.applicableOnWhichDays.unshift({ applicableOnWhichDays: daysArray, date: date });
        }
        if (req.body.promotionApplicableFor) {
            findPromotion.promotionApplicableFor.unshift({ promotionApplicableFor: req.body.promotionApplicableFor, date: date });
        }
        if (req.body.stayStartDate || req.body.stayKeepEndDate || req.body.stayEndDate) {
            findPromotion.stayDate.unshift({ stayStartDate: req.body.stayStartDate, stayKeepEndDate: req.body.stayKeepEndDate, stayEndDate: req.body.stayEndDate, date: date });
        }
        if (req.body.bookingStartDate || req.body.bookingKeepEndDate || req.body.bookingEndDate) {
            findPromotion.bookingDate.unshift({ bookingStartDate: req.body.bookingStartDate, bookingKeepEndDate: req.body.bookingKeepEndDate, bookingEndDate: req.body.bookingEndDate, date: date });
        }
        if (req.body.keepBlackOut) {
            findPromotion.keepBlackOut.unshift({ keepBlackOut: req.body.keepBlackOut, date: date });
        }
        if (req.body.datesArray) {
            const { datesArray } = req.body
            findPromotion.blackOutDates.unshift({ blackOutDates: datesArray, date: date });
        }
        if (req.body.keepOfferNonRefundable) {
            findPromotion.keepOfferNonRefundable.unshift({ keepOfferNonRefundable: req.body.keepOfferNonRefundable, date: date });
        }
        if (req.body.keepPayAtHotel) {
            findPromotion.keepPayAtHotel.unshift({ keepPayAtHotel: req.body.keepPayAtHotel, date: date });
        }
        if (req.body.applyPromotionForAllRoomsAndRatePlans) {
            findPromotion.applyPromotionForAllRoomsAndRatePlans.unshift({ applyPromotionForAllRoomsAndRatePlans: req.body.applyPromotionForAllRoomsAndRatePlans, date: date });
        }
        if (req.body.whereToApplyPromotion) {
            findPromotion.whereToApplyPromotion.unshift({ whereToApplyPromotion: req.body.whereToApplyPromotion, date: date });
        }
        if (req.body.promotionName) {
            findPromotion.promotionName.unshift({ promotionName: req.body.promotionName, date: date });
        }
        // Handle ratePlanAndRoomType field
        if (req.body.roomTypeId) {
            const { roomTypeId } = req.body
            findPromotion.ratePlanAndRoomType.unshift({roomTypeId: roomTypeId});
        }


        await findPromotion.save();
        res.status(200).json({ message: "Promotion updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
