const { Router } = require('express');
const updateProperty = require('../../controllers/Onboarding/patchPropertyDetails');
const app = Router();

app.patch('/updateProperty/:propertyId',updateProperty);
module.exports = app;