// const Property = require('../../models/Onboarding/propertys');

// module.exports = async (req, res) => {
//   try {
//     const propertyId = req.params.propertyId;

//     const property = await Property.findOne(
//       { propertyId },
//       {
//         'postCode': { $slice: 1 }, // Fetch the first item in the "postCode" array
//         'city': { $slice: 1 },     // Fetch the first item in the "city" array
//         'location': { $slice: 1 }, // Fetch the first item in the "location" array
//         'propertyName': { $slice: 1 }, // Fetch the first item in the "propertyName" array
//         'rating': { $slice: 1 },  // Fetch the first item in the "rating" array
//         'location':{$slice:1},
//         'checkInTime':{$slice:1},
//         'checkOutTime':{$slice:1},

//         // Add more fields as needed
//       }
//     );

//     if (!property) {
//       return res.status(404).json({ error: 'Property not found' });
//     }

//     return res.status(200).json(property);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };


const Property = require('../../models/Onboarding/propertys')

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await Property.findOne({ propertyId:propertyId });
        if (!property) {
            return res.status(404).json({ error: 'property not found' });
        }
        
        // Extract the first item from each array
        const {
            date,
            country,
            propertyManagement,
            management,
            propertyAddress,
            propertyAddress1,
            userId,
            postCode,
            city,
            propertyName,
            roomType,
            amenities,
            checkInTime,
            checkOutTime,
            rating,
            location
           
            
        } = property;

        // Create a new object with extracted data
        const extractedData = {
            date,
            userId,
            propertyId,
            country,
            propertyManagement,
            management,
            propertyAddress,
            propertyAddress1,
            postCode: postCode[0] || {},
            city: city[0] || {},
            propertyName: propertyName[0] || {},
            checkInTime: checkInTime[0] || {},
            checkOutTime: checkOutTime[0] || {},
            rating: rating[0] || {},
            location: location[0] || {},
            roomType,
            amenities
        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

