
const cron = require('node-cron');
require("dotenv").config()
const pendingBookingModel = require('../models/Bookings/bookingPending');
const bookingModel = require('../models/Bookings/bookings');
const manageInventoryModel = require('../models/manageInventory/manageInventory');
const dumpInventoryModel = require('../models/manageInventory/dataDumpInventoryRates')
const io = require('socket.io')();
// Define a cron job pattern to run every 5 minutes
const cronPattern = '*/5 * * * *';


async function sendResetLinkToMail(fullName, email, link) {
  try {
    console.log(fullName, email);
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "For Reset Password",
      html:
        "<p> Hii  " +
        fullName +
        " Bookings details are" +
        
        "'> ",
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail has been sent");
      }
    });
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
}

// Define the task you want to run
const moveConfirmedBookingsTask = async () => {
  try {
    // Find all records in pendingBookingModel with bookingStatus "Confirmed"
    const confirmedBookings = await pendingBookingModel.find({ bookingStatus: "Confirmed" });

    for(const details of confirmedBookings){
      const firstname = details.roomDetails[0].guestFirstName
      const lastname = details.roomDetails[0].guestLastName
      var email = details.roomDetails[0].guestEmail
      var name = firstname + lastname
    }
   

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

        // Iterate through matchingInventoryRecords for each booking
        for (const record of matchingInventoryRecords) {
          const inventoryEntries = record.manageInventory || [];
          const roomTypeIdOccurrences = roomTypeIds.filter((id) => id === record.roomTypeId).length;
          const reductionValue = roomTypeIdOccurrences;

          // Store updated inventory entries
          const updatedInventoryEntries = [];

          inventoryEntries.forEach((entry) => {
            const entryDate = new Date(entry.date);
            if (entryDate >= checkInDate && entryDate <= checkOutDate) {
              // Reduce the inventory value
              entry.inventory -= reductionValue;
              updatedInventoryEntries.push(entry);
              // console.log(entry.inventory);
            }
          });

          // Push the updated inventory entries into dataDumpInventoryRates
          if (reductionValue > 0 && updatedInventoryEntries.length > 0) {
            // Find the corresponding record in dataDumpInventoryRates
            const correspondingRecord = await dumpInventoryModel.findOne({ roomTypeId: record.roomTypeId });

            // Push the updated entries into its manageInventory array
            if (correspondingRecord) {
              correspondingRecord.manageInventory.push(...updatedInventoryEntries);
              await correspondingRecord.save();
              console.log(`Updated dataDumpInventoryRates for roomTypeId ${record.roomTypeId}`);
            }
          }
        }

        sendResetLinkToMail(name, email);
      }

      // Save the updated matchingInventoryRecords with reduced inventory
      await Promise.all(matchingInventoryRecords.map(record => record.save()));

      io.emit("inventoryUpdate", matchingInventoryRecords)

      console.log('Inventory Reduction Completed.'); // Replace with your actual query to get updated inventory

    } else {
      console.log('No confirmed bookings to move at ', new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    }
  } catch (error) {
    console.error('Error moving confirmed bookings:', error);
  }
};

// Schedule the cron job to run the task every 5 minutes
const scheduledTask = cron.schedule(cronPattern, moveConfirmedBookingsTask);


// Start the cron job
scheduledTask.start();

