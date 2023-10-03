const manageInventory = require("../../models/manageInventory/manageInventory");
const roomDetails = require("../../models/Rooms/roomTypeDetails");
const images = require('../../models/Images/roomTypeImages')
const { parse, format } = require("date-fns");

module.exports = async (req, res) => {
  const manageRoomsDetails = await manageInventory.find({
    propertyId: req.body.propertyId, isBlocked : "false"
});

  const dateFormat = "yy-mm-dd"; // Use "yy-MM-dd" format
  
  const from = req.query.from;
  const to = req.query.to;
  
  // Assuming "from" and "to" are in the format "yy-mm-dd", you can parse them like this:
  const fromDate = parse(from, dateFormat, new Date());
  const toDate = parse(to, dateFormat, new Date());   // Replace with your desired end date

  const roomTypeIdCounts = {};

manageRoomsDetails.forEach((item) => {
    const { roomTypeId, manageInventory } = item;

    // Filter the manageInventory items within the date range
    const filteredInventory = manageInventory.filter((inventoryItem) => {
        const modifiedDate = new Date(inventoryItem.modifiedDate);
        return modifiedDate >= fromDate && modifiedDate <= toDate;
    });

    // Calculate the count for the filtered inventory items
    const count = filteredInventory.length;

    if (!roomTypeIdCounts[roomTypeId]) {
        roomTypeIdCounts[roomTypeId] = 0;
    }

    roomTypeIdCounts[roomTypeId] += count;
});




  let minKey = null;
  let minValue = Infinity;
  
  for (const key in roomTypeIdCounts) {
      if (roomTypeIdCounts.hasOwnProperty(key)) {
          const value = roomTypeIdCounts[key];
          if (value < minValue) {
              minKey = key;
              minValue = value;
          }
      }
  }
  console.log(minKey , minValue)

  if(minValue >= 0){

   const data = await roomDetails.findOne({roomTypeId : minKey })
   const getimages = await images.findOne({roomTypeId : minKey})


   //return res.status(200).json({data})

   const add = {
    roomType: (data.roomType && data.roomType[0] && data.roomType[0].roomType) || "",
    number_of_rooms: (data.numberOfRooms && data.numberOfRooms[0] && data.numberOfRooms[0].numberOfRooms) || "",
    maxOccupancy: (data.maxOccupancy && data.maxOccupancy[0] && data.maxOccupancy[0].maxOccupancy) || "",
    images: (getimages.roomTypeImages && getimages.roomTypeImages[0] && getimages.roomTypeImages[0].image) || ""
};

   return res.status(200).json({add})
   
   
  }
};
