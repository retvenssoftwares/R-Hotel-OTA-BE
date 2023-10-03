const { Router } = require('express');
const propertyRating = require('../../controllers/Property/postRatings');
const app = Router();

app.patch('/addPropertyRating/:propertyId', propertyRating);
module.exports = app;