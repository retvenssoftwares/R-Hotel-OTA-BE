const randomstring = require('randomstring');
const bookingModel = require('../../models/Bookings/bookingPending');


module.exports.createBooking = async (req, res) => {
  try{
    const {
        propertyId,
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
        createdAt,
        timeStamp
      } = req.body;
    
      const bookingId =randomstring.generate(10)

       // Modify roomDetails to include unique reservationIds
    const modifiedRoomDetails = roomDetails.map(detail => ({
        ...detail,
        reservationId: randomstring.generate(15),
      }));

      // Create a new booking instance
    const newBooking = new bookingModel({
        bookingId:bookingId,
        propertyId,
        checkInDate,
        checkOutDate,
        roomDetails: modifiedRoomDetails,
        roomNights,
        totalRoomRate,
        totalTax,
        totalAmount,
        bookingStatus,
        paymentStatus,
        paymentMode,
        madeBy,
        createdAt,
        timeStamp
      });
  
      // Save the new booking to the database
      const savedBooking = await newBooking.save();
  
      res.status(201).json({message:"booking save successful"});
  }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
















const { parse, format } = require("date-fns");
const booking = require("../../models/Bookings/bookings");
// const manageInventory = require("../../models/ManageInventory"); // Import the ManageInventory model

module.exports.cancelledBooking = async (req, res) => {
    const bookingId = req.params.bookingId;

    try {
        // Find the original booking based on bookingId
        const originalBooking = await booking.findOne({ bookingId: bookingId });

        if (!originalBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Check if the booking is eligible for cancellation (e.g., before check-in date)
        const current = new Date();
        const formattedDate = format(current, "yyyy-MM-dd");
        const checkInDate = originalBooking.checkInDate;
        const refund = req.body.refund;

        if (checkInDate <= formattedDate) {
            return res
                .status(500)
                .json({ message: "Booking cannot be cancelled after check-in" });
        }

        // Extract roomTypeId(s) from the roomDetails array
        const roomTypeIds = originalBooking.roomDetails.map(
            (roomDetail) => roomDetail.roomTypeId
        );

        // Count the occurrences of each roomTypeId
        const roomTypeIdCounts = {};
        roomTypeIds.forEach((roomTypeId) => {
            roomTypeIdCounts[roomTypeId] =
                (roomTypeIdCounts[roomTypeId] || 0) + 1;
        });

        // Find records in the manageInventory collection with matching roomTypeIds
        const inventoryRecords = await inventoryModel.find({
            roomTypeId: { $in: roomTypeIds },
        });


        //  function to update the inventory for a single record
        const updateInventoryForRecord = async (record, roomTypeIdCounts, checkInDate, checkOutDate) => {
            // Filter the manageInventory items that fall within the date range
            const updatedManageInventory = record.manageInventory.map(manageInventoryItem => {
                if (
                    manageInventoryItem.date >= checkInDate &&
                    manageInventoryItem.date <= checkOutDate
                ) {
                    // Increase inventory based on the count of occurrences
                    const count = roomTypeIdCounts[record.roomTypeId];
                    manageInventoryItem.inventory = String(
                        Number(manageInventoryItem.inventory) + parseInt(count)
                    );
                }
                return manageInventoryItem;
            });

            // Find the corresponding record in the dumpInventoryModel
            const dumpInventoryRecord = await dumpInventoryModel.findOne({
                roomTypeId: record.roomTypeId, // Assuming 'roomTypeId' is the field that identifies the room type
            });

            if (dumpInventoryRecord) {
                // Push the updated manageInventory items into the array in the dumpInventoryModel record
                await dumpInventoryModel.updateOne(
                    { _id: dumpInventoryRecord._id }, // Use the appropriate identifier field
                    { $push: { manageInventory: { $each: updatedManageInventory } } }
                );
            
        };


        // Update the record with the modified manageInventory
        record.manageInventory = updatedManageInventory;
        await record.save();
    };

    // Loop through each inventory record and update inventory
    for (const record of inventoryRecords) {
        await updateInventoryForRecord(record, roomTypeIdCounts, checkInDate, originalBooking.checkOutDate);
    }

    // Create a new record in the cancelBooking collection
    const cancelledBooking = new cancelBooking({
        bookingId: originalBooking.bookingId,
        userId: originalBooking.userId,
        propertyId: originalBooking.propertyId,
        checkInDate: originalBooking.checkInDate,
        checkOutDate: originalBooking.checkOutDate,
        roomDetails: originalBooking.roomDetails,
        roomNights: originalBooking.roomNights,
        totalRoomRate: originalBooking.totalRoomRate,
        totalTax: originalBooking.totalTax,
        totalAmount: originalBooking.totalAmount,
        bookingStatus: originalBooking.bookingStatus,
        paymentStatus: originalBooking.paymentStatus,
        paymentMode: originalBooking.paymentMode,
        madeBy: originalBooking.madeBy,
        createdAt: originalBooking.createdAt,
        timeStamp: originalBooking.timeStamp,
        refundStatus: refund,
    });

    // Save the cancelled booking
    await cancelledBooking.save();
    await booking.deleteOne({ bookingId: bookingId });

    return res.status(200).json({ message: "Booking cancelled" });
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
}
}

