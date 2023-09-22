const { Router } = require('express');
const getratePlan = require('../../controllers/Onboarding/getRatePlanByRoomType');
const app = Router();

app.get('/getRatePlan/:roomTypeId',getratePlan);
module.exports = app;