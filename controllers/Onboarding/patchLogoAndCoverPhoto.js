const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const multer = require('multer');
const upload = multer();
const hotelImagesModel = require("../../models/Onboarding/propertys")
const roomImagesModel = require('../../models/Images/roomTypeImages')
const randomstring = require('randomstring');

const uploadRoomDetails = async (req, res) => {

    upload.fields([
        // { name: 'hotel_cover_photo', maxCount: 1 },
        { name: 'hotelLogo', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 },
        // { name: 'hotel_logo', maxCount: 1 }
    ])(req, res, async (err) => {
        try {

            const propertyId = req.body.propertyId
            const findHotel = await hotelImagesModel.findOne({ propertyId: propertyId })
            //const findRoomTypes = await roomImagesModel.findOne({ roomTypeId: roomTypeId });
            if (!findHotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }


            if (req.files['hotelLogo']) {
                const uploadedImageIds = [];
                for (const hotel_image of req.files['hotelLogo']) {
                    const logoId = randomstring.generate(10); // Generate a unique ID
                    const date =new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
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
                    modifiedDate:date,
                    hotelLogoId: logoId,
                    hotelLogo: imageUrl,
                     
                    };

                    uploadedImageIds.push(logoId);
                    findHotel.hotelLogo.unshift(imageDetails);
                    //   console.log("1")
                }
                // console.log("2")
                await findHotel.save();
                res.status(200).json({
                    message: "Hotel logo ipload successfully ",
                    // propertyId: findHotel.propertyId,
                    // imageData: uploadedImageIds
                });
            }

            //   console.log('3')
            if (req.files['coverPhoto']) {
                const uploadedImageIds = [];
                for (const hotel_image of req.files['coverPhoto']) {
                    const coverId = randomstring.generate(10); // Generate a unique ID
                    const date =new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
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
                        modifiedDate:date,
                        coverPhotoId : coverId,
                        coverPhoto: imageUrl,
                        
                    };

                    uploadedImageIds.push(coverId);
                    findHotel.coverPhoto.unshift(imageDetails);
                    //   console.log("1")
                }
                // console.log("2")
                await findHotel.save();
                res.status(200).json({
                    message: "cover Photo upload successfully",
                    // propertyId: findHotel.propertyId,
                    // roomTypeId: findRoomTypes.roomTypeId,
                    // imageData: uploadedImageIds
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
    });
}

module.exports = uploadRoomDetails;
