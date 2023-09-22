const express = require('express');
const router = express.Router();
const Property = require('../../models/Onboarding/propertys'); // Import the Mongoose model
const RoomType = require("../../models/Rooms/roomTypeDetails");
const roomImage = require("../../models/Images/roomTypeImages");
const admin = require("../../models/Onboarding/registrations");
const inventoryModel = require("../../models/manageInventory/manageInventory")
const randomstring = require("randomstring");


// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const { userId, propertyId, description, numberOfRooms, bedType, roomSize, smoking, roomType, roomName, SessionId } = req.body;

        const userProfile = await admin.findOne({ userId: userId })
        console.log(userId)
        const user = await Property.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "do not have any property" });
        }

        const property = await Property.findOne({ propertyId: propertyId });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        // Check if the provided propertyId exists in the user's properties
        const userproperty = userProfile.Property.find(prop => prop.propertyId === propertyId);
        if (!userproperty) {
            return res.status(404).json({ message: "Property not found in user's profile" });
        }

        const { sessionId } = userProfile

        if (sessionId !== SessionId) {
            return res.status(404).json({ message: "session id not match" })
        }
        // Create a new user using the Mongoose model
        const newroom = new RoomType({
            roomTypeId: randomstring.generate(8),
            propertyId,
            numberOfRooms: [{ numberOfRooms: numberOfRooms }],
            bedType,
            roomSize: [{
                roomSize: roomSize,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            smoking: [{
                smoking: smoking,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            roomType: [{
                roomType: roomType,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            roomName: [{
                roomName: roomName,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            description: [{
                description: description,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedProperty = await newroom.save();
        const { roomTypeId } = savedProperty

        //push roomTypeId in Property schema
        property.roomType.push({ roomTypeId: roomTypeId });
        await property.save();

        const image = new roomImage({
            propertyId: propertyId,
            roomTypeId: roomTypeId
        });
        await image.save();

        const createInventory = new inventoryModel({
            propertyId: propertyId,
            roomTypeId: roomTypeId,
            Inventory: [{
                baseInventory: numberOfRooms,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }]
        })

        await createInventory.save();
        res.status(201).json({ message: 'room type added  successfully', roomTypeId: roomTypeId });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


