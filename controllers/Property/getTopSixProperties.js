const Property = require('../../models/Onboarding/propertys');
const Booking = require('../../models/Bookings/bookings'); // Import the Mongoose model for bookings

// Create a GET route to fetch the top 6 properties
module.exports = async (req, res) => {
  try {
    // Find all bookings
    const allBookings = await Booking.find({});

    // Create an object to store propertyId counts
    const propertyIdCounts = {};

    // Count occurrences of propertyIds in bookings
    allBookings.forEach((booking) => {
      const { propertyId } = booking;
      if (propertyIdCounts.hasOwnProperty(propertyId)) {
        propertyIdCounts[propertyId]++;
      } else {
        propertyIdCounts[propertyId] = 1;
      }
    });

    // Sort propertyId counts in descending order
    const sortedPropertyIdCounts = Object.entries(propertyIdCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Get the top 6 propertyIds
    const topPropertyIds = sortedPropertyIdCounts.slice(0, 6).map((entry) => entry[0]);

    // Fetch property details for the top 6 propertyIds
    const topPropertyDetails = await Property.find({ propertyId: { $in: topPropertyIds } });

    res.status(200).json(topPropertyDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
