const { Router } = require('express');
const addBooking = require('../../controllers/Booking/createBooking');
const app = Router();

 // Define the route for fetching inventory
app.post('/createBooking', addBooking.createBooking)
app.post("/cancelBooking/:bookingId",addBooking.cancelledBooking)

module.exports =  app