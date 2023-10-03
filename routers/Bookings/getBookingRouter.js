const { Router } = require('express');
const getBooking = require('../../controllers/Booking/getBooking');
const app = Router();

app.get('/getAllBooking',getBooking);
module.exports = app;