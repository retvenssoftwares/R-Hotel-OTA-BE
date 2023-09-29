const { Router } = require('express');
const fetchRoomTypeList = require('../../controllers/Rooms/fetchroomTypeList');
const app = Router();

app.get('/fetchRoomTypeList',fetchRoomTypeList);
module.exports = app;