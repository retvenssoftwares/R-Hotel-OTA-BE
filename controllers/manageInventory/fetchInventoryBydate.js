const manageInventory = require("../../models/manageInventory/manageInventory");
const managerates = require("../../models/manageInventory/manageRates");
const roomDetails = require("../../models/Rooms/roomTypeDetails");
// const roomImageCollection = require("../../models/Images/roomTypeImages");
const roomImageCollection = require("../../models/Images/roomTypeImages")
const rateType = require("../../models/Rooms/rateType");
const ratePlane = require("../../models/Rooms/ratePlan");
const { parse, max } = require("date-fns");
const rates = require("../../models/manageInventory/manageRates");

module.exports = async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;


  const filteredManageInventory = await manageInventory.aggregate([
    {
      $match: {
        propertyId: req.query.propertyId,
      },
    },
    {
      $unwind: "$manageInventory",
    },
    {
      $match: {
        "manageInventory.isBlocked": "false",
        "manageInventory.date": {
          $gte: from,
          $lte: to,
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        propertyId: { $first: "$propertyId" },
        roomTypeId: { $first: "$roomTypeId" }, 
        manageInventory: { $push: "$manageInventory" },
      },
    },
  ]);
  
  //console.log(filteredManageInventory);
  //return res.send(filteredManageInventory);
  
  if(filteredManageInventory.length === 0){

    let details = []
    const findBaseInventory = await manageInventory.find({
      propertyId: req.query.propertyId,
    });

    //console.log(findBaseInventory)

    for(const room of findBaseInventory){

      // find the room Rate for that room 
      const roomRateDetails = await rateType.findOne({roomTypeId:room.roomTypeId})

      // base price for that specific room 
      const basePrice = (roomRateDetails && roomRateDetails.basePrice && roomRateDetails.basePrice[0] && roomRateDetails.basePrice[0].basePrice) || "";

      // room Images of that room 
      const roomImageData = await roomImageCollection.findOne({roomTypeId : room.roomTypeId})
     

      // array of roomImages 
      const roomImage = roomImageData.roomTypeImages || ""


      // manageInventory is use to find  baseInventory 
      const manageInventoryData = await manageInventory.findOne({roomTypeId:room.roomTypeId})
      const baseInventory = (manageInventoryData.Inventory &&manageInventoryData.Inventory[0] &&manageInventoryData.Inventory[0].baseInventory) ||  "";


      // responses for that particular room 
      const add = {
            roomPrice : basePrice,
            roomImages : roomImage,
            roomTypeId : room.roomTypeId,
            inventory : baseInventory
      }
      details.push(add)
    }
      //console.log(details)
  }
  else
  {


    //console.log(filteredManageInventory)

  if (from >= to) {
    return res.status(400).json({ message: "date is not valid" });
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
        // console.log(inventory);
        minInventoryByRoomTypeId[roomTypeId] = Math.min(
          minInventoryByRoomTypeId[roomTypeId],
          inventory
        );
        // console.log("b",minInventoryByRoomTypeId[roomTypeId])
      }
    });
  });

  //console.log(minInventoryByRoomTypeId)

  const details = [];

  for (const key in minInventoryByRoomTypeId) {
    if (minInventoryByRoomTypeId.hasOwnProperty(key)) {
       var value = minInventoryByRoomTypeId[key];

      // find the roomDetails
      var data = await roomDetails.findOne({ roomTypeId: key });
      //console.log(data)

      // find the images for tahte room
      const roomImageData = await roomImageCollection.findOne({roomTypeId : key})
      //console.log("ttttttttttttttttttt",roomImageData)

      

      // find the rate fo that room
      //const ratedata = await managerates.findOne({ roomTypeId: key, "manageRate.date": { $gte: from, $lte: to },propertyId: req.query.propertyId,});
      const ratedata = await managerates.aggregate([
        {
          $match: {
            propertyId: req.query.propertyId,
          },
        },
        {
          $unwind: "$manageRate",
        },
        {
          $match: {
            "manageRate.date": {
              $gte: from, // Convert from to a Date object
              $lte: to,   // Convert to to a Date object
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            roomTypeId: { $first: "$roomTypeId" },
            manageRate: { $push: "$manageRate" },
          },
        },
      ]);
      
      // Ensure you handle the result (ratedata) as needed
      
    



      //console.log(ratedata)
     

     //return res.send(ratedata)


     let rateArray = []

      for(const rate of ratedata){
        for(const ratedetails of rate.manageRate){

          const datedetails = ratedetails.date
          // console.log(datedetails)

          //const stringDate = datedetails.split("-")

          //const formatedDate = stringDate[2] + "/" +stringDate[1] + "/" + stringDate[0]
         // console.log(formatedDate)
          
         const ratePlaneData = await ratePlane.aggregate([
          {
            $match: {
              roomTypeId: key,
              propertyId: req.query.propertyId,
              "startDate.startDate": {$gte : datedetails },
              "endDate.endDate": { $lte: datedetails }
            }
          }
        ]);
          console.log("fghjb",ratePlaneData)
          
          if (ratePlaneData) {
            ratedetails.roomTypeId = ratePlaneData.roomTypeId;
            ratedetails.maxOccupancy =
              (data && data.maxOccupancy && data.maxOccupancy[0] && data.maxOccupancy[0].maxOccupancy) || "";
            ratedetails.roomName =
              (data && data.roomName && data.roomName[0] && data.roomName[0].roomName) || "";
          
            // Set default value for images if data1.roomTypeImages is null or empty
            ratedetails.images = (roomImageData && roomImageData.roomTypeImages) || [];
            ratedetails.inventory = value
          
            // Add ratePlaneName to the ratedetails object
            if (ratePlaneData.ratePlanName && ratePlaneData.ratePlanName.length > 0) {
              ratedetails.ratePlaneName = ratePlaneData.ratePlanName[0].ratePlanName;
            } else {
              ratedetails.ratePlaneName = ""; // Set to an empty string if ratePlanName is not available
            }
            rateArray.push(ratedetails);
          }
          
        }
        
      }

     return res.send(rateArray)

      
      //return res.send(rateArray)

    


     
    
      // Ensure it's an array or initialize as an empty array if it's not defined
      // var ratetypedata = ratetype?.rateTypeId || "";
      // var ratePlan = rateplane?.ratePlanId || "";

      // if (!images) {
      //   images = "";
      // }

      // const all = {
      //   //roomPrice: rate,
      //   roomTypeId: key,
      //   //inventory: value,
      //   maxOccupancy,
      //   roomName,
      //   images,
      //   rateTypeId: ratetypedata,
      //   ratePlanId: ratePlan,
      // };

      // details.push(all);
    }
  }

  return res.send(details);


}



}

