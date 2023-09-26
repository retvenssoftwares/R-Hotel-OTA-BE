// const Property = require('../../models/Rooms/roomTypeDetails');

// module.exports = async (req, res) => {
//     try {
//         const { propertyId } = req.params;

//         // Find all records with the given propertyId
//         const rooms = await Property.find({ propertyId });

//         if (!rooms || rooms.length === 0) {
//             return res.status(404).json({ error: 'No rooms found for the given propertyId' });
//         }

//         // Extract data from each room and create an array of objects
//         const extractedData = rooms.map(room => ({
//             roomName: room.roomName[0] ? room.roomName[0].roomName : '',
//             roomTypeId: room.roomTypeId,
//             description: room.description[0] ? room.description[0].description : '',
//             numberOfRooms: room.numberOfRooms[0] ? room.numberOfRooms[0].numberOfRooms : '',
//             bedType: room.bedType[0] ? room.bedType[0].bedTypeId : '',
//             roomSize: room.roomSize[0] ? room.roomSize[0].roomSize : '',
//             smoking: room.smoking[0] ? room.smoking[0].smoking : '',
//             baseAdult: room.baseAdult[0] ? room.baseAdult[0].baseAdult : '',
//             baseChild: room.baseChild[0] ? room.baseChild[0].baseChild : '',
//             maxAdult: room.maxAdult[0] ? room.maxAdult[0].maxAdult : '',
//             maxChild: room.maxChild[0] ? room.maxChild[0].maxChild : '',
//             maxOccupancy: room.maxOccupancy[0] ? room.maxOccupancy[0].maxOccupancy : '',
//             baseRate: room.baseRate[0] ? room.baseRate[0].baseRate : '',
//             extraAdultRate: room.extraAdultRate[0] ? room.extraAdultRate[0].extraAdultRate : '',
//             extraChildRate: room.extraChildRate[0] ? room.extraChildRate[0].extraChildRate : '',
//             generalAmenities: room.generalAmenities, // Include all items in the generalAmenities array
//         }));

//         return res.status(200).json(extractedData);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

const Property = require('../../models/Rooms/roomTypeDetails');
const RatePlan = require('../../models/Rooms/ratePlan');

module.exports = async (req, res) => {
    try {
        const { propertyId } = req.params;

        // Find all records with the given propertyId
        const rooms = await Property.find({ propertyId });

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ error: 'No rooms found for the given propertyId' });
        }

        // Initialize an empty array to store the response data
        const extractedData = [];

        for (const room of rooms) {
            const roomTypeData = {
                roomName: room.roomName[0] ? room.roomName[0].roomName : '',
                roomTypeId: room.roomTypeId,
                description: room.description[0] ? room.description[0].description : '',
                ratePlanNames: [], // Initialize an empty array for ratePlanNames
            };

            // Iterate through each ratePlanId in the roomType
            for (const ratePlanId of room.ratePlan) {
                const ratePlanIdString = ratePlanId.ratePlanId.toString(); // Ensure it's a string
                const ratePlan = await RatePlan.findOne({ ratePlanId: ratePlanIdString });

                if (ratePlan) {
                    // Get the ratePlanName from the first object in ratePlanName array
                    const ratePlanName = ratePlan.ratePlanName[0] ? ratePlan.ratePlanName[0].ratePlanName : '';
                    roomTypeData.ratePlanNames.push(ratePlanName); // Push ratePlanName to the array
                }
            }

            extractedData.push(roomTypeData); // Push the roomTypeData to the response array
        }

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

