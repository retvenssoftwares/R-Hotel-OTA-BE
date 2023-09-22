const roomTypeModel = require('../../models/Rooms/roomTypeDetails');

module.exports = async (req, res) => {
  try {
    // Use the find() method to retrieve all records from the collection
    const propertyRoomTypes = await roomTypeModel.find({ propertyId: req.params.propertyId });

    if (propertyRoomTypes.length > 0) {
      // If records are found, send a 200 OK response with the data

      const extractedRoomTypeData = {};

      // Iterate over the first element of each array field to extract data
      const firstProperty = propertyRoomTypes[0]; // Get the first property for reference
      extractedRoomTypeData.userId = firstProperty.userId;
      extractedRoomTypeData.propertyId = firstProperty.propertyId;
      extractedRoomTypeData.country = firstProperty.country;
      extractedRoomTypeData.city = firstProperty.city[0] || ''; // Check if city array has elements
      extractedRoomTypeData.propertyAddress = firstProperty.propertyAddress[0] || ''; // Check if propAdd array has elements
      extractedRoomTypeData.propertyName = firstProperty.propertyName[0] || ''; // Check if propertyName array has elements
      extractedRoomTypeData.checkInTime = firstProperty.checkInTime[0] || ''; // Check if checkInTime array has elements
      extractedRoomTypeData.checkOutTime = firstProperty.checkOutTime[0] || ''; // Check if checkOutTime array has elements
      extractedRoomTypeData.rating = firstProperty.rating[0] || ''; // Check if rating array has elements
      extractedRoomTypeData.location = firstProperty.location[0] || ''
      return res.status(200).json(extractedRoomTypeData);
    } else {
      // If no records are found, send a 404 Not Found response
      return res.status(404).json({ message: "No room types found" });
    }
  } catch (error) {
    console.log(error)
    // Handle errors and send a 500 Internal Server Error response
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

