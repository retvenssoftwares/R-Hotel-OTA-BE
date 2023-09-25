const { Router } = require('express');
const updateRates = require('../../controllers/manageInventory/patchRates');
const app = Router();

app.patch('/updateRates/:roomTypeId',updateRates);
module.exports = app;