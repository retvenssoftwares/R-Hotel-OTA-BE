const data = require("../../models/Bookings/bookingPending")

module.exports = async(req,res)=>{
    const calldata = await data.find({})
    return res.status(200).json(calldata);

}