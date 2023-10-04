const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema({
    propertyId: { type: String, default: '' },
    promotions: [{
        offerWhat: [{ offerWhat: { type: String, default: '' }, date: { type: String, default: '' } }], //enum: discount/free nights
        offerType: [{ offerType: { type: String, default: '' }, date: { type: String, default: '' } }], //enum: percentage/fixed
        allUsersDiscount: [{ allUsersDiscount: { type: String, default: '' }, date: { type: String, default: '' } }], //enum discount for all users
        loggedInUsersDiscount: [{ loggedInUsersDiscount: { type: String, default: '' }, date: { type: String, default: '' } }], //enum: discount for logged in users
        setMaxLOS: [{ setMaxLOS: { type: String, default: '' }, date: { type: String, default: '' } }],//enum: set max los : yes or no?
        maxStayDurationLOS: [{ maxStayDurationLOS: { type: String, default: '' }, date: { type: String, default: '' } }], //enum: if selected yes then max duration of LOS
        setMinLOS: [{ setMinLOS: { type: String, default: '' }, date: { type: String, default: '' } }],//enum: set min los : yes or no?
        minStayDurationLOS: [{ minStayDurationLOS: { type: String, default: '' }, date: { type: String, default: '' } }],//enum: if selected yes then min duration of LOS
        setEarlyBirdRule: [{ setEarlyBirdRule: { type: String, default: '' }, date: { type: String, default: '' } }],//enum: set early bird rule : yes or no?
        earlyBirdBookingWindow: [{ earlyBirdBookingWindow: { type: String, default: '' }, date: { type: String, default: '' } }] ,//enum: if selected yes then number of days of early bird booking window
        setLastMinuteDeal: [{ setLastMinuteDeal: { type: String, default: '' }, date: { type: String, default: '' } }],//enum: set last minute deal : yes or no?
        lastMinuteDealBookingWindow: [{ lastMinuteDealBookingWindow: { type: String, default: '' }, date: { type: String, default: '' } }] ,//enum: if selected yes then number of days of LastMinuteDeal booking window
        applicableOnSelectedDays: [{ applicableOnSelectedDays: { type: String, default: '' }, date: { type: String, default: '' } }], //enum: if promotion available on certain days, yes or no
        applicableOnWhichDays: [{ applicableOnWhichDays: [{ type: String, default: '' }], date: {type: String, default:''} }], //enum: if promotion available on certain days, mon, teus, wed
        promotionApplicableFor: [{promotionApplicableFor: {type: String, default: ''}, date: {type: String, default:''}}], //enum : staydate or bookingandstaydate
        stayDate: [{startDate: {type: String, default: ''}, keepEndDate: {type: String, default: ''},endDate: {type: String, default: ''}, date: {type: String, default:''}}], //startDate, endDate and keep endDate:yes no
        bookingDate: [{startDate: {type: String, default: ''}, keepEndDate: {type: String, default: ''},endDate: {type: String, default: ''}, date: {type: String, default:''}}], //startDate, endDate and keep endDate:yes no
        keepBlackOut: [{keepBlackOut: {type: String, default: ''}, date: {type: String, default:''}}], // blackout:yes no
        blackOutDates: [{blackOutDates: [{type: String, default: ''}], date: {type: String, default:''} }] ,//keep blackouts on which dates
        keepOfferNonRefundable: [{keepOfferNonRefundable: {type: String, default: ''}, date: {type: String, default: ''} }], //keep offer non refundable or not
        keepPayAtHotel: [{keepPayAtHotel: {type: String, default: ''}, date: {type: String, default: ''} }], //keep offer when paying at hotel
        applyPromotionForAllRoomsAndRatePlans:[{applyPromotionForAllRoomsAndRatePlans: {type: String, default: ''}, date: {type: String, default: ''}}],//yes or no 
        ratePlanAndRoomType: [{ratePlanId: {type: String, default: ''}, roomTypeId: {type: String, default: ''}, displayStatus: {type: String, default: ''} }],
        whereToApplyPromotion: [{whereToApplyPromotion:{type: String, default: ''}, date: {type: String, default: ''} }], //enum: B2C/ Bundled Rates        
        promotionName: [{promotionName:{type: String, default: ''}, date: {type: String, default: ''} }] 
    }],
})

module.exports = mongoose.model('promotions', promotionSchema)