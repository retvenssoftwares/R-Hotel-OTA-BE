const bookingModel = require('../../models/Bookings/bookings');
const roomTypeModel = require('../../models/Rooms/roomTypeDetails');

module.exports = async (req, res) => {
    try {
        // Find the booking by bookingId
        const findBooking = await bookingModel.findOne({ bookingId: req.params.bookingId });

        // Check if the booking was found
        if (!findBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Extract roomTypeIds from roomDetails
        const roomTypeIds = findBooking.roomDetails.map(roomDetail => roomDetail.roomTypeId);

        // Find roomTypes based on roomTypeIds
        const roomTypes = await roomTypeModel.find({ roomTypeId: { $in: roomTypeIds } });

        // Map roomTypeIds to roomType values
        const roomTypeMap = {};
        roomTypes.forEach(roomType => {
            roomTypeMap[roomType.roomTypeId] = roomType.roomType[0].roomType || '';
        });

        // Add roomType to each roomDetail
        const bookingsWithRoomType = findBooking.roomDetails.map(roomDetail => ({
            ...roomDetail.toObject(),
            roomType: roomTypeMap[roomDetail.roomTypeId],
        }));

        // Create a response object
        const response = {
            userId: findBooking.userId,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            bookingId: findBooking.bookingId,
            roomDetails: bookingsWithRoomType,
            bookingStatus: findBooking.bookingStatus,
            paymentStatus: findBooking.paymentStatus,
        };

        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
