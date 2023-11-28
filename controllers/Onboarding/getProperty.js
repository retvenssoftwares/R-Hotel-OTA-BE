const Property = require('../../models/Onboarding/propertys');
const RoomType = require('../../models/Rooms/roomTypeDetails');
const amenityModel = require('../../models/Amenities/amenities')

module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await Property.findOne({ propertyId: propertyId });
        if (!property) {
            return res.status(404).json({ error: 'property not found' });
        }

        // Extracting roomTypeIds from the property object
        const { roomType } = property;
        
        const roomTypIds = roomType.map((item)=>item.roomTypeId)
        // console.log(roomTypIds)
        // Fetching room details based on the extracted roomTypeIds
        const roomDetails = await RoomType.find({ roomTypeId: { $in: roomTypIds } }).select('roomTypeId roomType.roomType');
        const simplifiedRoomDetails = roomDetails.map(({ roomTypeId, roomType }) => ({
            roomTypeId,
            roomType: roomType[0].roomType // Assuming each roomType array has only one object
        }));
        // Extracting specific data fields from the property object
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
            amenities,
            checkInTime,
            checkOutTime,
            rating,
            hotelLogo,
            coverPhoto,
            location
        } = property;


        ///Amenity
        const amenitiesIds = amenities.map((item)=>item.amenitiesId)
        //console.log(amenitiesIds)
        const amenityDetails = await amenityModel.find({ amenityId: { $in: amenitiesIds } }).select('amenityId amenityName');
       // console.log(amenityDetails)
        const simplifiedAmenityDetails = amenityDetails.map(({ amenityId, amenityName }) => ({
            amenityId:amenityId,
            amenityName: amenityName// Assuming each roomType array has only one object
        }));


        // Creating a new object with extracted data
        const extractedData = {
            date,
            userId,
            propertyId,
            country,
            propertyManagement,
            management,
            propertyAddress: propertyAddress[0].propertyAddress || '',
            propertyAddress1: propertyAddress1[0].propertyAddress1 || '',
            postCode: postCode[0].postCode || '',
            city: city[0].city || '',
            propertyName: propertyName[0].propertyName || '',
            checkInTime: checkInTime[0].checkInTime || '',
            checkOutTime: checkOutTime[0].checkOutTime || '',
            rating: rating[0].rating || '',
            hotelLogo: hotelLogo[0].hotelLogo || '',
            coverPhoto: coverPhoto[0].coverPhoto || '',
            location: location[0].location || '',
            roomType: simplifiedRoomDetails, // Assigning fetched room details
            amenities:simplifiedAmenityDetails
        };

        return res.status(200).json(extractedData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
