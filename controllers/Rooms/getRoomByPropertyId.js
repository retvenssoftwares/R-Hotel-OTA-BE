const roomTypeModel = require('../../models/Onboarding/roomTypeDetails');

module.exports = async (req, res) => {
  try {
    // Use the find() method to retrieve all records from the collection
    const propertyRoomTypes = await roomTypeModel.find({ propertyId: req.params.propertyId });

    if (propertyRoomTypes.length > 0) {
      // If records are found, send a 200 OK response with the data

      const extractedRoomTypeData = {};

      // Iterate over the first element of each array field to extract data
      const firstProperty = propertyRoomTypes[0]; // Get the first property for reference
      extractedRoomTypeData.roomTypeId = firstProperty.roomTypeId;
      extractedRoomTypeData.userId = firstProperty.userId;
      extractedRoomTypeData.description = firstProperty.description;
      extractedRoomTypeData.numberOfRooms = firstProperty.numberOfRooms[0] || ''; // Check if city array has elements
      extractedRoomTypeData.roomSize = firstProperty.roomSize[0] || ''; // Check if propAdd array has elements
      extractedRoomTypeData.smoking = firstProperty.smoking[0] || ''; // Check if propertyName array has elements
      extractedRoomTypeData.baseAdult = firstProperty.baseAdult[0] || ''; // Check if checkInTime array has elements
      extractedRoomTypeData.baseChild = firstProperty.baseChild[0] || ''; // Check if checkOutTime array has elements
      extractedRoomTypeData.maxAdult = firstProperty.maxAdult[0] || ''; // Check if rating array has elements
      extractedRoomTypeData.maxChild = firstProperty.maxChild[0] || ''
      extractedRoomTypeData.maxOccupancy = firstProperty.maxOccupancy[0] || ''
      extractedRoomTypeData.baseRate = firstProperty.baseRate[0] || ''
      extractedRoomTypeData.extraAdultRate = firstProperty.extraAdultRate[0] || ''
      extractedRoomTypeData.extraChildRate = firstProperty.extraChildRate[0] || ''
      return res.status(200).json(extractedRoomTypeData);
    } else {
      // If no records are found, send a 404 Not Found response
      return res.status(404).json({ message: "No room types found" });
    }
  } catch (error) {
    console.log(error)
    // Handle errors and send a 500 Internal Server Error 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

