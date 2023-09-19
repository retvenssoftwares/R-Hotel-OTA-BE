const { Router } = require('express');
const ratePlan = require('../../controllers/Onboarding/addRatePlan');
const app = Router();

app.post('/addRatePlan',ratePlan);
module.exports = app;