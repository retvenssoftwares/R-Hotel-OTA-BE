const express = require('express');
const router = express.Router();
const Property = require("../../models/Onboarding/propertys");
const RatePlan = require("../../models/Rooms/ratePlan");
const RoomType = require("../../models/Rooms/roomTypeDetails");
const rateType = require("../../models/Rooms/rateType");
const admin = require("../../models/Onboarding/registrations");
const randomstring = require("randomstring");


// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const {userId,propertyId, roomTypeId, name, inclusion, basePrice, roomType, taxIncluded, refundable, SessionId,date} = req.body;

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
        const newplan = new rateType({
            rateTypeId: randomstring.generate(8),
            propertyId,
            roomTypeId,
        
            name:[{
                name:name,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
          
            inclusion:[{
                inclusion:inclusion,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
         
             basePrice:[{
                basePrice:basePrice,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
          
            roomType:[{
                roomType:roomType,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
           
            taxIncluded:[{
                taxIncluded:taxIncluded,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
           
            refundable:[{
                refundable:refundable,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
           
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedProperty = await newplan.save();


        res.status(201).json({ message: 'rate type added  successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


