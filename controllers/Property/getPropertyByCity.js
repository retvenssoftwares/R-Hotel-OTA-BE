const property = require('../../models/Onboarding/propertys');

module.exports = async (req, res) => {
    try {
        const city = req.params.city;

        if (city === "null") {
            const  all = await property.find({})
            return res.status(200).json({ all });
        }

        // Search for properties with a matching city in the first object of the city array
        const properties = await property.find({
            'city.0.city': city
        });

        if (!properties || properties.length === 0) {
            return res.status(404).json({ error: 'No properties found for the given city.' });
        }

        // Modify the properties to include only the first object of each array (except amenities)
        const modifiedProperties = properties.map((property) => {
            return {
                ...property.toObject(),
                propertyAddress: property.propertyAddress[0],
                propertyAddress1: property.propertyAddress1[0],
                postCode: property.postCode[0],
                location: property.location[0],
                city: property.city[0],
                propertyName: property.propertyName[0],
                rating: property.rating[0],
                checkInTime: property.checkInTime[0],
                checkOutTime: property.checkOutTime[0],
                coverPhoto: property.coverPhoto[0],
                hotelLogo: property.hotelLogo[0],
            };
        });

        return res.status(200).json(modifiedProperties);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
