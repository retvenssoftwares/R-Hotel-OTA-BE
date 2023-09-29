const { Router } = require('express');
const fetchBedName = require('../../controllers/Rooms/getBedTypeName');
const app = Router();

app.get('/getBedName',fetchBedName);
module.exports = app;