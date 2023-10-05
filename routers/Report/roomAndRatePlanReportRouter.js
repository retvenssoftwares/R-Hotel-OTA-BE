const { Router } = require('express');
const roomtypeReport = require('../../controllers/Report/roomAndRatePlanReport');
const app = Router();

app.get('/roomTypeReport/:propertyId',roomtypeReport);
module.exports = app;