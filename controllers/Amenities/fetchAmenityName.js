const amenity = require('../../models/Amenities/amenities')

// Define a GET API route to fetch unique amenityType values based on amenityCategory
module.exports = async (req, res) => {
  const Type = req.params.Type;

  try {
    const uniqueAmenityName = await amenity.distinct("amenityName", {
      amenityType: Type,
    });

    res.json({ amenityName: uniqueAmenityName}); // Change "amenityTypes" to "amenityType"
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
