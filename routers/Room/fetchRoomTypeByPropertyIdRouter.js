const { Router } = require('express');
const fetchRoomType = require('../../controllers/Rooms/fetchRoomTypeByPropertyId');
const app = Router();

app.get('/fetchRoomType/:propertyId',fetchRoomType);
module.exports = app;