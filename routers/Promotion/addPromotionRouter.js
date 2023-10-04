const { Router } = require('express');
const addPromotion = require('../../controllers/Promotion/addPromotion');
const app = Router();

app.post('/createPromotion/:propertyId', addPromotion);
module.exports = app;