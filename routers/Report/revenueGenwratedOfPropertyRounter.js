const { Router } = require('express');
const getRevenue = require('../../controllers/Report/revenueGeneratedOfProperty');
const app = Router();

app.get('/getRevenueDetails',getRevenue);
module.exports = app;