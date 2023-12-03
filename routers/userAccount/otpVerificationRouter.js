const { Router } = require('express');
const verifyOtp = require('../../controllers/userAccount/otpVerification');
const app = Router();

app.post('/otpVerification',verifyOtp);
module.exports = app;