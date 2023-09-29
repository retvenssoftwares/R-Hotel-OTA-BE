const { Router } = require('express');
const getAmenities = require('../../controllers/Amenities/getAmenities');
const app = Router();

app.get('/getAmenities',getAmenities);
module.exports = app;