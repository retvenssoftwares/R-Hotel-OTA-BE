const {Router} =require('express')
const cancelledFetchBooking = require('../../controllers/Booking/fetchCancelledBookings');
const app = Router();

app.get('/getCancelledBookings',cancelledFetchBooking);
module.exports = app;