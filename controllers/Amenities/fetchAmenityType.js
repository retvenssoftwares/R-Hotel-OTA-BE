const amenity = require('../../models/Amenities/amenities')

// Define a GET API route to fetch unique amenityType values based on amenityCategory
module.exports = async (req, res) => {
  const category = req.params.category;

  try {
    const uniqueAmenityTypes = await amenity.distinct("amenityType", {
      amenityCategory: category,
    });

    res.json({ amenityType: uniqueAmenityTypes }); // Change "amenityTypes" to "amenityType"
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
