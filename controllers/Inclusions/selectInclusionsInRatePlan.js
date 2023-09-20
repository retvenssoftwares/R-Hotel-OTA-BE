// const inclusionModel = require('../../models/Inclusions/inclusions');
const ratePlanModel = require('../../models/Onboarding/rateType');

module.exports = async (req, res) => {
    try {
        const { inclusionIds } = req.body; //   inclusionids in the request body

        // Find the rateplan by ratePlanId
        const ratePlan = await ratePlanModel.findOne({ ratePlanId: req.params.ratePlanId });

        if (!ratePlan) {
            return res.status(404).json({ message: "Rate Plan not found" });
        }

        // Iterate through the amenityIds
        for (const inclusionId of inclusionIds) {
            // Check if the inclusionId is already present in inclusion array
            const existingInclusion = ratePlan.inclusion.find(item => item.inclusionId === inclusionId);

            if (!existingInclusion) {
                // If it doesn't exist, add it with isSelected as "true"
                ratePlan.inclusion.push({
                    inclusionId: inclusionId,
                    isSelected: 'true'
                })

            } else if (existingInclusion.isSelected === 'false') {
                existingInclusion.isSelected = 'true'
            }
            else {
                // If it exists, set isSelected to "false"
                existingInclusion.isSelected = 'false';
            }
        }


        // Save the updated room type document
        const updatedRatePlan = await ratePlan.save();

        return res.status(200).json(updatedRatePlan);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
