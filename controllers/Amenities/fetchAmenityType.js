const amenity = require('../../models/Amenities/amenities');
const property = require('../../models/Onboarding/propertys');

// Define a GET API route to fetch unique amenityType values based on amenityCategory
module.exports = async (req, res) => {
  const amenitiesType = req.params.type;
  const propertyId = req.params.propertyId;

  try {
    // Retrieve all amenities from the amenities collection that match the specified category
    const allAmenities = await amenity.find(
      { amenityType: amenitiesType },
      { amenityName: 1, amenityId: 1, amenityCategory: 1, amenityType: 1, isSelected: 1 }
    );

    // Retrieve the amenities array for the specified propertyId
    const propertyAmenities = await property.findOne(
      { propertyId: propertyId },
      { amenities: 1 }
    );

    if (!propertyAmenities) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Create an array to store the results
    const result = [];

    // Loop through all amenities and determine their status based on property amenities
    for (const amenityData of allAmenities) {
      const isSelected = propertyAmenities.amenities.some(
        (propertyAmenity) =>
          propertyAmenity.amenitiesId === amenityData.amenityId &&
          propertyAmenity.isSelected === 'true'
      );

      // Determine the status based on isSelected
      const status = isSelected ? true : false;

      result.push({
        amenityName: amenityData.amenityName,
        amenityId: amenityData.amenityId,
        amenityCategory: amenityData.amenityCategory,
        amenityType: amenityData.amenityType,
        status: status        
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
