const { Router } = require('express');
const getRate = require('../../controllers/manageInventory/getRateByPropertyId');
const app = Router();

app.get('/getRate',getRate);
module.exports = app;