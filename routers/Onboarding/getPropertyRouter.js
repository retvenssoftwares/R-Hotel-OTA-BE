const { Router } = require('express');
const fetchProperty = require('../../controllers/Onboarding/getProperty');
const app = Router();

app.get('/getProperty/:propertyId',fetchProperty);
module.exports = app;