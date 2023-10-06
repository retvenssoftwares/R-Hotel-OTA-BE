const manageInventory = require("../../models/manageInventory/manageInventory");
const managerates = require("../../models/manageInventory/manageRates");
const roomDetails = require("../../models/Rooms/roomTypeDetails");
const roomImages = require("../../models/Images/roomTypeImages");
const { parse, max } = require("date-fns");

module.exports = async (req, res) => {
  const from = req.query.from;
  console.log(from)
  const to = req.query.to;

  // Find manageInventory items within the date range
  const filteredManageInventory = await manageInventory.find({
    propertyId: req.body.propertyId,
    "manageInventory.isBlocked": "false",
    "manageInventory.date": {
      $gte: from,
      $lte: to,
    },
  });

//   const rate = await managerates.find({
//     propertyId: req.body.propertyId,
//     "manageRate.date": {
//       $gte: from,
//       $lte: to,
//     },
//   });


//   console.log(rate)

  // Initialize an object to store minimum inventory values by roomTypeId
  const minInventoryByRoomTypeId = {};

  // Group inventory items by roomTypeId and find the minimum value
  filteredManageInventory.forEach((item) => {
    const { roomTypeId, manageInventory } = item;

    if (!minInventoryByRoomTypeId[roomTypeId]) {
      minInventoryByRoomTypeId[roomTypeId] = Number.MAX_SAFE_INTEGER;
    }

    manageInventory.forEach((inventoryItem) => {
      const inventory = parseFloat(inventoryItem.inventory);
      if (!isNaN(inventory)) {
        minInventoryByRoomTypeId[roomTypeId] = Math.min(
          minInventoryByRoomTypeId[roomTypeId],
          inventory
        );
      }
    });
  });

  const details = [];

  for (const key in minInventoryByRoomTypeId) {
    if (minInventoryByRoomTypeId.hasOwnProperty(key)) {
      const value = minInventoryByRoomTypeId[key];
      var data = await roomDetails.findOne({ roomTypeId: key });
      const data1 = await roomImages.findOne({ roomTypeId: key });
      const ratedata = await managerates.findOne({roomTypeId:key ,"manageRate.date": { $gte: from, $lte: to,} ,propertyId: req.body.propertyId})
      console.log(ratedata)
      
      var inventory = (data.numberOfRooms && data.numberOfRooms[0] && data.numberOfRooms[0].numberOfRooms) || "";
      var rateData = (ratedata.manageRate && ratedata.manageRate[0] && ratedata.manageRate[0].price) || "";
      var maxOccupancy = (data.maxOccupancy && data.maxOccupancy[0] && data.maxOccupancy[0].numberOfRooms) || "";
      var roomName = (data.roomName && data.roomName[0] && data.roomName[0].roomName) || "";
      var images = data1.roomTypeImages || []; // Ensure it's an array or initialize as an empty array if it's not defined
  
      
      if (!images) {
        images = "";
      }

      const all = {
        roomPrice : rateData,
        roomTypeId :key,
        inventory,
        maxOccupancy,
        roomName,
        images,
      };

      details.push(all);
    }
  }

  return res.send(details)
};
