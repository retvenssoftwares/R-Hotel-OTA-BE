const cron = require('node-cron');
const pendingBookingModel = require('../models/Bookings/bookingPending');
// const bookingModel = require('../models/Bookings/bookings');
// const manageInventoryModel = require('../models/manageInventory/manageInventory');
// const dumpInventoryModel = require('../models/manageInventory/dataDumpInventoryRates')
const io = require('socket.io')();
//job to remove old pending booking records
const removeOldBookings = async () => {
    try {

        const currentTime = Math.floor(new Date() / 1000); // Convert to seconds
        const twentyFourHoursAgo = currentTime - 24 * 60 * 60;
        //  console.log("current time ", currentTime)
        // Calculate the date and time 24 hours ago from the current time

        //  console.log(twentyFourHoursAgo)
        // Remove booking records with createdAt timestamps older than 24 hours
        const bookings = await pendingBookingModel.deleteMany({
            bookingStatus: "Pending",
            timeStamp: { $lt: twentyFourHoursAgo },
        });
        if (bookings.deletedCount > 0) {
            console.log('Old booking records removed successfully.');
        } else {
            console.log('No bookings to delete at: ', new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))
        }


    } catch (error) {
        console.error('Error removing old booking records:', error);
    }
};
// Schedule the job for running every 10 mins
const deleteBookingJob = cron.schedule('*/10 * * * *', removeOldBookings);


// Start the cron job
deleteBookingJob.start();
