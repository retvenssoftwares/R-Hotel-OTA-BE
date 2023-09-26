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
           
            city: property.city[0] || {},
           
           
           
        }));
        
        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};