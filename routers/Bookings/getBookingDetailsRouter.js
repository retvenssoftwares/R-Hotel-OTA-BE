const { Router } = require('express');
const getBookingData = require('../../controllers/Booking/getBookingDetails');
const app = Router();

app.get('/getBookingData/:bookingId',getBookingData);
module.exports = app;