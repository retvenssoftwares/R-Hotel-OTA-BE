const data = require("../../models/Bookings/bookingPending")

module.exports = async(req,res)=>{
    const calldata = await data.findOne({bookingId : req.query.bookingId})
    return res.status(200).json(calldata);

}