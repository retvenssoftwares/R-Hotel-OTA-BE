const { Router } = require('express');
const getcountry = require('../../controllers/location/getAllcountry');
const app = Router();
app.get('/countries', getcountry);
module.exports = app;


