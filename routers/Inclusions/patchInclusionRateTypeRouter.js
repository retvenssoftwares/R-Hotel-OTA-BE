const { Router } = require('express');
const patchInclusion = require('../../controllers/Inclusions/patchInclusionRateType');
const app = Router();

app.patch('/patchInclusionRateType/:rateTypeId',patchInclusion);
module.exports = app;