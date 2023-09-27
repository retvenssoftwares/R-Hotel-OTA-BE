// const cron = require('node-cron');
// const pendingBookingModel = require('../models/Bookings/bookingPending');
// const bookingModel = require('../models/Bookings/bookings');
// const manageInventoryModel = require('../models/manageInventory/manageInventory')

// // Define a cron job pattern to run every 10 minutes
// const cronPattern = '*/10 * * * *';

// // Define the task you want to run
// const moveConfirmedBookingsTask = async () => {
//   try {
//     // Find all records in pendingBookingModel with bookingStatus "Confirmed"
//     const confirmedBookings = await pendingBookingModel.find({ bookingStatus: "Confirmed" });

//     if (confirmedBookings.length > 0) {
//       // Remove the records from pendingBookingModel
//       await pendingBookingModel.deleteMany({ bookingStatus: "Confirmed" });

//       // Insert the records into bookingModel
//       await bookingModel.insertMany(confirmedBookings);

//       console.log(`Moved ${confirmedBookings.length} confirmed bookings from pending to bookings.`, new Date().toLocaleTimeString());
//     } else {
//       console.log('No confirmed bookings to move.');
//     }
//   } catch (error) {
//     console.error('Error moving confirmed bookings:', error);
//   }
// };

// // Schedule the cron job to run the task every 10 minutes
// const scheduledTask = cron.schedule(cronPattern, moveConfirmedBookingsTask);

// // Start the cron job
// scheduledTask.start();

const cron = require('node-cron');
const pendingBookingModel = require('../models/Bookings/bookingPending');
const bookingModel = require('../models/Bookings/bookings');
const manageInventoryModel = require('../models/manageInventory/manageInventory');

// Define a cron job pattern to run every 5 minutes
const cronPattern = '*/5 * * * *';

// Define the task you want to run
const moveConfirmedBookingsTask = async () => {
  try {
    // Find all records in pendingBookingModel with bookingStatus "Confirmed"
    const confirmedBookings = await pendingBookingModel.find({ bookingStatus: "Confirmed" });

    if (confirmedBookings.length > 0) {
      // Collect check-in and check-out dates of the confirmed bookings
      const checkInDates = confirmedBookings.map(booking => booking.checkInDate);
      const checkOutDates = confirmedBookings.map(booking => booking.checkOutDate);

      // Collect roomTypeId(s) from the roomDetails array of all objects within the records
      const roomTypeIds = confirmedBookings.reduce((acc, booking) => {
        const roomDetails = booking.roomDetails || [];
        const roomTypeIdsInBooking = roomDetails.map(room => room.roomTypeId);
        return [...acc, ...roomTypeIdsInBooking];
      }, []);

      // Remove the records from pendingBookingModel
      await pendingBookingModel.deleteMany({ bookingStatus: "Confirmed" });

      // Insert the records into bookingModel
      await bookingModel.insertMany(confirmedBookings);

      console.log(`Moved ${confirmedBookings.length} confirmed bookings from pending to bookings.`);
      // console.log('Check-In Dates:', checkInDates);
      // console.log('Check-Out Dates:', checkOutDates);
      // console.log('Room Type IDs:', roomTypeIds);

      // Find records in manageInventory model with matching roomTypeId(s)
      const matchingInventoryRecords = await manageInventoryModel.find({ roomTypeId: { $in: roomTypeIds } });

      // console.log('Matching Inventory Records:', matchingInventoryRecords);

      // Iterate through matchingInventoryRecords and reduce inventory based on date intervals
      for (const booking of confirmedBookings) {
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);

        matchingInventoryRecords.forEach(record => {
          const inventoryEntries = record.manageInventory || [];
          inventoryEntries.forEach(entry => {
            const entryDate = new Date(entry.modifiedDate);
            if (entryDate >= checkInDate && entryDate <= checkOutDate) {
              // Calculate the reduction value based on the number of occurrences of the roomTypeId
              const roomTypeIdOccurrences = roomTypeIds.filter(id => id === record.roomTypeId).length;
              const reductionValue = roomTypeIdOccurrences;
              
              // Reduce the inventory value
              entry.inventory -= reductionValue;
            }
          });
        });
      }

      // Save the updated matchingInventoryRecords with reduced inventory
      await Promise.all(matchingInventoryRecords.map(record => record.save()));

      console.log('Inventory Reduction Completed.');
    } else {
      console.log('No confirmed bookings to move at ', new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    }
  } catch (error) {
    console.error('Error moving confirmed bookings:', error);
  }
};

// Schedule the cron job to run the task every 10 minutes
const scheduledTask = cron.schedule(cronPattern, moveConfirmedBookingsTask);

// Start the cron job
scheduledTask.start();
