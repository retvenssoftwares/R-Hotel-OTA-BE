const { Router } = require('express');
const city = require('../../controllers/Onboarding/fetchCityOfProperty');
const app = Router();

app.get('/propertycity',city);
module.exports = app;