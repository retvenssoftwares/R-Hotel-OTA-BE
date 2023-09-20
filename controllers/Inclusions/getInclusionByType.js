const inclusionModel = require('../../models/Inclusions/inclusions')

module.exports = async (req, res) => {
    try {
        const findInclusion = await inclusionModel.find({ inclusionType: req.params.inclusionType }).select('inclusionId inclusionName inclusionType inclusionDescription')
        if (findInclusion) {
            return res.status(200).json(findInclusion)
        } else {
            return res.status(404).json({ message: "No inclusions found of this type" })
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}