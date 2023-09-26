const cron = require('node-cron');
const pendingBookingModel = require('../models/Bookings/bookingPending');
const bookingModel = require('../models/Bookings/bookings');

// Define a cron job pattern to run every 10 minutes
const cronPattern = '*/10 * * * *';

// Define the task you want to run
const moveConfirmedBookingsTask = async () => {
  try {
    // Find all records in pendingBookingModel with bookingStatus "Confirmed"
    const confirmedBookings = await pendingBookingModel.find({ bookingStatus: "Confirmed" });

    if (confirmedBookings.length > 0) {
      // Remove the records from pendingBookingModel
      await pendingBookingModel.deleteMany({ bookingStatus: "Confirmed" });

      // Insert the records into bookingModel
      await bookingModel.insertMany(confirmedBookings);

      console.log(`Moved ${confirmedBookings.length} confirmed bookings from pending to bookings.`, new Date().toLocaleTimeString());
    } else {
      console.log('No confirmed bookings to move.');
    }
  } catch (error) {
    console.error('Error moving confirmed bookings:', error);
  }
};

// Schedule the cron job to run the task every 10 minutes
const scheduledTask = cron.schedule(cronPattern, moveConfirmedBookingsTask);

// Start the cron job
scheduledTask.start();
