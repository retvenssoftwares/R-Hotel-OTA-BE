const express = require('express');
const router = express.Router();
const Property = require('../../models/Onboarding/propertys'); // Import the Mongoose model
const admin = require("../../models/Onboarding/Registration");
const crypto = require("crypto");
const randomstring = require("randomstring");


// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const {userId,country,propertyAddress,propertyAddress1,postCode,city,latitude,longitude,genVariable} = req.body;

        const userProfile = await admin.findOne({ userId:userId })

        if (!userProfile) {
            return res.status(404).json({ message: "User Profile Not Found" })
        }
        const { firstName, phoneNumber } = userProfile;
        const namePrefix = firstName.slice(0, 4);
        const phoneSuffix = phoneNumber.slice(-4);
        const generatedVariable = namePrefix + phoneSuffix;

    if(genVariable!==generatedVariable){
        return res.status(400).json({message:"invalid genvariable"})
    }


        // Create a new user using the Mongoose model
        const newProperty = new Property({
            userId,
            country,
            propertyAddress,
            propertyAddress1,
            postCode,
            city,
            latitude,
            longitude,
            propertyId:randomstring.generate(8),
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedProperty = await newProperty.save();

        res.status(201).json({ message: 'Property added  successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


