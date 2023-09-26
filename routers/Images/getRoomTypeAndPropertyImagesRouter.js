const { Router } = require('express');
const getRoomTypeImages = require('../../controllers/Images/getRoomTypeAndPropertyImages');
const app = Router();

app.get('/getRoomTypeImages/:roomTypeId',getRoomTypeImages.getRoomTypeImages);
app.get('/getPropertyImages/:propertyId',getRoomTypeImages.propertyImages)
//app.patch('/editRoomImageDescription', editImageDesc.editroomTypeImagesDesc);
module.exports = app;


