const { Router } = require('express');
const topProperties = require('../../controllers/Property/getTopSixProperties');
const app = Router();

app.get('/topProperties',topProperties);
module.exports = app;