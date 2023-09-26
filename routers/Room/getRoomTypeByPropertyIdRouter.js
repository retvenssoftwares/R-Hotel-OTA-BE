const { Router } = require('express');
const getRoomType = require('../../controllers/Rooms/getRoomByPropertyId');
const app = Router();

app.get('/getRoomType/:propertyId',getRoomType);
module.exports = app;