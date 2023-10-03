
const express = require('express');
const router = express.Router();
const UserModel = require('../../models/Onboarding/registrations'); // Import your User model

// Define a route to get user data
module.exports = async (req, res) => {
  try {
    // Fetch user data from the database
    const users = await UserModel.find().select('-password');
    if(!users){
        return res.status(404).json({message: "No users found"})
    }

    // Return the user data as JSON response
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


