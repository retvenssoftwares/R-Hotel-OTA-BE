const express = require('express');
const router = express.Router();
const RoomType = require('../../models/Onboarding/roomTypeDetails'); // Import the Mongoose model

module.exports= async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;

        // Get the updated data from the request body
        const {
            description,
            numberOfRooms, 
            bedType,
             roomSize, 
             smoking, 
             roomType, 
             roomName,
            baseAdult,
            baseChild,
            maxAdult,
            maxChild,
            maxOccupancy,
            baseRate,
            extraAdultRate,
            extraChildRate,
            generalAmenities
        } = req.body;

        // Create an object with the updated data
        const updatedroomData = {
            description,
            numberOfRooms, 
            bedType,
             roomSize, 
             smoking, 
             roomType, 
             roomName,
            baseAdult,
            baseChild,
            maxAdult,
            maxChild,
            maxOccupancy,
            baseRate,
            extraAdultRate,
            extraChildRate,
            generalAmenities
        };

        // Find the property by propertyId and update it
        const updatedRoom = await RoomType.findOneAndUpdate(
            { roomTypeId }, // Find by propertyId
            updatedroomData, // Update with the new data
            { new: true } // Return the updated document
        );

        if (!updatedRoom) {
            return res.status(404).json({ error: 'roomtype not found' });
        }
//
        res.status(200).json({ message: 'roomtype updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


