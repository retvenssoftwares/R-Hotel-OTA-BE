const express = require('express');
const router = express.Router();
const Property = require('../../models/Onboarding/propertys'); // Import the Mongoose model

module.exports= async (req, res) => {
    try {
        const propertyId = req.params.propertyId;

        // Get the updated data from the request body
        const {
            country,
            propertyAddress,
            propertyAddress1,
            postCode,
            city,
            latitude,
            longitude,
            propertyName,
            rating,
            propertyManagement,
            management,
            amenities,
            checkInTime,
            checkOutTime,
            serveBreakfast,
            isBreakfastIncluded,
            breakfastPricePerPerson,
            breakfastType,
            parkingAvailable,
            reserveParkingSpot,
            parkingLocation,
            parkingType,
            parkingPrice,
            allowChildren,
            allowPets,
            petsCharge
        } = req.body;

        // Create an object with the updated data
        const updatedPropertyData = {
            
            country,
            propertyAddress,
            propertyAddress1,
            postCode,
            city,
            latitude,
            longitude,
            propertyName,
            rating,
            propertyManagement,
            management,
            amenities,
            checkInTime,
            checkOutTime,
            serveBreakfast,
            isBreakfastIncluded,
            breakfastPricePerPerson,
            breakfastType,
            parkingAvailable,
            reserveParkingSpot,
            parkingLocation,
            parkingType,
            parkingPrice,
            allowChildren,
            allowPets,
            petsCharge
        };

        // Find the property by propertyId and update it
        const updatedProperty = await Property.findOneAndUpdate(
            { propertyId }, // Find by propertyId
            updatedPropertyData, // Update with the new data
            { new: true } // Return the updated document
        );

        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


