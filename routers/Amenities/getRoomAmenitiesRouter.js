const { Router } = require('express');
const getRoomAmenities = require('../../controllers/Amenities/fetchRoomTypeAmenities');
const app = Router();

app.get('/getRoomAmenities/:type/:roomTypeId',getRoomAmenities);
module.exports = app;