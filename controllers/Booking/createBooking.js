const randomstring = require('randomstring');
const bookingModel = require('../../models/Bookings/bookingPending');
const propertyModel = require('../../models/Onboarding/propertys');
const inventoryModel = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const { userId, propertyId, checkInDate, checkOutDate, roomDetails, roomNights, totalRoomRate, totalTax, totalAmount, bookingStatus, paymentStatus, paymentMode, madeBy } = req.body;
        const findProperty = await propertyModel.find({ propertyId: propertyId });
        if (!findProperty) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Get today's date as a string in "yyyy-mm-dd" format
        const today = new Date().toISOString().split('T')[0];

        // Parse checkInDate and checkOutDate as Date objects
        const checkInDateObj = new Date(checkInDate).toISOString().split('T')[0];
        const checkOutDateObj = new Date(checkOutDate).toISOString().split('T')[0];

        // Check if checkInDate or checkOutDate is older than today's date
        if (checkInDateObj < today || checkOutDateObj < today) {
            return res.status(400).json({ message: "Check-in or check-out date must not be older than today's date" });
        }

        //check in date must not be equal to checkout date
        if (checkInDateObj === checkOutDateObj) {
            return res.status(400).json({ message: "Check-in date and check-out date must not be equal" });
        }

        // Calculate the number of days in the date range
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

        if (dayDifference < 0) {
            return res.status(400).json({ message: "Check out date cannot be before the check-in date" });
        }

        // Check if the inventory is blocked for the specified dates and room types
        for (const roomDetail of roomDetails) {
            const roomTypeIdToCheck = roomDetail.roomTypeId;

            for (let i = 0; i <= dayDifference; i++) {
                const date = new Date(start);
                date.setDate(date.getDate() + i);
                const dateString = date.toISOString().split('T')[0];

                // Find the inventory entry for the given date and room type
                const inventoryEntry = await inventoryModel.findOne({
                    roomTypeId: roomTypeIdToCheck,
                    'manageInventory.date': dateString
                });

                if (inventoryEntry && inventoryEntry.manageInventory) {
                    const matchingDateEntry = inventoryEntry.manageInventory.find(entry => entry.date === dateString && entry.isBlocked === 'true');
                    if (matchingDateEntry) {
                        return res.status(400).json({ message: `Inventory is blocked for room type ${roomTypeIdToCheck} on ${dateString}` });
                    }
                }
            }
        }

        // Create an object to keep track of roomTypeId counts
        const roomTypeCounts = {};

        // Count the number of roomTypeIds in roomDetails
        for (const roomDetail of roomDetails) {
            const roomTypeId = roomDetail.roomTypeId;

            if (!roomTypeCounts[roomTypeId]) {
                roomTypeCounts[roomTypeId] = 1;
            } else {
                roomTypeCounts[roomTypeId]++;
            }
        }

        // Check if check-in and check-out dates are in the manageInventory for all room types
        for (const roomTypeIdToCheck in roomTypeCounts) {
            const datesToCheck = [checkInDateObj, checkOutDateObj];

            for (const dateToCheck of datesToCheck) {
                const inventoryEntry = await inventoryModel.findOne({
                    roomTypeId: roomTypeIdToCheck,
                    'manageInventory.date': dateToCheck
                });

                if (!inventoryEntry || !inventoryEntry.manageInventory.some(entry => entry.date === dateToCheck)) {
                    return res.status(400).json({ message: `Inventory not added for room type ${roomTypeIdToCheck} on ${dateToCheck}` });
                }

                // Get the available inventory count for this date and room type
                const matchingDateEntry = inventoryEntry.manageInventory.find(entry => entry.date === dateToCheck);
                const availableInventory = parseInt(matchingDateEntry.inventory);

                // Check if there's enough inventory for the current roomTypeId
                if (roomTypeCounts[roomTypeIdToCheck] > availableInventory || availableInventory === 0) {
                    return res.status(400).json({ message: `Not enough inventory available for room type ${roomTypeIdToCheck} on ${dateToCheck}` });
                }
            }
    
            // Create booking record
            const newBooking = new bookingModel({
                propertyId,
                bookingId: randomstring.generate(8),
                checkInDate,
                checkOutDate,
                roomDetails,
                roomNights,
                totalRoomRate,
                totalTax,
                totalAmount,
                bookingStatus,
                paymentStatus,
                paymentMode,
                madeBy,
                createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
    
            // Save record
            await newBooking.save();
            // io.emit('newBooking', newBooking);
            return res.status(200).json({ message: "Booking saved", bookingId: newBooking.bookingId });
            
        } 
        const currentTime = new Date();
        const timestamp = Math.floor(currentTime / 1000);
        // Create a new Date object from the timestamp (in milliseconds)
        // const date = new Date(timestamp * 1000);

        // Format the date as a string
        // const formattedDate = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        // console.log(formattedDate)
        // Create booking record
        const newBooking = new bookingModel({
            propertyId,
            bookingId: randomstring.generate(8),
            checkInDate,
            checkOutDate,
            roomDetails,
            roomNights,
            userId,
            totalRoomRate,
            totalTax,
            totalAmount,
            bookingStatus,
            paymentStatus,
            paymentMode,
            madeBy,
            timeStamp: timestamp,
            createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        });

        // Save record
        await newBooking.save();
        return res.status(200).json({ message: "Booking saved", bookingId: newBooking.bookingId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
};
