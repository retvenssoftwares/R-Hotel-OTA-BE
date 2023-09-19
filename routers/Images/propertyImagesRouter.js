const { Router } = require('express');
const uploadHotelImages = require('../../controllers/Images/propertyImages');
const app = Router();

app.patch('/postImages', uploadHotelImages);
module.exports = app;



