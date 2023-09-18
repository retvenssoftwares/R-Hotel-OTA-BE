const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const multer = require('multer');
const upload = multer();
const hotelImagesSchema = require("../../models/Images/propertyImages")
const randomstring = require('randomstring');

const uploadPropertyImages = async (req, res) => {

    upload.fields([
        { name: 'hotelImages', maxCount: 1 }
    ])(req, res, async (err) => {
        try {

            const propertyId = req.params.propertyId
            const imageDescription = req.body.imageDescription
            //   const roomid = req.params.roomid
            const findHotel = await hotelImagesSchema.findOne({ propertyId: propertyId })
            if (!findHotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }

            let hotel_images = [];
            if (req.files['hotelImages']) {
                for (const hotel_image of req.files['hotelImages']) {
                    const hotel_image_id = randomstring.generate(10); // Generate a unique ID
                    // const display_status = '1'; // Set the display status
                    const hotel_image_params = {
                        Bucket: 'rown-space-bucket/hotel-images',
                        Key: hotel_image.originalname,
                        Body: hotel_image.buffer,
                        ContentType: hotel_image.mimetype,
                        ACL: 'public-read'
                    };
                    await s3.upload(hotel_image_params).promise();
                    const imageUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/hotel-images/${hotel_image.originalname}`;
                    // Create an object with image details
                    const imageDetails = {
                        imageId: hotel_image_id,
                        image: imageUrl,
                        displayStatus: '1',
                        imageDescription: imageDescription
                    };
                    findHotel.propertyImages.push(imageDetails);
                }
            }


            // console.log("request received")
            const {
                // propertyId,
                rate_type_id,
                room_type_id,
                room_type_name,
                rate_type_name,
                rate_plan_id,
                rate_plan_name,
                numberofrates,
                numberofrateplans,
            } = req.body;



            // Create and save the property record
            const room_id_and_name = new hotelImagesSchema({
                propertyId,
                propertyImages: 
            }
            )

            // Find the room_details array and append room_id_and_name to it
            // findHotel.hotel_images.push(hotel_images);

            // Save the updated hotel record




            // const hotel_id = req.params.hotel_id;
            // const roomid = req.params.roomid;
            // const findHotel = await Hotel.findOne({ hotel_id: hotel_id });



            if (!findHotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }





            await findHotel.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }

                res.status(200).json({
                    message: "Hotel successfully updated",
                    hotel_id: findHotel.hotel_id
                })
            })
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Internal Server Error" });

        }
    })
}
//7787055174
module.exports = uploadPropertyImages