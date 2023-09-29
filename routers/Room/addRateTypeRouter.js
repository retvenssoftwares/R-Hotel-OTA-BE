const { Router } = require('express');
const rateType = require('../../controllers/Rooms/addRateType');
const app = Router();

app.post('/addRateType',rateType);
module.exports = app;