const { Router } = require('express');
const patchHotelReview = require('../../controllers/Property/postRatings');
const app = Router();

app.patch('/addPropertyRating/:propertyId', patchHotelReview);
module.exports = app;