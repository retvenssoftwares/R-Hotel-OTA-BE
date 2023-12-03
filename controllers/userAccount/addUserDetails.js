require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const userSignup = require('../../models/userAccount/userAccount'); // Import the Mongoose model
const iv = process.env.iv;

// Create a POST route for user registration or update if guestId found
module.exports = async (req, res) => {
    try {
        const { guestId } = req.params;
        // Get user data from the request body
        const { pwd, firstName, lastName, phoneNumber } = req.body;

        // Check if the guestId already exists in the database
        const existingUser = await userSignup.findOne({ guestId });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user information if guestId is found
        // Encrypt the password if a new password is provided
        if (pwd) {
            // Ensure that the password meets the criteria
            const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(pwd)) {
                return res.status(400).json({
                    error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number',
                });
            }
            const key = process.env.key;

            function encrypt(text) {
                const cipher = crypto.createCipheriv(
                    "aes-256-cbc",
                    Buffer.from(key, "hex"),
                    Buffer.from(iv)
                );
                let encrypted = cipher.update(text, "utf8", "hex");
                encrypted += cipher.final("hex");
                return encrypted;
            }

            const encryptedPassword = encrypt(pwd);
            existingUser.password = { pwd: encryptedPassword };
        }

        // Update other fields if provided
        if (firstName) {
            existingUser.firstName = firstName;
        }
        if (lastName) {
            existingUser.lastName = lastName;
        }
        if (phoneNumber) {
            existingUser.phoneNumber = phoneNumber;
        }

        // Save the updated user information to the database
        await existingUser.save();

        res.status(200).json({ message: 'User information updated successfully' }); 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};


