const { Router } = require('express');
const fetchRoomRatePlan = require('../../controllers/Rooms/getRatePlanById');
const app = Router();

app.get('/fetchRatePlanById/:ratePlanId',fetchRoomRatePlan);
module.exports = app;