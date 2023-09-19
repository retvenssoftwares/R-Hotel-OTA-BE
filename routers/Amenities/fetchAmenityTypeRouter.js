const { Router } = require('express');
const fetchAmenitiesType = require('../../controllers/Amenities/fetchAmenityType');
const app = Router();

app.get('/fetchAmenityType/:category',fetchAmenitiesType);
module.exports = app;