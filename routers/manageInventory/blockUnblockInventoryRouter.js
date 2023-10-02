const { Router } = require('express');
const blockUnblockInventory = require('../../controllers/manageInventory/blockUnBlockInventory');
const app = Router();

app.patch('/blockUnblockInventory/:roomTypeId', blockUnblockInventory);
module.exports = app;