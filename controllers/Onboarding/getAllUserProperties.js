const propertyModel = require('../../models/Onboarding/propertys')

module.exports = async (req, res) => {
  try {
    // Use the find() method to retrieve all records from the collection
    const userProperties = await propertyModel.find({ userId: req.params.userId });

    if (userProperties.length > 0) {
      // If records are found, send a 200 OK response with the data

      const extractedPropertyData = {};

      // Iterate over the first element of each array field to extract data
      const firstProperty = userProperties[0]; // Get the first property for reference
      extractedPropertyData.userId = firstProperty.userId;
      extractedPropertyData.propertyId = firstProperty.propertyId;
      extractedPropertyData.country = firstProperty.country;
      extractedPropertyData.city = firstProperty.city[0] || ''; // Check if city array has elements
      extractedPropertyData.propertyAddress = firstProperty.propertyAddress[0] || ''; // Check if propAdd array has elements
      extractedPropertyData.propertyName = firstProperty.propertyName[0] || ''; // Check if propertyName array has elements
      extractedPropertyData.checkInTime = firstProperty.checkInTime[0] || ''; // Check if checkInTime array has elements
      extractedPropertyData.checkOutTime = firstProperty.checkOutTime[0] || ''; // Check if checkOutTime array has elements
      extractedPropertyData.rating = firstProperty.rating[0] || ''; // Check if rating array has elements
      extractedPropertyData.location = firstProperty.location[0] || ''
      return res.status(200).json(extractedPropertyData);
    } else {
      // If no records are found, send a 404 Not Found response
      return res.status(404).json({ message: "No properties found" });
    }
  } catch (error) {
    console.log(error)
    // Handle errors and send a 500 Internal Server Error response
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

