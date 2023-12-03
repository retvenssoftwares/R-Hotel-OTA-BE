const {Router} =require('express')
const userDetail = require('../../controllers/userAccount/addUserDetails')
const app =Router()
 app.patch('/userDetails/:guestId',userDetail);
 module.exports =app;