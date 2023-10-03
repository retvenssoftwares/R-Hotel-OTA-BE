// Import necessary modules and your model
const reviewsModel = require("../../models/Onboarding/ratingsAndReviews");

// Define your patch API route
module.exports = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const userId = req.params.userId;

        // Find the document by propertyId
        const doc = await reviewsModel.findOne({ propertyId });

        if (!doc) {
            return res.status(404).json({ error: 'Property rating and review not found' });
        }

        // Find the specific review object in ratingsAndReviews that matches the userId
        const reviewObject = doc.ratingsAndReviews.find(obj => obj.userId === userId);

        if (!reviewObject) {
            return res.status(404).json({ error: 'Review object not found for the specified user' });
        }

        //edit overall rating
        if (req.body.overallRating) {
            reviewObject.overallRating.unshift({
                overallRating: req.body.overallRating,
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
        }

        //edit roomRating rating
        if (req.body.roomRating) {
            reviewObject.roomRating.unshift({
                roomRating: req.body.roomRating,
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
        }

        //edit serviceRating rating
        if (req.body.serviceRating) {
            reviewObject.serviceRating.unshift({
                serviceRating: req.body.serviceRating,
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
        }

         //edit locationRating rating
         if (req.body.locationRating) {
            reviewObject.locationRating.unshift({
                locationRating: req.body.locationRating,
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
        }

     //edit reviewDescription rating
     if (req.body.reviewDescription) {
        reviewObject.reviewDescription.unshift({
            reviewDescription: req.body.reviewDescription,
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        });
    }

    if (req.body.displayStatus) {
        // Update displayStatus based on the value provided in the request body
        reviewObject.displayStatus = req.body.displayStatus;
    }

        // Set the displayStatus of an image to '0' by its imageId
        if (req.body.imageId) {
            const imageId = req.body.imageId;
            const imageToUpdate = reviewObject.reviewImages.find(image => image.imageId === imageId);

            if (imageToUpdate) {
                // Set displayStatus to '0'
                imageToUpdate.displayStatus = '0';
            }
        }

        // Save the updated document
        await doc.save();

        return res.status(200).json({
            message: 'Review updated successfully',
            propertyId: doc.propertyId,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
