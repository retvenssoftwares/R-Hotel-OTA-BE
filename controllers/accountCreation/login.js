//models
const admin  = require("../../models/Onboarding/Registration");
//
module.exports = (req, res) => {
    const { email, password } = req.body
    admin.findOne({ email: email }, (error, user) => {
        if (user) {
            if (password === user.password) {
                res.status(200).send({ message: "login successful" })

            } else {

                res.send({ message: "pls check your email and password" })
            }

        }
        
    })
}