const mongoose = require('mongoose');
const bookingModel = require('../../models/Bookings/bookings');
const propertyModel = require('../../models/Onboarding/propertys');

module.exports = async (req, res) => {
    try {
        const findBookings = await bookingModel.find({ userId: req.params.userId }, 'userId propertyId checkInDate checkOutDate bookingId bookingStatus paymentStatus roomDetails.guestFirstName');

        // Extract the propertyId from each booking record
        const propertyIds = findBookings.map(booking => booking.propertyId);

        // Find the corresponding property records using propertyIds
        const properties = await propertyModel.find({ propertyId: { $in: propertyIds } });

        // Create a mapping of propertyId to propertyName
        const propertyMap = {};
        properties.forEach(property => {
            // Assuming propertyName is an array, get the first object's propertyName
            const propertyName = property.propertyName[0].propertyName || '';
            propertyMap[property.propertyId] = propertyName;
        });

        // Add propertyName to each booking record
        const bookingsWithPropertyNames = findBookings.map(booking => ({
            ...booking.toObject(), // Convert to plain object
            propertyName: propertyMap[booking.propertyId],
        }));

        return res.status(200).json(bookingsWithPropertyNames);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
