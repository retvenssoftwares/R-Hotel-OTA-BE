const manageInventory = require("../../models/manageInventory/manageInventory");
const roomDetails = require("../../models/Rooms/roomTypeDetails");

module.exports = async (req, res) => {
  const manageRoomsDetails = await manageInventory.find({
    propertyId: req.body.propertyId,
  });

  // console.log(manageRoomsDetails)

  // Sample date range
const fromDate = new Date('2023-09-01'); // Replace with your desired start date
const toDate = new Date('2023-09-30');   // Replace with your desired end date

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

console.log(roomTypeIdCounts);


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

   return res.status(200).json({data})
  }
};
