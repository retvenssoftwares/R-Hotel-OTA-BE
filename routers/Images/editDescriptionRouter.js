const { Router } = require('express');
const editImageDesc = require('../../controllers/Images/editImageDescription');
const app = Router();

app.patch('/editImageDescription', editImageDesc.editPropertyImagesDesc);
app.patch('/editRoomImageDescription', editImageDesc.editroomTypeImagesDesc);
module.exports = app;



