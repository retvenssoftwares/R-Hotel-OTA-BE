const { Router } = require('express');
const getRate = require('../../controllers/manageInventory/getRateByPropertyId');
const app = Router();

app.get('/getRate/:propertyId',getRate);
module.exports = app;