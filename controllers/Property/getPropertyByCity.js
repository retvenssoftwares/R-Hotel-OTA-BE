const property = require('../../models/Onboarding/propertys');
const propertyImageModel = require('../../models/Images/propertyImages');

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

        // Fetch property images for each property separately
        const modifiedProperties = [];
        for (const prop of properties) {
            const propertyId = prop.propertyId;

            // Fetch property images based on propertyId
            const propertyImages = await propertyImageModel
                .find({ propertyId })
                .select('-_id propertyImages.image');

            // Modify the properties to include only the first object of each array (except amenities)
            const modifiedProperty = {
                propertyId: prop.propertyId,
                propertyAddress: prop.propertyAddress[0]?.propertyAddress || '',
                propertyAddress1: prop.propertyAddress1[0]?.propertyAddress1 || '',
                postCode: prop.postCode[0]?.postCode || '',
                location: prop.location[0]?.location || '',
                city: prop.city[0]?.city || '',
                propertyName: prop.propertyName[0]?.propertyName || '',
                rating: prop.rating[0]?.rating || '',
                checkInTime: prop.checkInTime[0]?.checkOutTime || '',
                checkOutTime: prop.checkOutTime[0]?.checkOutFrom || '',
                coverPhoto: prop.coverPhoto[0]?.coverPhoto || '',
                hotelLogo: prop.hotelLogo[0]?.hotelLogo || '',
                propertyImages: propertyImages.map(img => img.propertyImages.map(imageObj => ({ image: imageObj.image }))),
            };

            modifiedProperties.push(modifiedProperty);
        }

        return res.status(200).json(modifiedProperties);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
