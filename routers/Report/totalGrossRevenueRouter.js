const { Router } = require('express');
const grossrevenue = require('../../controllers/Report/totalGrossRevenue');
const app = Router();

app.get('/totalGrossRevenue',grossrevenue);
module.exports = app;