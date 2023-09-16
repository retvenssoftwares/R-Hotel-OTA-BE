const { Router } = require('express');
const userlogin = require('../../controllers/accountCreation/login');
const app = Router();

app.post('/login',userlogin);
module.exports = app;