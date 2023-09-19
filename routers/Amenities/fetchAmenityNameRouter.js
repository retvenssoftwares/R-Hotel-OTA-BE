const { Router } = require('express');
const fetchAmenitiesName = require('../../controllers/Amenities/fetchAmenityName');
const app = Router();

app.get('/fetchAmenityName/:Type',fetchAmenitiesName);
module.exports = app;