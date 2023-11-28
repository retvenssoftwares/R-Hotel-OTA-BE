const { Router } = require('express');
const checkAvailabilityRoom = require('../../controllers/manageInventory/checkRoomAvailability');
const app = Router();

app.get('/checkRoomAvailability',checkAvailabilityRoom);
module.exports = app;