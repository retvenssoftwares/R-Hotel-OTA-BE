


const express = require('express');
const router = express.Router();
const RoomType = require('../../models/Rooms/roomTypeDetails'); // Import the Mongoose model

module.exports = async (req, res) => {
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
        const updatedFields = {};

        if (description) {
            updatedFields.description = { $each: [{ description, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (numberOfRooms) {
            updatedFields.numberOfRooms = { $each: [{ numberOfRooms,modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (bedType) {
            updatedFields.bedType = { $each: [{ bedType }], $position: 0 };
        }

        if (roomSize) {
            updatedFields.roomSize = { $each: [{ roomSize,modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (smoking) {
            updatedFields.smoking = { $each: [{ smoking, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (roomType) {
            updatedFields.roomType = { $each: [{ roomType, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (roomName) {
            updatedFields.roomName = { $each: [{ roomName, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (baseAdult) {
            updatedFields.baseAdult = { $each: [{ baseAdult, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (baseChild) {
            updatedFields.baseChild = { $each: [{ baseChild, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (maxAdult) {
            updatedFields.maxAdult = { $each: [{ maxAdult,modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (maxChild) {
            updatedFields.maxChild = { $each: [{ maxChild, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (maxOccupancy) {
            updatedFields.maxOccupancy = { $each: [{ maxOccupancy, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (baseRate) {
            updatedFields.baseRate = { $each: [{ baseRate, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (extraAdultRate) {
            updatedFields.extraAdultRate = { $each: [{ extraAdultRate, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (extraChildRate) {
            updatedFields.extraChildRate = { $each: [{ extraChildRate, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (generalAmenities) {
            updatedFields.generalAmenities = { $each: [{ generalAmenities }], $position: 0 };
        }


        // Find the property by roomTypeId and update it
        const updatedRoom = await RoomType.findOneAndUpdate(
            { roomTypeId }, // Find by roomTypeId
            {
                $push: updatedFields, // Push updated fields to arrays
            },
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
