const { Router } = require('express');
const userProperties = require('../../controllers/Onboarding/getAllUserProperties');
const app = Router();

app.get('/userProperty/:userId',userProperties);
module.exports = app;