const { Router } = require('express');
const usersGet = require('../../controllers/accountCreation/getRegisteredUsers');
const app = Router();

app.get('/getRegisteredUsers',usersGet);
module.exports = app;