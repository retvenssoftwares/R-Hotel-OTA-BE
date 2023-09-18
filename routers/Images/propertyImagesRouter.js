const { Router } = require('express');
const postPropertyImages = require('../../controllers/Images/propertyImages');
const app = Router();

app.post('/postPropertyImages/:propertyId',postPropertyImages);
module.exports = app;



