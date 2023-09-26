const { Router } = require('express');
const updateInventory = require('../../controllers/manageInventory/patchInventory');
const app = Router();

app.patch('/updateInventory/:roomTypeId',updateInventory);
module.exports = app;