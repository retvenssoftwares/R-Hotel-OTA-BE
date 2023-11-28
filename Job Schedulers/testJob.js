
const cron = require('node-cron');
require("dotenv").config()
const pendingBookingModel = require('../models/Bookings/bookingPending');
const bookingModel = require('../models/Bookings/bookings');
const property = require("../models/Onboarding/propertys")
//const ratePlane = require("../models/Rooms/ratePlan")
//const manageInventoryModel = require('../models/manageInventory/manageInventory');
//const dumpInventoryModel = require('../models/manageInventory/dataDumpInventoryRates')
const nodeMailer = require("nodemailer")
const io = require('socket.io')();
// Define a cron job pattern to run every 5 minutes
const cronPattern = '*/5 * * * *';


async function sendResetLinkToMail(name, email, bookingId, location, gender, reservationId, ratePlan, guestPhone, checkInDate, checkOutDate, propertyDetails, bookingStatus, paymentStatus) {
  try {
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
      subject: `Booking Details for Booking ID: ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Hi ${name},</h2>
          <p>Here are your booking details:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Location</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${location}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Gender</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${gender}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Reservation ID</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${reservationId}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Rate Plan</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${ratePlan}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Guest Phone</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${guestPhone}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Check-In Date</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${checkInDate}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Check-Out Date</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${checkOutDate}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Property ID</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${propertyDetails}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Booking Status</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${bookingStatus}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;">Payment Status</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${paymentStatus}</td>
            </tr>
          </table>

          <p style="margin-top: 20px;">
            If you have any questions, feel free to <a href="https://www.retvensservices.com" style="text-decoration: none; color: #007bff;">contact us</a>.<br/>
            <img src="https://static.wixstatic.com/media/deab04_b9b37b349ee844a08386c5574cab99af~mv2.png/v1/crop/x_0,y_18,w_1141,h_449/fill/w_222,h_87,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/WIth%20out%20BG_edited.png" alt="Company Icon" style="margin-top: 20px; max-width: 150px; height: auto; display: block;" />
          </p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail has been sent");
      }
    });
  } catch (err) {
    console.log(err);
  }
}



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
    //  const matchingInventoryRecords = await manageInventoryModel.find({ roomTypeId: { $in: roomTypeIds } });

      // console.log('Matching Inventory Records:', matchingInventoryRecords);

      // Iterate through matchingInventoryRecords and reduce inventory based on date intervals
      // for (const booking of confirmedBookings) {
      //   const checkInDate = new Date(booking.checkInDate);
      //   const checkOutDate = new Date(booking.checkOutDate);

      //   // Iterate through matchingInventoryRecords for each booking
      //   for (const record of matchingInventoryRecords) {
      //     const inventoryEntries = record.manageInventory || [];
      //     const roomTypeIdOccurrences = roomTypeIds.filter((id) => id === record.roomTypeId).length;
      //     const reductionValue = roomTypeIdOccurrences;

      //     // Store updated inventory entries
      //     const updatedInventoryEntries = [];

      //     inventoryEntries.forEach((entry) => {
      //       const entryDate = new Date(entry.date);
      //       if (entryDate >= checkInDate && entryDate <= checkOutDate) {
      //         // Reduce the inventory value
      //         entry.inventory -= reductionValue;
      //         updatedInventoryEntries.push(entry);
      //         // console.log(entry.inventory);
      //       }
      //     });

      //     // Push the updated inventory entries into dataDumpInventoryRates
      //     if (reductionValue > 0 && updatedInventoryEntries.length > 0) {
      //       // Find the corresponding record in dataDumpInventoryRates
      //       const correspondingRecord = await dumpInventoryModel.findOne({ roomTypeId: record.roomTypeId });

      //       // Push the updated entries into its manageInventory array
      //       if (correspondingRecord) {
      //         correspondingRecord.manageInventory.push(...updatedInventoryEntries);
      //         await correspondingRecord.save();
      //         console.log(`Updated dataDumpInventoryRates for roomTypeId ${record.roomTypeId}`);
      //       }
      //     }
      //   }

        
      // }

      // for (const details of confirmedBookings){
      //   const mailbooking = await bookingModel.findOne({bookingId : details.bookingId})
      //   const propertyName = await property.findOne({propertyId:mailbooking.propertyId})
      //  // var {propertyDetails} = propertyName
      //   var propertyDetails = propertyName.propertyName && propertyName.propertyName.length > 0 ? propertyName.propertyName[0].propertyName : null;
      //   var { bookingId, checkInDate ,checkOutDate,bookingStatus,paymentStatus} = mailbooking
      //   if (details.roomDetails && details.roomDetails.length > 0) {
      //     for (const roomDetail of details.roomDetails) {
      //       const { guestFirstName, guestLastName, guestEmail, guestLocation , guestGender, reservationId , guestPhoneNumber } = roomDetail;
      //       const ratePlanedata = await ratePlane.findOne({ ratePlanId: roomDetail.ratePlanId });
      //       const ratePlanName = ratePlanedata.ratePlanName && ratePlanedata.ratePlanName.length > 0 ? ratePlanedata.ratePlanName[0].ratePlanName : null;
      //       var name = guestFirstName + ' ' + guestLastName;
      //       var email= guestEmail
      //       var location = guestLocation
      //       var gender = guestGender
      //       var reservationNumber = reservationId
      //       var ratePlan = ratePlanName
      //       var guestPhone= guestPhoneNumber 
      //       sendResetLinkToMail(name,email,bookingId,location,gender,reservationNumber,ratePlan,guestPhone,checkInDate,checkOutDate,propertyDetails, bookingStatus,paymentStatus);
      //     }
          
      //   }
      // }

      // Save the updated matchingInventoryRecords with reduced inventory
      await Promise.all(matchingInventoryRecords.map(record => record.save()));

      // io.emit("inventoryUpdate", matchingInventoryRecords)

     // console.log('Inventory Reduction Completed.'); // Replace with your actual query to get updated inventory

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

