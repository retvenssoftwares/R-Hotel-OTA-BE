const { Router } = require('express');
const fetchRoom = require('../../controllers/Rooms/getRoom');
const app = Router();

app.get('/getRoom/:roomTypeId',fetchRoom);
module.exports = app;