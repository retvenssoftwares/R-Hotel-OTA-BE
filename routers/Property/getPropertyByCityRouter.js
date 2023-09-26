const { Router } = require('express');
const getPropertyByCity = require('../../controllers/Property/getPropertyByCity');
const app = Router();

app.get('/getPropertyByCity/:city',getPropertyByCity);
module.exports = app;