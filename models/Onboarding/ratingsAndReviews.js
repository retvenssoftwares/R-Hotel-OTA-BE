const mongoose = require('mongoose');


const ratingsSchema = new mongoose.Schema({

    propertyId: {
        default: "",
        type: String
    },
    ratingsAndReviews: [{
        userId: { type: String, default: '' },
        overallRating: { type: String, default: '' },
        roomRating: { type: String, default: '' },
        serviceRating: { type: String, default: '' },
        locationRating: { type: String, default: '' },
        reviewDescription: { type: String, default: '' },
        kindOfTrip: { type: String, default: '', enum: ['Business', 'Vacation'] },
        travelledWithWhom: { type: String, default: '', enum: ['Friends', 'Family', 'Solo', 'Couple'] },
        oneWordDescription: { type: String, default: ''},
    }],
    date: {
        type: String
    },
})

const propertyRatings = mongoose.model('ratingsandreviews', ratingsSchema);
module.exports = propertyRatings;