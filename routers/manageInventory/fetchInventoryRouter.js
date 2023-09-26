const { Router } = require('express');
const getInventory = require('../../controllers/manageInventory/fetchInventoryBydate');
const app = Router();

app.get('/fetchInventoryFilter',getInventory);
module.exports = app;