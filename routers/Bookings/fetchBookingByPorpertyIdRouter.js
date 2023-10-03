const {Router} =require('express')
const fetchBooking = require('../../controllers/Booking/fetchCheckInBookingByPropertyId');
const app = Router();

app.get('/fetchBooking/:propertyId',fetchBooking);
module.exports = app;