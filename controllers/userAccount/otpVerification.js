const randomstring = require("randomstring");
const userAccount = require("../../models/userAccount/userAccount");

const verifyOtp = async (req, res) => {
    const { Otp } = req.body;

    if (!Otp) {
        return res.status(400).json({ message: "OTP is missing", statusCode: 400 });
    }

    try {
        const tenMinutesAgo = new Date(new Date().getTime() - 1 * 60 * 1000);
        const utcTimestamp = tenMinutesAgo.toISOString();
        
        const userDetails = await userAccount.findOne({ otp: Otp, time: { $gte: utcTimestamp } });
        
        if (!userDetails) {
            return res.status(400).json({ message: "Incorrect or expired OTP", statusCode: 400 });
        }

        // Update isOtpVerified to true
        await userAccount.updateOne({ otp: Otp }, { $set: { otp: "", time: "", isOtpVerified: "true" } });

        return res.status(200).json({ message: "OTP verified successfully", statusCode: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", statusCode: 500 });
    }
};

module.exports = verifyOtp;
