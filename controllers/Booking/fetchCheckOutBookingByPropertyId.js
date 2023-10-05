const Booking = require('../../models/Bookings/bookings');
const ratePlan = require('../../models/Rooms/ratePlan');
// Function to fetch all data between startDate and endDate
module.exports = async function fetchBookingsByPropertyId(req, res) {
  try {
    const { propertyId } = req.params;
    const { startDate, endDate, requestType } = req.query;

    // Check if requestType is "checkIn"
    if (requestType === 'checkOut') {
      // Create a query object with propertyId and date filters
      const query = {
        propertyId,
        checkInDate: { $lte: startDate },  // Check-in date is greater than or equal to startDate
        checkOutDate: { $gte: endDate },    // Check-out date is less than or equal to endDate
      };

      const booking = await Booking.find(query, {
        checkOutDate: 1,
        checkInDate: 1,
        bookingId: 1,
        "roomDetails.ratePlanId": 1,
        "roomDetails.guestPhoneNumber": 1,
        "roomDetails.guestFirstName": 1,
        "roomDetails.guestLastName": 1,
        totalAmount: 1,
        _id: 0, // Exclude the _id field from the response
      });

      // Manually populate the ratePlanName
      const populatedBookings = await Promise.all(
        booking.map(async (booking) => {
          const ratePlanId = booking.roomDetails[0].ratePlanId; // Assuming a single ratePlanId per booking
          const ratePlanData = await ratePlan.findOne({ ratePlanId: ratePlanId });
          const ratePlanName = ratePlanData ? ratePlanData.ratePlanName : '';
          return {
            ...booking.toObject(),
            ratePlanName,
          };
        })
      );

      // Remove ratePlanName array and keep only ratePlanName
      const cleanedBookings = populatedBookings.map((booking) => {
        const { ratePlanName, ...rest } = booking;
        return {
          ...rest,
          ratePlanName: ratePlanName[0].ratePlanName, // Assuming a single ratePlanName per booking
        };
      });



      console.log(cleanedBookings);
      res.status(200).json(cleanedBookings);
    } else {
      // If requestType is not "checkIn", send a response
      res.status(400).json({ message: 'Please specify requestType as "checkOut"' });
    }

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};
