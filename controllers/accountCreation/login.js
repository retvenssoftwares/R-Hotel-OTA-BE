require('dotenv')
const crypto = require('crypto')
const randomstring = require('randomstring')
//models
const admin = require("../../models/Onboarding/registrations");
const key = process.env.key
const IV_LENGTH = process.env.iv
//
module.exports = async (req, res) => {
    try{
    const { email, passwd} = req.body
    const userProfile = await admin.findOne({ email: email })

    if (!userProfile) {
        return res.status(404).json({ message: "User Profile Not Found" })
    }

    const { firstName, phoneNumber, password } = userProfile;
    let savedPassword = password[0].pwd
   

    // Decrypt function
    function decryptPassword(encryptedText) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(IV_LENGTH));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    const decryptedPassword = decryptPassword(savedPassword)
    console.log(decryptedPassword)

    if (passwd !== decryptedPassword || !userProfile) {
        return res.status(404).json({ message: 'Invalid credentials' })
    }

    // if (generatedVariable !== genVariable) {
    //     return res.status(400).json({ message: "Invalid Genvariable" });
    // }
 
        const session =  randomstring.generate(64);
        const userlogin = await admin.updateOne({ email: email }, {$set: {sessionId:session}})
        return res.status(200).json({ message: "login successful",sessionId:session})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}