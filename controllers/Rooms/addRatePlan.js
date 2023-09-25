const express = require('express');
const router = express.Router();
const Property = require("../../models/Onboarding/propertys");
const RatePlan = require("../../models/Rooms/ratePlan");
const RoomType = require("../../models/Rooms/roomTypeDetails");
const admin = require("../../models/Onboarding/registrations");
const randomstring = require("randomstring");


// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const {userId,propertyId,rateTypeId, inclusion, description, MLO, percentage, value, rateTypeName, startDate, endDate,priceIncrease, roomTypeId, SessionId } = req.body;

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
        const newroom = new RatePlan({
            ratePlanId: randomstring.generate(8),
            propertyId,
            roomTypeId,
            rateTypeId,
            inclusion,
            MLO:[{
                MLO:MLO,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            percentage:[{
                percentage:percentage,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            value:[{
                value:value,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            ratePlanName:[{
                ratePlanName:ratePlanName,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            startDate:[{
                startDate:startDate,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            endDate:[{
                endDate:endDate,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            description:[{
                description:description,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            priceIncrease:[{
                priceIncrease:priceIncrease,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedProperty = await newroom.save();


        res.status(201).json({ message: 'rate plan added  successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


