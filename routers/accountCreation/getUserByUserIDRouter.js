const { Router } = require('express');
const usersGetById = require('../../controllers/accountCreation/getRegisteredUsers');
const app = Router();

app.get('/getRegisteredUsers/:userId',usersGetById);
module.exports = app;