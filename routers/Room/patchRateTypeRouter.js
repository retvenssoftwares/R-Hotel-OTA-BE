const { Router } = require('express');
const updateRateType = require('../../controllers/Rooms/patchRateType');
const app = Router();

app.patch('/updateRateType',updateRateType);
module.exports = app;