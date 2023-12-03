const property = require('../../models/Onboarding/propertys');

module.exports = async (req, res) => {
    try {
        // Fetch 10 random properties from the database with selected fields
        const randomProperties = await property.aggregate([
            { $sample: { size: 10 } },
            {
                $project: {
                    propertyName: {
                        $ifNull: [
                            { $arrayElemAt: ["$propertyName.propertyName", 0] },
                            "" // If null or undefined, set to an empty string
                        ]
                    },
                    hotelLogo: {
                        $ifNull: [
                            { $arrayElemAt: ["$hotelLogo.hotelLogo", 0] },
                            "" // If null or undefined, set to an empty string
                        ]
                    },
                    coverPhoto: {
                        $ifNull: [
                            { $arrayElemAt: ["$coverPhoto.coverPhoto", 0] },
                            "" // If null or undefined, set to an empty string
                        ]
                    },
                    // Add other fields if needed
                }
            }
        ]);

        return res.status(200).json(randomProperties);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
