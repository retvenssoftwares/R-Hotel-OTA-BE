const userModel = require('../../models/Onboarding/registrations');

//Logout module
module.exports = async (req, res) => {
    const userId = req.params.userId;
    const userProfile = await userModel.findOne({ userId: userId });
    // const {deviceType, ipAddress} = req.body

    //ask to login again if registrationid is empty
    if (userProfile.sessionId === null || userProfile.sessionId === '') {
        return res.status(400).json({ message: "Please login again" })
    }
    await userModel.updateOne({ userId: userId }, { $set: { sessionId: '' } });
    // const propertyId = req.body.propertyId

    res.status(200).json({ message: 'Logged out successfully' })
}