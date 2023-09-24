const { Router } = require('express');
const fetchAmenitiesType = require('../../controllers/Amenities/fetchAmenityType');
const app = Router();

app.get('/fetchAmenityType/:type/:propertyId',fetchAmenitiesType);
module.exports = app;