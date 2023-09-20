const { Router } = require('express');
const fetchRoom = require('../../controllers/Onboarding/getRoom');
const app = Router();

app.get('/getRoom/:roomTypeId',fetchRoom);
module.exports = app;