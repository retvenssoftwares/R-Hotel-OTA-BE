const inclusion = require('../../models/Inclusions/inclusions')

// Define a GET API route to fetch unique amenityType values based on amenityCategory
module.exports = async (req, res) => {
  try {
    const uniqueInclusionTypes = await inclusion.distinct("inclusionType", {});

    res.json(uniqueInclusionTypes); // Change "amenityTypes" to "amenityType"
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};