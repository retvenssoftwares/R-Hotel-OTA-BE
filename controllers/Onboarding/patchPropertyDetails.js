const express = require('express');
const router = express.Router();
const Property = require('../../models/Onboarding/propertys'); // Import the Mongoose model

module.exports = async (req, res) => {
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
            checkInFrom,
            checkInUntil,
            checkOutFrom,
            checkOutUntil,
            checkInTime,
            checkOutTime,
        } = req.body;

        // Create an object with the updated data


        // Create an object with the updated data
        const updatedFields = {};


        if (country) {
            const userlogin = await Property.updateOne({ propertyId }, { $set: { country: country } })
            // updatedFields.country = country;
        }



        if (propertyManagement) {
            const userlogin = await Property.updateOne({ propertyId }, { $set: { propertyManagement: propertyManagement } })
            // updatedFields.country = country;
        }
        if (management) {
            const userlogin = await Property.updateOne({ propertyId }, { $set: { management: management } })
            // updatedFields.country = country;
        }



        if (propertyAddress1) {
            updatedFields.propertyAddress1 = { $each: [{ propertyAddress1, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (propertyAddress) {
            updatedFields.propertyAddress = { $each: [{ propertyAddress, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        if (city) {
            updatedFields.city = { $each: [{ city, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }


        if (postCode) {
            updatedFields.postCode = { $each: [{ postCode, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        //checkin
        if (checkInFrom || checkInUntil) {
            const checkInTimeObject = {}; // Initialize an empty object
            if (checkInFrom) {
                checkInTimeObject.checkInFrom = checkInFrom;
            }
            if (checkInUntil) {
                checkInTimeObject.checkInUntil = checkInUntil;
            }
            checkInTimeObject.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            // Push the checkInTimeObject directly into the array
            updatedFields.checkInTime = { $each: [checkInTimeObject], $position: 0 };
        }

        //checkout
        if (checkOutFrom || checkOutUntil) {
            const checkOutTimeObject = {}; // Initialize an empty object
            if (checkOutFrom) {
                checkOutTimeObject.checkOutFrom = checkOutFrom;
            }
            if (checkOutUntil) {
                checkOutTimeObject.checkOutUntil = checkOutUntil;
            }
            checkOutTimeObject.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            // Push the checkOutTimeObject directly into the array
            updatedFields.checkOutTime = { $each: [checkOutTimeObject], $position: 0 };
        }

        //location
        if (latitude || longitude) {
            const locationObject = {}; // Initialize an empty object
            if (latitude) {
                locationObject.latitude = latitude;
            }
            if (longitude) {
                locationObject.longitude = longitude;
            }
            locationObject.modifiedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            // Push the locationObject directly into the array
            updatedFields.location = { $each: [locationObject], $position: 0 };
        }
        

        ///
        if (propertyName) {
            updatedFields.propertyName = { $each: [{ propertyName, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (rating) {
            updatedFields.rating = { $each: [{ rating, modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }
        // Find the property by propertyId and update it
        const updatedProperty = await Property.findOneAndUpdate(
            { propertyId }, // Find by propertyId

            {
                $push: updatedFields, // Push updated fields to arrays
            },
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


