const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const multer = require('multer');
const upload = multer();
const ratingsAndReviewsModel = require("../../models/Onboarding/ratingsAndReviews")
const randomstring = require('randomstring');

const uploadHotelReview = async (req, res) => {

    upload.fields([
        // { name: 'hotel_cover_photo', maxCount: 1 },
        { name: 'reviewImages', maxCount: 6 },
        // { name: 'hotel_logo', maxCount: 1 }
    ])(req, res, async (err) => {
        try {

            const propertyId = req.params.propertyId
            const findHotelReview = await ratingsAndReviewsModel.findOne({ propertyId: propertyId })
            if (!findHotelReview) {
                return res.status(404).json({ error: 'Hotel review not found' });
            }

            if (req.files['reviewImages']) {
                for (const hotel_image of req.files['reviewImages']) {
                    const review_image_id = randomstring.generate(10); // Generate a unique ID
                    const hotel_image_params = {
                        Bucket: 'rown-space-bucket/review_images',
                        Key: hotel_image.originalname,
                        Body: hotel_image.buffer,
                        ContentType: hotel_image.mimetype,
                        ACL: 'public-read'
                    };
                    await s3.upload(hotel_image_params).promise();
                    const imageUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/review_images/${hotel_image.originalname}`;
                    // Create an object with image details
                    const imageDetails = {
                        imageId: review_image_id,
                        images: imageUrl,
                        displayStatus: '1'
                    };

                    // Push the new imageDetails at the beginning of the images array
                    findHotelReview.ratingsAndReviews.images.unshift(imageDetails);
                }
console.log("1")
                // Push the new data at the beginning of the respective arrays
                findHotelReview.ratingsAndReviews.overallRating.unshift({
                    overallRating: req.body.overallRating,
                    date: req.body.date
                });

                findHotelReview.ratingsAndReviews.roomRating.unshift({
                    roomRating: req.body.roomRating,
                    date: req.body.date
                });

                findHotelReview.ratingsAndReviews.serviceRating.unshift({
                    serviceRating: req.body.serviceRating,
                    date: req.body.date
                });
                console.log("2")
                findHotelReview.ratingsAndReviews.locationRating.unshift({
                    locationRating: req.body.locationRating,
                    date: req.body.date
                });

                findHotelReview.ratingsAndReviews.reviewDescription.unshift({
                    reviewDescription: req.body.reviewDescription,
                    date: req.body.date
                });

                // findHotelReview.ratingsAndReviews.images.push(imageDetails);
                findHotelReview.ratingsAndReviews.kindOfTrip = req.body.kindOfTrip || findHotelReview.ratingsAndReviews.kindOfTrip;
                findHotelReview.ratingsAndReviews.travelledWithWhom = req.body.travelledWithWhom || findHotelReview.ratingsAndReviews.travelledWithWhom;
                findHotelReview.ratingsAndReviews.oneWordDescription = req.body.oneWordDescription || findHotelReview.ratingsAndReviews.oneWordDescription;
                findHotelReview.ratingsAndReviews.displayStatus = req.body.displayStatus || findHotelReview.ratingsAndReviews.displayStatus;
                findHotelReview.ratingsAndReviews.userId = req.body.userId || findHotelReview.ratingsAndReviews.userId;
                console.log("3")
                await findHotelReview.save();
                res.status(200).json({
                    message: "Review added successfully",
                    propertyId: findHotelReview.propertyId,
                });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}

module.exports = uploadHotelReview;
