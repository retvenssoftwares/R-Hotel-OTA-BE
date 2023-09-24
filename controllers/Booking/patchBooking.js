const express = require('express');
const router = express.Router();
const booking = require('../../models/Bookings/bookingPending'); // Import the Mongoose model

module.exports= async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        // Get the updated data from the request body
        const {
            bookingStatus,
            paymentStatus
        } = req.body;

        // Create an object with the updated data
        const updatedbookingdata = {
            bookingStatus,
            paymentStatus
        };


        
        // Find the booking by bookingId and update it
        const updatedBooking = await booking.findOneAndUpdate(
            { bookingId }, // Find by bookingid
            updatedbookingdata, // Update with the new data
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'booking not found' });
        }
//
        res.status(200).json({ message: 'booking updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

