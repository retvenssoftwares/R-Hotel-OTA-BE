const { Router } = require('express');
const fetchInclusionsByType = require('../../controllers/Inclusions/getInclusionByType');
const app = Router();

app.get('/fetchInclusions/:inclusionType/:ratePlanId',fetchInclusionsByType);
module.exports = app;