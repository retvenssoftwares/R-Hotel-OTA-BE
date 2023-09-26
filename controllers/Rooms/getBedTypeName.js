//models path
const bedType = require('../../models/Rooms/bedTypes')

module.exports = async (req, res) => {
  try {
    const bedName = await bedType.find({}, { bedTypeName: 1, bedTypeId: 1, _id: 0 }).lean().exec();
    // Fetch all country names
    res.status(200).json(bedName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};