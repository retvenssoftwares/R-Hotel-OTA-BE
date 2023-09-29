//models path
const roomTypeList = require('../../models/Rooms/roomTypesList')

 module.exports=async (req, res) => {
  try {
    const getRoomTypeList = await roomTypeList.find({}).lean().exec(); 
    // Fetch all country names
    res.status(200).json(getRoomTypeList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
