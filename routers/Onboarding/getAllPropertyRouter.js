const { Router } = require('express');
const getAllProperty = require('../../controllers/Onboarding/getAllProperty');
const app = Router();

app.get('/getAllProperty',getAllProperty);
module.exports = app;