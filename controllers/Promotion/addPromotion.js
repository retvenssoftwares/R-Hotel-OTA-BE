const randomstring = require('randomstring')
const promotionModel = require('../../models/Promotion/promotion');
const ratePlanModel = require('../../models/Rooms/ratePlan')

module.exports = async (req, res) => {

    try {
        let propertyId = req.params.propertyId
        const {
            offerWhat,
            offerType,
            allUsersDiscount,
            loggedInUsersDiscount,
            setMaxLOS,
            maxStayDurationLOS,
            setMinLOS,
            minStayDurationLOS,
            setEarlyBirdRule,
            earlyBirdBookingWindow,
            setLastMinuteDeal,
            lastMinuteDealBookingWindow,
            applicableOnSelectedDays,
            applicableOnWhichDays,
            promotionApplicableFor,
            stayStartDate,
            stayKeepEndDate,
            stayEndDate,
            bookingStartDate,
            bookingKeepEndDate,
            bookingEndDate,
            keepBlackOut,
            blackOutDates,
            keepOfferNonRefundable,
            keepPayAtHotel,
            applyPromotionForAllRoomsAndRatePlans,
            roomTypeId,
            ratePlanId,
            whereToApplyPromotion,
            bookNights,
            freeNights,
            ratePlanAndRoomType,
            promotionName
        } = req.body

        const findPromotionRecord = await promotionModel.findOne({ propertyId });
        if (!findPromotionRecord) {
            return res.status(404).json({ message: "Incorrect property id" })
        }
        const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        const promotionObject = {
            promotionId: randomstring.generate(6),
            offerWhat: [{ offerWhat: offerWhat, date: date }],
            offerType: [{ offerType: offerType, date: date }],
            freeNightsRule: [{ bookNights: bookNights, freeNights: freeNights, date: date }],
            allUsersDiscount: [{ allUsersDiscount: allUsersDiscount, date: date }],
            loggedInUsersDiscount: [{ loggedInUsersDiscount: loggedInUsersDiscount, date: date }],
            setMaxLOS: [{ setMaxLOS: setMaxLOS, date: date }],
            maxStayDurationLOS: [{ maxStayDurationLOS: maxStayDurationLOS, date: date }],
            setMinLOS: [{ setMinLOS: setMinLOS, date: date }],
            minStayDurationLOS: [{ minStayDurationLOS: minStayDurationLOS, date: date }],
            setEarlyBirdRule: [{ setEarlyBirdRule: setEarlyBirdRule, date: date }],
            earlyBirdBookingWindow: [{ earlyBirdBookingWindow: earlyBirdBookingWindow, date: date }],
            setLastMinuteDeal: [{ setLastMinuteDeal: setLastMinuteDeal, date: date }],
            lastMinuteDealBookingWindow: [{ lastMinuteDealBookingWindow: lastMinuteDealBookingWindow, date: date }],
            applicableOnSelectedDays: [{ applicableOnSelectedDays: applicableOnSelectedDays, date: date }],
            applicableOnWhichDays: [{ applicableOnWhichDays: applicableOnWhichDays, date: date }],
            promotionApplicableFor: [{ promotionApplicableFor: promotionApplicableFor, date: date }],
            stayDate: [{ stayStartDate: stayStartDate, stayKeepEndDate: stayKeepEndDate, stayEndDate: stayEndDate, date: date }],
            bookingDate: [{ bookingStartDate: bookingStartDate, bookingKeepEndDate: bookingKeepEndDate, bookingEndDate: bookingEndDate, date: date }],
            keepBlackOut: [{ keepBlackOut: keepBlackOut, date: date }],
            blackOutDates: [{ blackOutDates: blackOutDates, date: date }],
            keepOfferNonRefundable: [{ keepOfferNonRefundable: keepOfferNonRefundable, date: date }],
            keepPayAtHotel: [{ keepPayAtHotel: keepPayAtHotel, date: date }],
            applyPromotionForAllRoomsAndRatePlans: [{ applyPromotionForAllRoomsAndRatePlans: applyPromotionForAllRoomsAndRatePlans, date: date }],
            // ratePlanAndRoomType: [{ roomTypeId: roomTypeId, ratePlanId: ratePlanId, date: date }],
            whereToApplyPromotion: [{ whereToApplyPromotion: whereToApplyPromotion, date: date }],
            promotionName: [{ promotionName: promotionName, date: date }],
            ratePlanAndRoomType
        }

        findPromotionRecord.promotions.unshift(promotionObject)
        await findPromotionRecord.save();

        res.status(200).json({ message: "Promotion created successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }


}