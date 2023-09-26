const property = require("../../models/Onboarding/propertys")

module.exports = async (req, res) => {
    try {
      const cities = await property.find({});
      const property_data = []
  
      for (const cityData of cities) {
        const cityArray = cityData.city;
  
        if (cityArray && cityArray.length > 0) {
          const firstCity = cityArray[0].city; // Assuming city has a property named 'city'
  
          // Find the property data that matches the first city
          const propertyData = await property.findOne({ "city.city": firstCity });
  
          property_data.push(propertyData)
         
        }
      }
  
      return res.status(200).json({ propertyData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  