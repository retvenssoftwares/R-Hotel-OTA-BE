const { Router } = require('express');
const ratePlan = require('../../controllers/Rooms/addRatePlan');
const app = Router();

app.post('/addRatePlan',ratePlan);
module.exports = app;