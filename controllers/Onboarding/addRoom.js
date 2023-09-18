const express = require('express');
const router = express.Router();
const Property = require('../../models/Onboarding/propertys'); // Import the Mongoose model
const RoomType = require("../../models/Onboarding/roomTypeDetails");
const randomstring = require("randomstring");


// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const {propertyId,numberOfRooms,bedType,roomSize,smoking,roomType,roomName} = req.body;

        const property = await Property.findOne({ propertyId:propertyId });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
        // Create a new user using the Mongoose model
        const newroom = new RoomType({
            roomTypeId:randomstring.generate(8),
            propertyId,
            numberOfRooms,
            bedType,
            roomSize,
            smoking,
            roomType,
            roomName,
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });
    
        // Save the new user to the database
        const savedProperty = await newroom.save();
        const{roomTypeId } =savedProperty

        //push roomTypeId in Property schema
        property.roomType.push({ roomTypeId: roomTypeId });
        await property.save();

        res.status(201).json({ message: 'room type added  successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


