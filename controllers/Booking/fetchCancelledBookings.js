const cancelledBookingModel = require("../../models/Bookings/cancelBooking")

module.exports = async (req, res) => {
    try {
        const cancelledBookings = await cancelledBookingModel.find({})
        return res.status(200).json(cancelledBookings);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}