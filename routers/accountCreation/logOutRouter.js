const { Router } = require('express');
const userlogout = require('../../controllers/accountCreation/logOut');
const app = Router();

app.post('/logout/:userId',userlogout);
module.exports = app;