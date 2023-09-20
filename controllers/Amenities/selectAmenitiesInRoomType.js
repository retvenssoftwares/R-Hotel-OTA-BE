const roomTypeModel = require('../../models/Onboarding/roomTypeDetails');

module.exports = async (req, res) => {
    try {
        const { amenityIds } = req.body; //  amenityIds in the request body

        // Find the room type by roomTypeId
        const roomType = await roomTypeModel.findOne({ roomTypeId: req.params.roomTypeId });

        if (!roomType) {
            return res.status(404).json({ message: "Room type not found" });
        }

        // Iterate through the amenityIds
        for (const amenityId of amenityIds) {
            // Check if the amenityId is already present in generalAmenities
            const existingAmenity = roomType.generalAmenities.find(item => item.amenitiesId === amenityId);

            if (!existingAmenity) {
                // If it doesn't exist, add it with isSelected as "true"
                roomType.generalAmenities.push({
                    amenitiesId: amenityId,
                    isSelected: 'true'
                })

            } else if (existingAmenity.isSelected === 'false') {
                existingAmenity.isSelected = 'true'
            }
            else {
                // If it exists, set isSelected to "false"
                existingAmenity.isSelected = 'false';
            }
        }


        // Save the updated room type document
        const updatedRoomType = await roomType.save();

        return res.status(200).json(updatedRoomType);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
