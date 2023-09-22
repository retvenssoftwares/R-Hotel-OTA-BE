const { Router } = require('express');
const addBooking = require('../../controllers/Booking/createBooking');
const app = Router();

app.post('/createBooking',addBooking);
module.exports = app;