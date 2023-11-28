const { Router } = require('express');
const updateInventory = require('../../controllers/manageInventory/patchInventory');
const app = Router();

app.patch('/updateInventory',updateInventory);
module.exports = app;