const { Router } = require('express');
const getPromotion = require('../../controllers/Promotion/getPromotionByPropertyId');
const app = Router();

app.get('/getPromotion/:propertyId',getPromotion);
module.exports = app;
