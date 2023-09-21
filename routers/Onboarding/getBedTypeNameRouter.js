const { Router } = require('express');
const fetchBedName = require('../../controllers/Onboarding/getBedTypeName');
const app = Router();

app.get('/getBedName',fetchBedName);
module.exports = app;