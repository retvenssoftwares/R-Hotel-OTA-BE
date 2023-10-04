const {Router} =require('express')
const checkInFetchBooking = require('../../controllers/Booking/fetchCheckInPendingBookingByProerty');
const app = Router();

app.get('/checkInPendingBooking/:propertyId',checkInFetchBooking);
module.exports = app;