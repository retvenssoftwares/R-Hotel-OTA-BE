const { Router } = require('express');
const updateRates = require('../../controllers/manageInventory/patchRates');
const app = Router();

app.patch('/updateRates/:rateTypeId',updateRates);
module.exports = app;