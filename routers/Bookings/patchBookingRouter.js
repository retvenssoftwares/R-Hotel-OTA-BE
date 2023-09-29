const { Router } = require('express');
const updateBooking = require('../../controllers/Booking/patchBooking');
const app = Router();

app.patch('/patchBooking/:bookingId',updateBooking);
module.exports = app;