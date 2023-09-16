const { Router } = require('express');
const registration = require('../../controllers/accountCreation/signUp');
const app = Router();

app.post('/signUp',registration);
module.exports = app;



