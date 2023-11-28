const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/manageInventory/getInventoryByPropertyId'); // Adjust the path as needed

module.exports = (io) => {
    // Define the route for fetching inventory
    router.get('/getInventory', inventoryController)

    return router;
};
