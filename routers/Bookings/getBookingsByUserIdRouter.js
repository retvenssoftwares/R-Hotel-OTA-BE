const { Router } = require('express');
const getBookings = require('../../controllers/Booking/getBookingsByUserId');
const app = Router();

app.get('/getUserBookings/:userId',getBookings);
module.exports = app;