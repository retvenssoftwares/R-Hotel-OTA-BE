const { Router } = require('express');
const avg = require('../../controllers/Report/avgSellingPrice');
const app = Router();

app.get('/avgdata',avg);
module.exports = app;