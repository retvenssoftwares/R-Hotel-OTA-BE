const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({
    propertyId: {
        default: "",
        type: String
    },
    ratingsAndReviews: [{
        userId: { type: String, default: '' },
        overallRating: [{
            overallRating: { type: String, default: '' },
            date: { type: String, default: '' }
        }],
        roomRating: [{ roomRating: { type: String, default: '' }, date: { type: String, default: '' } }],
        serviceRating: [{ serviceRating: { type: String, default: '' }, date: { type: String, default: '' } }],
        locationRating: [{ locationRating: { type: String, default: '' }, date: { type: String, default: '' } }],
        reviewDescription: [{ reviewDescription: { type: String, default: '' }, date: { type: String, default: '' } }],
        kindOfTrip: { type: String, default: '', enum: ['Business', 'Vacation',''] },
        travelledWithWhom: { type: String, default: '', enum: ['Friends', 'Family', 'Solo', 'Couple',''] },
        oneWordDescription: { type: String, default: '' },
        displayStatus: { type: String, default: '1' },
        reviewImages: [{
            imageId: { type: String, default: '' },
            images: { type: String, default: '' },
            displayStatus: { type: String, default: '1' }
        }],
        date: {
            type: String
        },
    }],
    date: {
        type: String
    },
})

const propertyRatings = mongoose.model('ratingsandreviews', ratingsSchema);
module.exports = propertyRatings;