const Property =require('../../models/Onboarding/roomTypeDetails')

module.exports= async (req,res)=>{
   try{
    const roomTypeId =req.params.roomTypeId
const room =await Property.findOne({roomTypeId})
if(!room){
    return res.status(404).json({error:'Room not found'})
}
return res.status(200).json(room);
   }
   catch(error){
    return res.status(500).json({error:error.message})
   }
}