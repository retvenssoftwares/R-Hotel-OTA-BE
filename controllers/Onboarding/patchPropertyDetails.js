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
            const userlogin = await Property.updateOne({ propertyId }, {$set: {country:country}})
            // updatedFields.country = country;
        }

        if (propertyAddress) {
            const userlogin = await Property.updateOne({ propertyId }, {$set: {propertyAddress:propertyAddress}})
            // updatedFields.country = country;
        }
        if (propertyAddress1) {
            const userlogin = await Property.updateOne({ propertyId }, {$set: {propertyAddress1:propertyAddress1}})
            // updatedFields.country = country;
        }
     
        if (propertyManagement) {
            const userlogin = await Property.updateOne({ propertyId }, {$set: {propertyManagement:propertyManagement}})
            // updatedFields.country = country;
        }
        if (management) {
            const userlogin = await Property.updateOne({ propertyId }, {$set: {management:management}})
            // updatedFields.country = country;
        }
       
        if (city) {
            updatedFields.city = { $each: [{ city,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}], $position: 0 };
        }

             
        if (postCode) {
            updatedFields.postCode = { $each: [{ postCode,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}], $position: 0 };
        }
  //checkin
        if (checkInFrom || checkInUntil) {
            const checkInTimeObject = {};
            if (checkInFrom) {
                checkInTimeObject.checkInFrom = checkInFrom;
            }
            if (checkInUntil) {
                checkInTimeObject.checkInUntil = checkInUntil;
            }
            updatedFields.checkInTime = { $each: [{checkInTimeObject,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}], $position: 0 };
        }

        //checkout
        if (checkOutFrom || checkOutUntil) {
            const checkOutTimeObject = {};
            if (checkOutFrom) {
                checkOutTimeObject.checkOutFrom = checkOutFrom;
            }
            if (checkOutUntil) {
                checkOutTimeObject.checkOutUntil = checkOutUntil;
            }
            updatedFields.checkOutTime = { $each: [{checkOutTimeObject,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}], $position: 0 };
        }
        //location
        if (latitude || longitude) {
            const locationObject = {};
            if (latitude) {
                locationObject.latitude = latitude;
            }
            if (longitude) {
                locationObject.longitude = longitude;
            }
            updatedFields.location = { $each: [{locationObject,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}], $position: 0 };
        }





        ///
        if (propertyName) {
            updatedFields.propertyName = { $each: [{ propertyName,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
        }

        if (rating) {
            updatedFields.rating = { $each: [{ rating,modifiedDate:new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }], $position: 0 };
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


