const { Router } = require('express');
const randomProperty = require('../../controllers/Property/fetchRandomProperty');
const app = Router();

app.get('/fetchRandomProperty',randomProperty);
module.exports = app;