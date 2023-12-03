// const inventory = require('../../models/manageInventory/manageInventory');
// const roomTypeModel = require('../../models/Rooms/roomTypeDetails');

// // ... (previous imports and setup)

// const fetchRoomTypesHandler = async (req, res) => {
//     const { propertyId, startDate, endDate } = req.query;
//     try {
//         const startDateObj = new Date(startDate);
//         const checkInDateISO = startDateObj.toISOString();
//         const endDateObj = new Date(endDate);
//         const checkOutDateISO = endDateObj.toISOString();

//         if (startDate > endDate) {
//             return res.status(400).json({ message: "Check-in date cannot be greater than check-out date", statuscode: 400 });
//         }

//         // Validate the date format
//         const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
//         if (!dateFormatRegex.test(startDate) || !dateFormatRegex.test(endDate)) {
//             return res.status(400).json({ message: "Please enter the date in the correct format (yyyy-mm-dd)", statuscode: 400 });
//         }

//         const roomTypes = await roomTypeModel.aggregate([
//             { $match: { propertyId } },
//             {
//                 $project: {
//                     roomTypeId: 1,
//                     roomTypeName: { $arrayElemAt: ["$roomType.roomType", 0] },
//                     numberOfRooms: { $arrayElemAt: ["$numberOfRooms.numberOfRooms", 0] },
//                     _id: 0, // Exclude _id from the result
//                 },
//             },
//         ]);

//         if (!roomTypes || roomTypes.length === 0) {
//             return res.status(400).json({ message: "No room types found", statuscode: 400 });
//         }

//         const calculatedData = [];
//         for (const roomType of roomTypes) {
//             const roomInventory = await inventory.findOne({ roomTypeId: roomType.roomTypeId });

//             if (roomInventory) {
//                 const { addedInventory, blockedInventory } = roomInventory.manageInventory;

//                 let minAvailable = roomType.numberOfRooms; // Initialize with maximum possible value

//                 // Generate a date range between start and end dates
//                 const dateRange = generateDateRange(startDateObj, endDateObj);

//                 // Calculate available inventory for each date
//                 const availabilityByDate = dateRange.map(date => {
//                     const added = addedInventory.find(item => item.date === date);
//                     const block = blockedInventory.find(item => item.date === date);

//                     const addedCount = added ? added.addedInventory : 0;
//                     const blockedCount = block ? block.blockedInventory : 0;

//                     const available = roomType.numberOfRooms + addedCount - blockedCount;
//                     minAvailable = Math.min(minAvailable, available);
//                     return { date, available };
//                 });

//                 calculatedData.push({
//                     roomTypeId: roomType.roomTypeId,
//                     roomTypeName: roomType.roomTypeName,
//                     numberOfRooms:roomType.numberOfRooms,
//                     minAvailable,
//                 });
//             } else {
    
//                 calculatedData.push({
//                     roomTypeId: roomType.roomTypeId,
//                     roomTypeName: roomType.roomTypeName,
//                     numberOfRooms:roomType.numberOfRooms,
//                     minAvailable: roomType.numberOfRooms,
//                 });
//             }
//         }

//         // Handle the calculated data, for example, sending it in the response
//         return res.status(200).json({ data: calculatedData });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Function to generate date range between two dates
// const generateDateRange = (startDate, endDate) => {
//     const dateRange = [];
//     let currentDate = new Date(startDate);

//     while (currentDate <= endDate) {
//         dateRange.push(currentDate.toISOString().split('T')[0]);
//         currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dateRange;
// };

// module.exports = fetchRoomTypesHandler;



const confirmBooking = require('../../models/Bookings/bookings');
const holdBooking = require('../../models/Bookings/bookingPending');
const inventory = require('../../models/manageInventory/manageInventory');
const roomTypeModel = require('../../models/Rooms/roomTypeDetails');
const rateTypeModel = require('../../models/Rooms/rateType')
const roomTypeImage = require ('../../models/Images/roomTypeImages')
const ratPlanModel = require('../../models/Rooms/ratePlan')
const amenityModel = require('../../models/Amenities/amenities')
const fetchRoomTypesHandler = async (req, res) => {
    const { propertyId, startDate, endDate, maxOccupancy } = req.query;
    try {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        let matchQuery = {
            propertyId,
        };

        if (maxOccupancy) {
            matchQuery["maxOccupancy.maxOccupancy"] = { $gte: maxOccupancy };
        }

        if (startDateObj > endDateObj) {
            return res.status(400).json({ message: "Check-in date cannot be greater than check-out date", statuscode: 400 });
        }

        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(startDate) || !dateFormatRegex.test(endDate)) {
            return res.status(400).json({ message: "Please enter the date in the correct format (yyyy-mm-dd)", statuscode: 400 });
        }

        const roomTypes = await roomTypeModel.aggregate([
          {
                $match: matchQuery,
            },
            {
                $project: {
                    roomTypeId: 1,
                    baseRate:{$arrayElemAt:["$baseRate.baseRate",0]},
                    baseAdult:{$arrayElemAt:["$baseAdult.baseAdult",0]},
                    baseChild:{$arrayElemAt:["$baseChild.baseChild",0]},
                    maxAdult:{$arrayElemAt:["$maxAdult.maxAdult",0]},
                    maxChild:{$arrayElemAt:["$maxChild.maxChild",0]},
                    maxOccupancy:{$arrayElemAt:["$maxOccupancy.maxOccupancy",0]},
                    roomTypeName: { $arrayElemAt: ["$roomType.roomType", 0] },
                    numberOfRooms: { $arrayElemAt: ["$numberOfRooms.numberOfRooms", 0] },
                    generalAmenities: {
                        $filter: {
                            input: "$generalAmenities",
                            as: "amenity",
                            cond: { $eq: ["$$amenity.isSelected", "true"] }
                        }
                    },
                    _id: 0,
                },
            },
        ]);
      
        if (!roomTypes || roomTypes.length === 0) {
            return res.status(400).json({ message: "No room types found", statuscode: 400 });
        }

        const bookingsConfirmed = await confirmBooking.find({
            propertyId,
            checkInDate: { $lte: endDate },
            checkOutDate: { $gte: startDate },
        });

        const bookingsPending = await holdBooking.find({
            propertyId,
            checkInDate: { $lte: endDate },
            checkOutDate: { $gte: startDate },
        });

        const calculatedData = [];

        for (const roomType of roomTypes) {
            const roomInventory = await inventory.findOne({ roomTypeId: roomType.roomTypeId });

                 //rateType
                 let rateType = [];
                   // Find rateType records that match the roomTypeId
            const rateTypesMatchingRoomTypeId = await rateTypeModel.find({
                roomTypeId: roomType.roomTypeId // Match roomTypeId
                
            });

               // Fetch 'name' from the matching rateType records
               for (const rate of rateTypesMatchingRoomTypeId) {
                const ratePlanDetails = await ratPlanModel.find({
                    rateTypeId: rate.rateTypeId ,// Match rateTypeId from rateTypeModel
                 //   startDate: { $lte: endDate }, // Check if ratePlan startDate is less than or equal to endDate
                  //  endDate: { $gte: startDate } // Check if ratePlan endDate is greater than or equal to startDate
                });

                const ratePlans = ratePlanDetails.map(rateDetail => ({
                    ratePlanName: rateDetail.ratePlanName[0].ratePlanName,
                    ratePlanId:rateDetail.ratePlanId,
                    value:rateDetail.value[0].value,
                    percentage:rateDetail.percentage[0].percentage,
                    startDate:rateDetail.startDate[0].startDate,
                    endDate:rateDetail.endDate[0].endDate,
                    mealsIncluded:rateDetail.mealsIncluded[0].mealNames
                    // Include other fields from rateDetail if needed
                }));

                rateType.push({
                    name: rate.name[0].name, // Assuming you want the first 'name' in the array
                    rateTypeId:rate.rateTypeId,
                    refundable:rate.refundable[0].refundable,
                    taxIncluded:rate.taxIncluded[0].taxIncluded,
                    basePrice:rate.basePrice[0].basePrice,
                    ratePlans: ratePlans // Include fetched ratePlanName array
                   // modifiedDate: rate.name[0].modifiedDate // Assuming 'modifiedDate' from the same array element
                });
            }


            //roomImage
            const roomTypeImages = await roomTypeImage.findOne({ propertyId, roomTypeId: roomType.roomTypeId });

            let images = []; // Define images variable here
            if (roomTypeImages && roomTypeImages.roomTypeImages) {
                images = roomTypeImages.roomTypeImages
                    .filter(image => image.displayStatus === '1') // Filter images by displayStatus
                    .map(image => ({
                        image: image.image,
                    }));
            }


            if (roomInventory) {
                const { addedInventory, blockedInventory } = roomInventory.manageInventory;

                const dateRange = generateDateRange(startDateObj, endDateObj);

                let minAvailable = Infinity;

                for (const date of dateRange) {
                    const added = addedInventory.find(item => item.date === date);
                    const block = blockedInventory.find(item => item.date === date);

                    const addedCount = added ? added.addedInventory : 0;
                    const blockedCount = block ? block.blockedInventory : 0;

                    let available = roomType.numberOfRooms + addedCount - blockedCount;

                    for (const bookingConfirmed of bookingsConfirmed) {
                        for (const roomDetail of bookingConfirmed.roomDetails) {
                            if (roomDetail.roomTypeId === roomType.roomTypeId) {
                                const bookingStartDate = new Date(bookingConfirmed.checkInDate);
                                const bookingEndDate = new Date(bookingConfirmed.checkOutDate);

                                if (bookingStartDate <= new Date(date) && bookingEndDate >= new Date(date)) {
                                    available--;
                                }
                            }
                        }
                    }

                    for (const bookingPending of bookingsPending) {
                        for (const roomDetail of bookingPending.roomDetails) {
                            if (roomDetail.roomTypeId === roomType.roomTypeId) {
                                const bookingStartDate = new Date(bookingPending.checkInDate);
                                const bookingEndDate = new Date(bookingPending.checkOutDate);

                                if (bookingStartDate <= new Date(date) && bookingEndDate >= new Date(date)) {
                                    available--;
                                }
                            }
                        }
                    }

                    minAvailable = Math.min(minAvailable, available);
                }

                calculatedData.push({
                    roomTypeId: roomType.roomTypeId || '',
                    baseRate:roomType.baseRate || '',
                    baseAdult:roomType.baseAdult || '',
                    baseChild:roomType.baseChild || '',
                    maxAdult:roomType.maxAdult || '',
                    maxChild:roomType.maxChild || '',
                    maxOccupancy:roomType.maxOccupancy || '',
                    roomTypeName: roomType.roomTypeName || '',
                    numberOfRooms: roomType.numberOfRooms || '',
                    minAvailable,
                    amenities:roomType.generalAmenities,
                    images: images || [],
                    rateType: rateType || []
                   
                });
            } else {
                calculatedData.push({
                    roomTypeId: roomType.roomTypeId || '',
                    baseRate:roomType.baseRate || '',
                    baseAdult:roomType.baseAdult || '',
                    baseChild:roomType.baseChild || '',
                    maxAdult:roomType.maxAdult || '',
                    maxChild:roomType.maxChild || '',
                    maxOccupancy:roomType.maxOccupancy || '',
                    roomTypeName: roomType.roomTypeName || '',
                    numberOfRooms: roomType.numberOfRooms || '',
                    minAvailable: roomType.numberOfRooms || '',
                    amenities:roomType.generalAmenities,
                    images: images || [], 
                    rateType: rateType || []
                  
                });
            }
        }

        return res.status(200).json({ data: calculatedData });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const generateDateRange = (startDate, endDate) => {
    const dateRange = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateRange.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
};

module.exports = fetchRoomTypesHandler;
