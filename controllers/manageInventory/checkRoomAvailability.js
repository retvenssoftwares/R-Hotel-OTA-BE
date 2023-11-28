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
const roomTypeImage = require ('../../models/Images/roomTypeImages')

const fetchRoomTypesHandler = async (req, res) => {
    const { propertyId, startDate, endDate } = req.query;
    try {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (startDateObj > endDateObj) {
            return res.status(400).json({ message: "Check-in date cannot be greater than check-out date", statuscode: 400 });
        }

        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(startDate) || !dateFormatRegex.test(endDate)) {
            return res.status(400).json({ message: "Please enter the date in the correct format (yyyy-mm-dd)", statuscode: 400 });
        }

        const roomTypes = await roomTypeModel.aggregate([
            { $match: { propertyId } },
            {
                $project: {
                    roomTypeId: 1,
                    roomTypeName: { $arrayElemAt: ["$roomType.roomType", 0] },
                    numberOfRooms: { $arrayElemAt: ["$numberOfRooms.numberOfRooms", 0] },
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
                    roomTypeId: roomType.roomTypeId,
                    roomTypeName: roomType.roomTypeName,
                    numberOfRooms: roomType.numberOfRooms,
                    minAvailable,
                    images: images || [],
                });
            } else {
                calculatedData.push({
                    roomTypeId: roomType.roomTypeId,
                    roomTypeName: roomType.roomTypeName,
                    numberOfRooms: roomType.numberOfRooms,
                    minAvailable: roomType.numberOfRooms,
                    images: images || [], 
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
