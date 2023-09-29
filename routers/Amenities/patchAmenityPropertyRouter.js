const { Router } = require('express');
const patchAmenity = require('../../controllers/Amenities/patchAmenityProperty');
const app = Router();

app.patch('/patchAmenityProperty/:propertyId',patchAmenity);
module.exports = app;