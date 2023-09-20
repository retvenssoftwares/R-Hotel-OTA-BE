const express = require('express');
const router = express.Router();
const rateType = require('../../models/Onboarding/ratePlan'); // Import your Mongoose model

// Define the PATCH route
module.exports = async (req, res) => {
  try {
    const { rateTypeId } = req.params;
    const { inclusionIDs } = req.body; // Change to amenitiesIDs (an array)

    // Find the rateType by rateTypeId
    const ratetype = await rateType.findOne({ rateTypeId });

    if (!ratetype) {
      return res.status(404).json({ message: 'rateType not found' });
    }

    // Iterate through the array of inclusionIDs
    for (const inclusionId of inclusionIDs) {
      // Find the Inclusion with inclusionIDs in the inclusion array
      const Inclusion = ratetype.inclusion.find(
        (Inclusion) => Inclusion.inclusionId === inclusionId
      );

      if (!Inclusion) {
        // If the inclusion doesn't exist, create a new one with isSelected as true
        const newInclusion = {
            inclusionId,
          isSelected: true,
        };

        // Push the new inclusion to the inclusion array
        ratetype.inclusion.push(newInclusion);
      } else if (Inclusion && Inclusion.isSelected === "false") {
        // If the inclusion exists and isSelected is false, set it to true
        Inclusion.isSelected = true;
      } else if (Inclusion && Inclusion.isSelected === "true") {
        // If the inclusion exists and isSelected is true, set it to false
        Inclusion.isSelected = false;
      }
    }

    // Save the updated rateType document
    await ratetype.save();

    res.status(200).json({ message: 'inclusion updated successfully', ratetype });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
