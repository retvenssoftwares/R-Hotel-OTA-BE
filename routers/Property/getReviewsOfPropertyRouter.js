const { Router } = require('express');
const getReviews = require('../../controllers/Property/getReviewsOfProperty');
const app = Router();

app.get('/getHotelReviews/:propertyId',getReviews);
module.exports = app;