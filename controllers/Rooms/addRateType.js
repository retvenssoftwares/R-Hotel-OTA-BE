
const Property = require("../../models/Onboarding/propertys");
const rateModel = require("../../models/manageInventory/manageRates");
const RoomType = require("../../models/Rooms/roomTypeDetails");
const rateType = require("../../models/Rooms/rateType");
const admin = require("../../models/Onboarding/registrations");
const randomstring = require("randomstring");

// Create a POST route for user registration
module.exports = async (req, res) => {
    try {
        // Get user data from the request body
        const { userId, propertyId, roomTypeIds, name, inclusion, basePrice, roomType, taxIncluded, refundable, SessionId, date } = req.body;

        const userProfile = await admin.findOne({ userId: userId });
        const { sessionId } = userProfile;

        if (sessionId !== SessionId) {
            return res.status(404).json({ message: "Session ID does not match" });
        }

        // Define an array to store the promises for each roomType
        const promises = roomTypeIds.map(async (roomTypeId) => {
            const room = await RoomType.findOne({ roomTypeId });

            if (!room) {
                return { success: false, message: "RoomType not found" };
            }

            let rateTypeId = randomstring.generate(8);

            const newPlan = new rateType({
                rateTypeId: rateTypeId,
                propertyId,
                roomTypeId,
                name: [{
                    name: name,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }],
                inclusion: [{
                    inclusion: inclusion,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }],
                basePrice: [{
                    basePrice: basePrice,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }],
                roomType: [{
                    roomType: roomType,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }],
                taxIncluded: [{
                    taxIncluded: taxIncluded,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }],
                refundable: [{
                    refundable: refundable,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }],
                date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            });

            // Save the new user to the database
            await newPlan.save();

            // Use Mongoose to update the record and prepend the new object to the array
            const createRate = new rateModel({
                propertyId: propertyId,
                roomTypeId: roomTypeId,
                rateTypeId: rateTypeId,
                ratePrice: [{
                    basePrice: basePrice,
                    modifiedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }]
            });

            await createRate.save();
            
            return { success: true, message: 'Rate type added successfully' };
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Check if any of the promises failed
        const failedResult = results.find(result => !result.success);

        if (failedResult) {
            return res.status(404).json({ message: failedResult.message });
        }

        res.status(201).json({ message: 'All rate types added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
