const {Router} =require('express')
const fetchCheckInBooking = require('../../controllers/Booking/fetchCheckInBookingByPropertyId');
const app = Router();

app.get('/fetchBooking/:propertyId',fetchCheckInBooking);
module.exports = app;