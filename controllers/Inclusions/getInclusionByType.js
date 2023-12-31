
const inclusionModel = require('../../models/Inclusions/inclusions');
const ratePlanModel = require('../../models/Rooms/ratePlan');

// Define a GET API route to fetch unique amenityType values based on amenityCategory
module.exports = async (req, res) => {
    const inclusionType = req.params.inclusionType;
    const ratePlanId = req.params.ratePlanId;

    try {
        // Retrieve all amenities from the amenities collection that match the specified category
        const allInclusions = await inclusionModel.find(
            { inclusionType: inclusionType },
            { inclusionId: 1, inclusionName: 1, inclusionType: 1, inclusionDescription: 1, isSelected: 1 }
        );

        if(!allInclusions){
            return res.status(404).json({message: "No inclusions found of this type."})
        }

        // Retrieve the amenities array for the specified propertyId
        const ratePlanInclusions = await ratePlanModel.findOne(
            { ratePlanId: ratePlanId },
            { inclusion: 1 }
        );
      

        // Create an array to store the results
        const result = [];
        if (ratePlanId === 'default') {
            // Loop through all amenities and determine their status based on property amenities
            for (const inclusionData of allInclusions) {
                const status = false;
                result.push({
                    inclusionName: inclusionData.inclusionName,
                    inclusionId: inclusionData.inclusionId,
                    inclusionDescription: inclusionData.inclusionDescription,
                    inclusionType: inclusionData.inclusionType,
                    status: status
                });
            }

            res.status(200).json(result);
        } else {
            // Loop through all amenities and determine their status based on property amenities
            if (!ratePlanInclusions) {
                return res.status(404).json({ error: "rate plan not found" });
            }
            for (const inclusionData of allInclusions) {
                const isSelected = ratePlanInclusions.inclusion.some(
                    (ratePlanIncusion) =>
                        ratePlanIncusion.inclusionId === inclusionData.inclusionId &&
                        ratePlanIncusion.isSelected === 'true'
                );

                // Determine the status based on isSelected
                const status = isSelected ? true : false;

                result.push({
                    inclusionName: inclusionData.inclusionName,
                    inclusionId: inclusionData.inclusionId,
                    inclusionDescription: inclusionData.inclusionDescription,
                    inclusionType: inclusionData.inclusionType,
                    status: status
                });
            }
            res.status(200).json(result);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
};
