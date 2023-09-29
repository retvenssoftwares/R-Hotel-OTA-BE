const Property = require('../../models/Onboarding/propertys');

module.exports = async (req, res) => {
    try {
        // Remove the propertyId parameter since we want to fetch all properties
        const properties = await Property.find();
        
        if (!properties || properties.length === 0) {
            return res.status(404).json({ error: 'No properties found' });
        }
        
        // Map the properties to an array of extracted data
        const extractedData = properties.map((property) => ({
            date: property.date,
            userId: property.userId,
            propertyId: property.propertyId,
            country: property.country,
            propertyName: property.propertyName[0] || {},
            rating: property.rating[0] || {},
            hotelLogo: property.hotelLogo[0] || {},
            coverPhoto: property.coverPhoto[0] || {},
           
           
           
        }));
        
        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
