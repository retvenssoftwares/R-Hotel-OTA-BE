const express = require('express');
const router = express.Router();
const Property = require("../../models/Onboarding/propertys");
const RateType = require("../../models/Onboarding/rateType");
const RoomType = require("../../models/Onboarding/roomTypeDetails");
const ratePlan = require("../../models/Onboarding/ratePlan");
const admin = require("../../models/Onboarding/registrations");
const randomstring = require("randomstring");


// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const {userId,propertyId, roomTypeId, rateTypeId, name, inclusion, rateType, roomType, taxIncluded, refundable, startDate,endDate, SessionId,date} = req.body;

        const userProfile = await admin.findOne({ userId: userId })
        const room = await RoomType.findOne({ roomTypeId: roomTypeId });
        if (!room) {
            return res.status(404).json({ message: "RoomType not found" });
        }
        const { sessionId } = userProfile

        if (sessionId !== SessionId) {
            return res.status(404).json({ message: "session id not match" })
        }
        // Create a new user using the Mongoose model
        const newplan = new ratePlan({
            ratePlanId: randomstring.generate(8),
            propertyId,
            roomTypeId,
            rateTypeId,
            name,
            inclusion,
            rateType,
            roomType,
            taxIncluded,
            refundable,
            startDate,
            endDate,
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedProperty = await newplan.save();


        res.status(201).json({ message: 'rate Plan added  successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


