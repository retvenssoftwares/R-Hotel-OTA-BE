const manageInventory = require("../../models/manageInventory/manageInventory");
const managerates = require("../../models/manageInventory/manageRates");
const roomDetails = require("../../models/Rooms/roomTypeDetails");
const roomImages = require("../../models/Images/roomTypeImages");
const  rateType =  require("../../models/Rooms/rateType")
const ratePlane = require("../../models/Rooms/ratePlan")
const { parse, max } = require("date-fns");

module.exports = async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  // Find manageInventory items within the date range
  const filteredManageInventory = await manageInventory.find({
    propertyId: req.query.propertyId,
    "manageInventory.isBlocked": "false",
    "manageInventory.date": {
      $gte: from,
      $lte: to,
    },
  });


  if(from >= to){
    return res.status(200).json({message : "date is not valid"})
  }
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
        console.log(inventory)
        minInventoryByRoomTypeId[roomTypeId] = Math.min(
          minInventoryByRoomTypeId[roomTypeId],
          inventory
        );
        console.log("b",minInventoryByRoomTypeId[roomTypeId])
      }
    });
  });

  console.log(minInventoryByRoomTypeId)

  const details = [];

  for (const key in minInventoryByRoomTypeId) {
    if (minInventoryByRoomTypeId.hasOwnProperty(key)) {
      const value = minInventoryByRoomTypeId[key];
      var data = await roomDetails.findOne({ roomTypeId: key});
      const data1 = await roomImages.findOne({ roomTypeId: key });
      const ratedata = await managerates.findOne({roomTypeId:key ,"manageRate.date": { $gte: from, $lte: to} ,propertyId: req.query.propertyId})
     const ratetype = await rateType.findOne({roomTypeId : key,propertyId: req.query.propertyId})
     const rateplane = await ratePlane.findOne({roomTypeId:key ,propertyId: req.query.propertyId })
      
      //var inventory = (data.numberOfRooms && data.numberOfRooms[0] && data.numberOfRooms[0].numberOfRooms) || "";
      var rateData = "";

      if (ratedata && ratedata.manageRate && ratedata.manageRate[0] && ratedata.manageRate[0].price) {
        rateData = ratedata.manageRate[0].price;
      }
      var maxOccupancy = (data.maxOccupancy && data.maxOccupancy[0] && data.maxOccupancy[0].maxOccupancy) || "";
      var roomName = (data.roomName && data.roomName[0] && data.roomName[0].roomName) || "";
      var images = data1.roomTypeImages || []; // Ensure it's an array or initialize as an empty array if it's not defined
      var ratetypedata = ratetype.rateTypeId || ""
     // var ratePlan = rateplane.ratePlanId || ""

      
      
      if (!images) {
        images = "";
      }

      const all = {
        roomPrice : rateData,
        roomTypeId :key,
        inventory :value,
        maxOccupancy,
        roomName,
        images,
        rateTypeId : ratetypedata,
       // ratePlanId : ratePlan
      };

      details.push(all);
    }
  }

  return res.send(details)
};
