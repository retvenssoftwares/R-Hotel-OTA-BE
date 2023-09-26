const express = require('express');
const router = express.Router();
const Property = require('../../models/Onboarding/propertys'); // Import your Mongoose model

// Define the PATCH route
module.exports = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { amenitiesIDs } = req.body; // Change to amenitiesIDs (an array)

    // Find the property by propertyId
    const property = await Property.findOne({ propertyId });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Iterate through the array of amenitiesIDs
    for (const amenitiesID of amenitiesIDs) {
      // Find the amenity with amenitiesID in the amenities array
      const amenity = property.amenities.find(
        (amenity) => amenity.amenitiesID === amenitiesID
      );

      if (!amenity) {
        // If the amenity doesn't exist, create a new one with isSelected as true
        const newAmenity = {
          amenitiesID,
          isSelected: true,
        };

        // Push the new amenity to the amenities array
        property.amenities.push(newAmenity);
      } else if (amenity && amenity.isSelected === "false") {
        // If the amenity exists and isSelected is false, set it to true
        amenity.isSelected = true;
      } else if (amenity && amenity.isSelected === "true") {
        // If the amenity exists and isSelected is true, set it to false
        amenity.isSelected = false;
      }
    }

    // Save the updated property document
    await property.save();

    res.status(200).json({ message: 'Amenities updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
