const randomstring = require("randomstring");
require('dotenv').config();
const userAccount = require("../../models/userAccount/userAccount");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const otpVerification = async (email, otp) => {
    const msg = {
        to: email,
        from: 'retvenssoftwares@gmail.com', // Replace with your verified sender email
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`,
        html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('OTP Verification Email sent successfully');
    } catch (error) {
        console.error('Error sending OTP Verification Email:', error.response.body);
    }
};

// Function to get UTC time
function getCurrentUTCTimestamp() {
    const now = new Date();
    const utcTimestamp = now.toISOString(); // Convert to ISO string
    return utcTimestamp;
}

const userSignUp = async (req, res) => {
    try {
        const email = req.body.email;
        // Validate email format using a regular expression
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        let userDetails = await userAccount.findOne({ email: email });
         const {isOtpVerified} = userDetails
        if (!userDetails) {
            const OTP = randomstring.generate({ charset: 'numeric', length: 6 });
            const guestId = randomstring.generate(8);
            userDetails = await userAccount.create({
                guestId: guestId,
                email: email,
                otp: OTP,
                time: new Date().toUTCString() // UTC time when the user signs up
            });
            await otpVerification(email, OTP);
            return res.status(200).json({ message: `New record created. OTP sent to your email ${email}`, statusCode: 200 });
        } else {
            if (isOtpVerified==="true") {
                return res.status(200).json({ message: 'User already verified', statusCode: 200 });
            } else {
                const OTP = randomstring.generate({ charset: 'numeric', length: 6 });
                await userAccount.updateOne({ email: email }, { $set: { otp: OTP, time: getCurrentUTCTimestamp() } });
                await otpVerification(email, OTP);
                return res.status(200).json({ message: `OTP updated. OTP sent to your email ${email}`, statusCode: 200 });
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error', statusCode: 500 });
    }
};

module.exports = userSignUp;
