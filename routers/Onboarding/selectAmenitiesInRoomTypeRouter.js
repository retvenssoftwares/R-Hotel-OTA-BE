const { Router } = require('express');
const selectAmenityInRoom = require('../../controllers/Onboarding/selectAmenitiesInRoomType');
const app = Router();

app.patch('/selectAmenity/:roomTypeId',selectAmenityInRoom);
module.exports = app;