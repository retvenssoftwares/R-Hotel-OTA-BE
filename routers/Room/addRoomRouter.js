const { Router } = require('express');
const room = require('../../controllers/Rooms/addRoom');
const app = Router();

app.post('/addRoom',room);
module.exports = app;