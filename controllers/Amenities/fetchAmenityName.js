const amenity = require('../../models/Amenities/amenities')

// Define a GET API route to fetch unique amenityType values based on amenityCategory
module.exports = async (req, res) => {
  const Type = req.params.Type;

  try {
    const uniqueAmenityName = await amenity.find({}).select('amenityName amenityId -_id');

    res.json(uniqueAmenityName); // Change "amenityTypes" to "amenityType"
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
