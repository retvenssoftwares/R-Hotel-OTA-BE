const { Router } = require('express');
const updateRoomType = require('../../controllers/Rooms/patchAddRoom');
const app = Router();

app.patch('/updateRoomType/:roomTypeId',updateRoomType);
module.exports = app;