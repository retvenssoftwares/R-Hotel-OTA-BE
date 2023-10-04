const {Router} =require('express')
const fetchPaymentData = require('../../controllers/Booking/fetchPaymentDataByCheckInAndOut');
const app = Router();

app.get('/getPaymentData/:propertyId',fetchPaymentData);
module.exports = app;