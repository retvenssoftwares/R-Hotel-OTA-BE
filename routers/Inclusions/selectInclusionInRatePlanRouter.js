const { Router } = require('express');
const selectUnselectInclusions = require('../../controllers/Inclusions/selectInclusionsInRatePlan');
const app = Router();

app.patch('/selectInclusions/:ratePlanId',selectUnselectInclusions);
module.exports = app;