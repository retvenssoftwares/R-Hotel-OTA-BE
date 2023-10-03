// Import necessary modules and your model
const reviewsModel = require("../../models/Onboarding/ratingsAndReviews");

// Define your GET API route
module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;

        // Find the document by propertyId
        const doc = await reviewsModel.findOne({ propertyId });

        if (!doc) {
            return res.status(404).json({ error: 'Property rating and review not found' });
        }

        // Get all objects in the ratingsAndReviews array
        const ratingsAndReviews = doc.ratingsAndReviews.map(review => {
            // Fetch the 0th object of the arrays within each review object
            const responseObject = {
                userId: review.userId,
                oneWordDescription: review.oneWordDescription,
                displayStatus: review.displayStatus,
                reviewDescription: review.reviewDescription,
                kindOfTrip: review.kindOfTrip,
            };

            if (review.overallRating.length > 0) {
                responseObject.overallRating = review.overallRating[0];
            }
            if (review.roomRating.length > 0) {
                responseObject.roomRating = review.roomRating[0];
            }
            if (review.serviceRating.length > 0) {
                responseObject.serviceRating = review.serviceRating[0];
            }
            if (review.locationRating.length > 0) {
                responseObject.locationRating = review.locationRating[0];
            }

            // Filter reviewImages objects with displayStatus '1'
            const reviewImagesWithStatusOne = review.reviewImages.filter(image => image.displayStatus === '1');

            // Add the filtered reviewImages to the response object
            responseObject.reviewImages = reviewImagesWithStatusOne;

            return responseObject;
        });

        return res.status(200).json(ratingsAndReviews);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
