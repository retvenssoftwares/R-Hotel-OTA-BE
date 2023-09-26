const { Router } = require('express');
const updateRatePlan = require('../../controllers/Rooms/patchAddRoom');
const app = Router();

app.patch('/updateRatePlan/:ratePlanId',updateRatePlan);
module.exports = app;