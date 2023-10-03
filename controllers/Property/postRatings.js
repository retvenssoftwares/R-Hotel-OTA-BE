const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const multer = require('multer');
const upload = multer();
const reviewsModel = require("../../models/Onboarding/ratingsAndReviews");
const randomstring = require('randomstring');

const uploadPropertyReview = async (req, res) => {
    upload.fields([
        { name: 'reviewImages', maxCount: 6 },
    ])(req, res, async (err) => {
        try {
            const propertyId = req.params.propertyId;

            // Find the document by propertyId
            const doc = await reviewsModel.findOne({ propertyId });

            if (!doc) {
                return res.status(404).json({ error: 'Property rating and review not found' });
            }
            // const { overallRating, roomRating, serviceRating,locationRating,  } = req.body
            if (req.files['reviewImages']) {
                const uploadedImageIds = [];
                const uploadPromises = [];

                // Create a new review object for each set of uploaded images
                const newReviewObject = {
                    userId: req.body.userId,
                    oneWordDescription: req.body.oneWordDescription,
                    displayStatus: '1',
                    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
                    travelledWithWhom: req.body.travelledWithWhom,
                    overallRating: [{ overallRating: req.body.overallRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    roomRating: [{ roomRating: req.body.roomRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    serviceRating: [{ serviceRating: req.body.serviceRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    locationRating: [{ locationRating: req.body.locationRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    reviewDescription: [{ reviewDescription: req.body.reviewDescription, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    kindOfTrip: req.body.kindOfTrip,
                    reviewImages: [] // Initialize the reviewImages array
                };

                for (const hotel_image of req.files['reviewImages']) {
                    const hotel_image_id = randomstring.generate(10); // Generate a unique ID
                    const hotel_image_params = {
                        Bucket: 'rown-space-bucket/hotel_images',
                        Key: hotel_image.originalname,
                        Body: hotel_image.buffer,
                        ContentType: hotel_image.mimetype,
                        ACL: 'public-read'
                    };

                    const uploadPromise = s3.upload(hotel_image_params).promise()
                        .then(() => {
                            const imageUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/hotel_images/${hotel_image.originalname}`;
                            // Create an object with image details
                            const imageDetails = {
                                imageId: hotel_image_id,
                                images: imageUrl,
                                displayStatus: '1'
                            };
                            uploadedImageIds.push(hotel_image_id);
                            // Push image details into the reviewImages array of the new review object
                            newReviewObject.reviewImages.push(imageDetails);
                        });
                    uploadPromises.push(uploadPromise);
                }

                // Wait for all image uploads to complete before proceeding
                await Promise.all(uploadPromises);

                // Your other code for updating fields...

                // Add the new review object to the beginning of the ratingsAndReviews array
                doc.ratingsAndReviews.unshift(newReviewObject);
            } else {
                // Create a new review object for each set of uploaded images
                const newReviewObject = {
                    userId: req.body.userId,
                    oneWordDescription: req.body.oneWordDescription,
                    displayStatus: '1',
                    overallRating: [{ overallRating: req.body.overallRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    roomRating: [{ roomRating: req.body.roomRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    serviceRating: [{ serviceRating: req.body.serviceRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    locationRating: [{ locationRating: req.body.locationRating, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    reviewDescription: [{ reviewDescription: req.body.reviewDescription, date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }],
                    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
                    travelledWithWhom: req.body.travelledWithWhom,
                    kindOfTrip: req.body.kindOfTrip,
                    reviewImages: [] // Initialize the reviewImages array
                };

                doc.ratingsAndReviews.unshift(newReviewObject);
            }

            // Save the updated document
            await doc.save();

            return res.status(200).json({
                message: 'Property rating and review updated successfully',
                propertyId: doc.propertyId,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}

module.exports = uploadPropertyReview;
