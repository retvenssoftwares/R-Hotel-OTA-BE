const { Router } = require('express');
const updateRatePlan = require('../../controllers/Rooms/patchRatePlan');
const app = Router();

app.patch('/updateRatePlan/:ratePlanId',updateRatePlan);
module.exports = app;