const {Router} =require('express')
const checkOutFetchBooking = require('../../controllers/Booking/fetchCheckOutPendingBookingByProperty');
const app = Router();

app.get('/checkOutPendingBooking/:propertyId',checkOutFetchBooking);
module.exports = app;