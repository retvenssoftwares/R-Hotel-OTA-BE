const bookingModel = require('../../models/Bookings/bookings');
const propertyModel = require('../../models/Onboarding/propertys');
const randomstring = require('randomstring');

module.exports = async (req, res) => {
    try {
        const { propertyId, checkInDate, checkOutDate, roomDetails, roomNights, totalRoomRate, totalTax, totalAmount, bookingStatus, paymentStatus, paymentMode, madeBy } = req.body
        const findProperty = await propertyModel.find({ propertyId: propertyId })
        if (!findProperty) {
            return res.status(404).json({ message: "Hotel not found" })
        }
        const newBooking = new bookingModel({
            propertyId,
            bookingId: randomstring.generate(8),
            checkInDate,
            checkOutDate,
            roomDetails,
            roomNights,
            totalRoomRate,
            totalTax,
            totalAmount,
            bookingStatus,
            paymentStatus,
            paymentMode,
            madeBy,
            createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        });

        await newBooking.save();
        return res.status(200).json({ message: "Booking saved", bookingId: newBooking.bookingId })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}