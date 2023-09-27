const { Router } = require('express');
const rateType = require('../../controllers/Rooms/getRateTypesByRoomId');
const app = Router();

app.get('/fetchRateTypes/:roomTypeId',rateType);
module.exports = app;