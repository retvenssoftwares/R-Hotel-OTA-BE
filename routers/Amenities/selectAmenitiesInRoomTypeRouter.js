const { Router } = require('express');
const selectAmenityInRoom = require('../../controllers/Amenities/selectAmenitiesInRoomType');
const app = Router();

app.patch('/selectAmenity/:roomTypeId',selectAmenityInRoom);
module.exports = app;