const express = require('express');
const router = express.Router();
const signup = require('../../models/Onboarding/Registration'); // Import the Mongoose model

// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const { email, password, firstName, lastName, phoneNumber, date } = req.body;


        // Validate email format using a regular expression
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        // Check if the email already exists in the database
        const existingUser = await signup.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Ensure that the password meets your criteria (minimum 8 characters with uppercase, lowercase, special character, and number)
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error:
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number',
            });
        }
      
        // Create a new user using the Mongoose model
        const newUser = new signup({
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User registered successfully', email: savedUser.email,firstName:savedUser.firstName,lastName:savedUser.lastName,id:savedUser._id});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


