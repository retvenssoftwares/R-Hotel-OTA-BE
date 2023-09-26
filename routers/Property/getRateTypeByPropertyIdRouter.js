const { Router } = require('express');
const getRateTypes = require('../../controllers/Property/getRateTypeByPropertyId');
const app = Router();

app.get('/getRateTypes/:propertyId',getRateTypes);
module.exports = app;