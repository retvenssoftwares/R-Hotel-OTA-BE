const amenities = require('../../models/Amenities/amenities')

module.exports = async (req, res)=> {
    try {
        // Use the find() method to retrieve all records from the collection
        const allAmenities = await amenities.find({});
    
        if (allAmenities.length > 0) {
          // If records are found, send a 200 OK response with the data
          return res.status(200).json(allAmenities);
        } else {
          // If no records are found, send a 404 Not Found response
          return res.status(404).json({ message: "No amenities found" });
        }
      } catch (error) {
        // Handle errors and send a 500 Internal Server Error response
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };

