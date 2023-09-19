const { Router } = require('express');
const rateType = require('../../controllers/Onboarding/addRateType');
const app = Router();

app.post('/addRateType',rateType);
module.exports = app;