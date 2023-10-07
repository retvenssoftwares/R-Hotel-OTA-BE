const { Router } = require('express');
const editPromotion = require('../../controllers/Promotion/editPromotion');
const app = Router();

app.patch('/editPromotion/:promotionId', editPromotion);
module.exports = app;