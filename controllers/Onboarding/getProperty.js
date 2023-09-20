const Property =require('../../models/Onboarding/propertys')

module.exports= async (req,res)=>{
   try{
    const propertyId =req.params.propertyId
const property =await Property.findOne({propertyId})
if(!property){
    return res.status(404).json({error:'Property not found'})
}
return res.status(200).json(property);
   }
   catch(error){
    return res.status(500).json({error:error.message})
   }
}