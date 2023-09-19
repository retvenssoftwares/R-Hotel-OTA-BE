const { Router } = require('express');
const updateRoomType = require('../../controllers/Onboarding/patchAddRoom');
const app = Router();

app.patch('/updateRoomType/:roomTypeId',updateRoomType);
module.exports = app;