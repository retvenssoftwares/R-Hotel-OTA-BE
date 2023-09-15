const { Router } = require('express');
const registration = require('../../controllers/Onboarding/signUp');
const app = Router();

app.post('/signUp',registration);
module.exports = app;