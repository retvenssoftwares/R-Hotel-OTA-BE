const { Router } = require('express');
const addBooking = require('../../controllers/Booking/createBooking');
const app = Router();

 // Define the route for fetching inventory
app.post('/createBooking', addBooking)

module.exports =  app