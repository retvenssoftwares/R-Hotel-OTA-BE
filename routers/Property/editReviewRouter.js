const { Router } = require('express');
const editProperty = require('../../controllers/Property/editReview');
const app = Router();

app.patch('/editReview/:propertyId/:userId',editProperty);
module.exports = app;