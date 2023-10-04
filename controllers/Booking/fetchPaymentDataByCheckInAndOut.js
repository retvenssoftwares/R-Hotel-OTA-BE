const Booking = require('../../models/Bookings/bookings');
const ratePlan = require('../../models/Rooms/ratePlan')

// Function to fetch all data between startDate and endDate
module.exports = async function fetchBookingsByPropertyId(req, res) {
  try {
    const { propertyId } = req.params;
    const { checkInDate, checkOutDate } = req.query;

      // Create a query object with propertyId and date filters
      const query = {
        propertyId,
        checkInDate: { $gte: checkInDate },  // Check-in date is greater than or equal to startDate
        checkOutDate: { $lte: checkOutDate },    // Check-out date is less than or equal to endDate
      };

      const bookings = await Booking.find(query,{
        checkOutDate: 1,
      checkInDate: 1,
      bookingId:1,
      paymentMode:1,
      bookingStatus:1,
      totalAmount:1,
      paymentStatus:1,
      "roomDetails.guestFirstName":1,
      "roomDetails.guestLastName":1
     
      });
      console.log(bookings);
      res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};
