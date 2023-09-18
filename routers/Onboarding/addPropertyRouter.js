const { Router } = require('express');
const addProperty = require('../../controllers/Onboarding/addProperty');
const app = Router();

app.post('/addProperty',addProperty);
module.exports = app;