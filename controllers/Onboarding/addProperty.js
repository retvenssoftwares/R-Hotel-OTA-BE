const express = require('express');
const randomstring = require("randomstring");
const Property = require('../../models/Onboarding/propertys'); // Import the Mongoose model
const admin = require("../../models/Onboarding/registrations");
const propertyImage = require("../../models/Images/propertyImages");
const propertyLogs = require('../../models/Logs/logs');
const promotionModel = require('../../models/Promotion/promotion')
const rateAndReviewModel = require('../../models/Onboarding/ratingsAndReviews')


// Create a POST route for user registration
module.exports = async (req, res) => {
    let propertyId = '';
    let firstName;
    let lastName;
    let userRole;
    try {
        // Get user data from the request body
        const { userId, country, propertyAddress, propertyAddress1, postCode, city, latitude, longitude, SessionId } = req.body;

        const userProfile = await admin.findOne({ userId: userId })

        if (!userProfile) {
            return res.status(404).json({ message: "User Profile Not Found" })
        }
        const { sessionId } = userProfile
        // Capture user profile data here
        firstName = userProfile.firstName;
        lastName = userProfile.lastName;
        userRole = userProfile.role[0].role;
        if (sessionId !== SessionId) {
            return res.status(404).json({ message: "session id not match" })
        }

        // Create a new user using the Mongoose model
        const newProperty = new Property({
            userId,
            country,

            propertyAddress: [{
                propertyAddress: propertyAddress,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

            }],
            propertyAddress1: [{
                propertyAddress1: propertyAddress1,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],

            postCode: [{
                postCode: postCode,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

            }],
            city: [{
                city: city,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            location: [{
                latitude: latitude,
                longitude: longitude,
                modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            }],
            propertyId: randomstring.generate(8),
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedProperty = await newProperty.save();
        // console.log(savedProperty)
        propertyId = savedProperty.propertyId
        const image = new propertyImage({
            propertyId: propertyId
        });

        // Save the like to the "likes" collection
        await image.save();

        //save Propertyid in registration
        userProfile.Property.push({ propertyId: propertyId });
        await userProfile.save();

        const createLog = new propertyLogs({
            propertyId: propertyId,
            activities: [{
                employeeName: firstName + lastName,
                role: userRole,
                actionType: 'added property',
                statusCode: '201'
            }],
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        })
        await createLog.save();

        //create rating and review record
        const createRatingsAndReview = new rateAndReviewModel({
            propertyId: propertyId,
            ratingsAndReviews: [],
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        })

        await createRatingsAndReview.save();
        // Notify connected clients about the new amenity
        req.io.emit('newProperty', savedProperty);

        //create promotion record
        const createPromotion = new promotionModel({
            propertyId: propertyId,
            promotions: [],
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        })

        await createPromotion.save();

        res.status(201).json({ message: 'Property added  successfully', propertyId: savedProperty.propertyId });
    } catch (error) {
        if (propertyId) { // Check if propertyId is defined
            const createLog = new propertyLogs({
                propertyId: propertyId,
                activities: [{
                    employeeName: firstName + lastName,
                    role: userRole,
                    actionType: 'added property',
                    statusCode: '500'
                }],
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
            await createLog.save();
        }
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
};


