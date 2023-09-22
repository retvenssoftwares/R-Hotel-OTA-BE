const { Router } = require('express');
const ratePlan = require('../../controllers/Rooms/getRatePlanByPropertyId');
const app = Router();

app.get('/fetchRatePlan/:propertyId',ratePlan);
module.exports = app;