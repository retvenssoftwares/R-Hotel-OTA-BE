const { Router } = require('express');
const rateType = require('../../controllers/Rooms/fetchRateTypeByRateId');
const app = Router();

app.get('/fetchRateType/:rateTypeId',rateType);
module.exports = app;