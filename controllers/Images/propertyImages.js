const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const multer = require('multer');
const upload = multer();
const hotelImagesModel = require("../../models/Images/propertyImages")
const roomImagesModel = require('../../models/Images/roomTypeImages')
const randomstring = require('randomstring');

const uploadRoomDetails = async (req, res) => {

  upload.fields([
    // { name: 'hotel_cover_photo', maxCount: 1 },
    { name: 'hotelImages', maxCount: 6 },
    { name: 'roomTypeImages',  maxCount: 6 },
    // { name: 'hotel_logo', maxCount: 1 }
  ])(req, res, async (err) => {
    try {

      const propertyId = req.body.propertyId
      const roomTypeId = req.body.roomTypeId
      const findHotel = await hotelImagesModel.findOne({ propertyId: propertyId })
      const findRoomTypes = await roomImagesModel.findOne({roomTypeId: roomTypeId});
      if (!findHotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      } 

      let hotel_images = [];
      if (req.files['hotelImages']) {
        for (const hotel_image of req.files['hotelImages']) {
          const hotel_image_id = randomstring.generate(10); // Generate a unique ID
          const hotel_image_params = {
            Bucket: 'rown-space-bucket/hotel_images',
            Key: hotel_image.originalname,
            Body: hotel_image.buffer,
            ContentType: hotel_image.mimetype,
            ACL: 'public-read'
          };
          await s3.upload(hotel_image_params).promise();
          const imageUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/hotel_images/${hotel_image.originalname}`;
          // Create an object with image details
          const imageDetails = {
            imageId: hotel_image_id,
            image: imageUrl,
            displayStatus: '1',
            imageDescription: ''
          };
          findHotel.propertyImages.push(imageDetails);
        //   console.log("1")
        }
        // console.log("2")
        await findHotel.save();
        res.status(200).json({
            message: "Hotel images successfully updated",
            propertyId: findHotel.propertyId
          });
      }

    //   console.log('3')
    if (req.files['roomTypeImages']) {
        for (const hotel_image of req.files['roomTypeImages']) {
          const hotel_image_id = randomstring.generate(10); // Generate a unique ID
          const hotel_image_params = {
            Bucket: 'rown-space-bucket/hotel_images',
            Key: hotel_image.originalname,
            Body: hotel_image.buffer,
            ContentType: hotel_image.mimetype,
            ACL: 'public-read'
          };
          await s3.upload(hotel_image_params).promise();
          const imageUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/hotel_images/${hotel_image.originalname}`;
          // Create an object with image details
          const imageDetails = {
            imageId: hotel_image_id,
            image: imageUrl,
            displayStatus: '1',
            imageDescription: ''
          };
          findRoomTypes.roomTypeImages.push(imageDetails);
        //   console.log("1")
        }
        // console.log("2")
        await findRoomTypes.save();
        res.status(200).json({
            message: "Room type images successfully updated",
            propertyId: findHotel.propertyId,
            roomTypeId: findRoomTypes.roomTypeId
          });
      }


      // Find the specific room_details entry within the hotel's room_details array based on room_type_id

      // Iterate over the properties of the roomtype object and push them to the rate_type array

      // Similarly, iterate over the properties of the rateplan object and push them to the rate_plan array

      

     
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }); // Added missing closing bracket for upload.fields
}

module.exports = uploadRoomDetails;
