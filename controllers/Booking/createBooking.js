const randomstring = require('randomstring');
const bookingModel = require('../../models/Bookings/bookingPending');
const propertyModel = require('../../models/Onboarding/propertys');
const inventoryModel = require('../../models/manageInventory/manageInventory');

module.exports = async (req, res) => {
    try {
        const { propertyId, checkInDate, checkOutDate, roomDetails, roomNights, totalRoomRate, totalTax, totalAmount, bookingStatus, paymentStatus, paymentMode, madeBy } = req.body;
        const findProperty = await propertyModel.find({ propertyId: propertyId });
        if (!findProperty) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Parse startDate as a Date object
        const checkInDateObj = new Date(checkInDate);

        // Get today's date
        const today = new Date();

        // Check if cinDate is older than today's date
        if (checkInDateObj < today) {
            return res.status(400).json({ message: "Check-in date must not be older than today's date" });
        }

        // Calculate the number of days in the date range
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

        if (dayDifference < 0) {
            return res.status(400).json({ message: "Check-out date cannot be before the check-in date" });
        }

        // Check if the inventory is blocked for the specified dates and room types
        const blockedDates = [];

        for (const roomDetail of roomDetails) {
            const roomTypeIdToCheck = roomDetail.roomTypeId;

            for (let i = 0; i <= dayDifference; i++) {
                const date = new Date(start);
                date.setDate(date.getDate() + i);
                const dateString = date.toISOString().split('T')[0];

                // Find the inventory entry for the given date and room type
                const inventoryEntry = findInventory.manageInventory.find(entry => entry.date === dateString && entry.inventory === roomTypeIdToCheck);

                if (inventoryEntry && inventoryEntry.isBlocked === 'true') {
                    blockedDates.push(dateString);
                }
            }
        }

        if (blockedDates.length > 0) {
            return res.status(400).json({ message: "Inventory is blocked for the following dates: " + blockedDates.join(", ") });
        }

        // Create entries for each date within the range
        for (let i = 0; i <= dayDifference; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);

            // Check if the day of the week is in the excluded list
            // const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            // if (excludedDays.includes(dayOfWeek)) {
            //     continue; // Skip updating inventory for excluded days
            // }
            const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format

            // Check if the date already exists in the inventory array
            const existingEntry = findInventory.manageInventory.find(entry => entry.date === dateString);

            if (existingEntry) {
                // If the date exists, update the inventory
                existingEntry.isBlocked = isBlocked;
                existingEntry.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                findDumpInventory.manageInventory.push({ date: dateString, inventory: baseInventory, isBlocked: isBlocked, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });

            } else {
                // If the date does not exist, add a new entry
                findInventory.manageInventory.push({ date: dateString, inventory: baseInventory, isBlocked: isBlocked, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
                findDumpInventory.manageInventory.push({ date: dateString, inventory: baseInventory, isBlocked: isBlocked, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
            }
        }

        //create booking record
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

        //save record
        await newBooking.save();
        return res.status(200).json({ message: "Booking saved", bookingId: newBooking.bookingId })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}
