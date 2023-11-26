const property = require('../../models/Onboarding/propertys');

module.exports = async (req, res) => {
    try {
        const city = req.params.city;

        if (!city) {
            const allProperties = await property.find({});
            return res.status(200).json(allProperties);
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
                propertyAddress: property.propertyAddress[0]?.propertyAddress || '',
                propertyAddress1: property.propertyAddress1[0]?.propertyAddress1 || '',
                postCode: property.postCode[0]?.postCode || '',
                location: property.location[0]?.location || '',
                city: property.city[0]?.city || '',
                propertyName: property.propertyName[0]?.propertyName ||'',
                rating: property.rating[0]?.rating || '',
                checkInTime: property.checkInTime[0]?.checkOutTime || '',
                checkOutTime: property.checkOutTime[0]?.checkOutFrom || '',
                coverPhoto: property.coverPhoto[0]?.coverPhoto || '',
                hotelLogo: property.hotelLogo[0]?.hotelLogo || '',
            };
        });

        return res.status(200).json(modifiedProperties);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
