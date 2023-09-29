const { Router } = require('express');
const getInventory = require('../../controllers/manageInventory/getInventoryByPropertyId');
const app = Router();

app.get('/getInventory/:propertyId',getInventory);
module.exports = app;