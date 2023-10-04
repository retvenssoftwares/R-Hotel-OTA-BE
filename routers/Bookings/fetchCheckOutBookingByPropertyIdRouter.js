const {Router} =require('express')
const fetchBooking = require('../../controllers/Booking/fetchCheckOutBookingByPropertyId');
const app = Router();

app.get('/CheckOutBooking/:propertyId',fetchBooking);
module.exports = app;