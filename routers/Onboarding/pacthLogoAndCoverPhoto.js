const { Router } = require('express');
const uploadHotelImages = require('../../controllers/Onboarding/patchLogoAndCoverPhoto');
const app = Router();

app.patch('/patchImages', uploadHotelImages);
module.exports = app;