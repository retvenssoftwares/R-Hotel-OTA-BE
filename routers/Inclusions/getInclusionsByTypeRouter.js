const { Router } = require('express');
const fetchInclusionsByType = require('../../controllers/Inclusions/getInclusionByType');
const app = Router();

app.get('/fetchInclusions/:inclusionType',fetchInclusionsByType);
module.exports = app;