const pendingBooking = require('../../models/Bookings/bookingPending');
const ratePlan = require('../../models/Rooms/ratePlan')

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
        checkInDate: { $gte: startDate },  // Check-in date is greater than or equal to startDate
        checkOutDate: { $lte: endDate },    // Check-out date is less than or equal to endDate
      };

      const bookings = await pendingBooking.find(query,{
        checkOutDate: 1,
      checkInDate: 1,
      bookingId:1,
      "roomDetails.ratePlanId":1,
      "roomDetails.guestPhoneNumber": 1,
      "roomDetails.guestFirstName": 1,
      "roomDetails.guestLastName": 1,
      totalAmount: 1,
      _id: 0, // Exclude the _id field from the response
      });
      console.log(bookings);
      res.status(200).json(bookings);
    } else {
      // If requestType is not "checkIn", send a response
      res.status(400).json({ message: 'Please specify requestType as "checkOut"' });
    }

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};
