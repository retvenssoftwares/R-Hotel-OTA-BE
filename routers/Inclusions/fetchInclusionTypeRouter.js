const { Router } = require('express');
const fetchInclusionsType = require('../../controllers/Inclusions/fetchInclusionType');
const app = Router();

app.get('/getInclusions',fetchInclusionsType);
module.exports = app;