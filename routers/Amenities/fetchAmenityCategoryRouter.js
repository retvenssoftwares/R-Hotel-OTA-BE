const { Router } = require('express');
const fetchAmenitiesType = require('../../controllers/Amenities/fetchAmenityCategory');
const app = Router();

app.get('/fetchAmenityType/:category',fetchAmenitiesType);
module.exports = app;