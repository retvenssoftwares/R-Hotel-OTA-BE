const propertyModel = require('../../models/Onboarding/propertys');

module.exports = async (req, res) => {
  try {
    // Use the find() method to retrieve all records from the collection
    const userProperties = await propertyModel.find({ userId: req.params.userId });

    if (userProperties.length > 0) {
      // If records are found, send a 200 OK response with an array of extracted data
      const extractedPropertyData = userProperties.map((property) => ({
        userId: property.userId,
        propertyId: property.propertyId,
        country: property.country,
        city: property.city[0] || '',
        propertyAddress: property.propertyAddress[0] || '',
        propertyName: property.propertyName[0] || '',
        checkInTime: property.checkInTime[0] || '',
        checkOutTime: property.checkOutTime[0] || '',
        rating: property.rating[0] || '',
        location: property.location[0] || '',
      }));
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

