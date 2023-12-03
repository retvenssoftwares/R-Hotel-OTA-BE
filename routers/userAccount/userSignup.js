const { Router } = require('express');
const signup = require('../../controllers/userAccount/userSignup');
const app = Router();

app.post('/userSignUp',signup);
module.exports = app;