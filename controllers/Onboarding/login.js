//models
const admin  = require("../../models/admin");
//
module.exports = (req, res) => {
    const { Email, Password } = req.body
    admin.findOne({ Email: Email }, (error, user) => {
        if (user) {
            if (Password === user.Password) {
                res.status(200).send({ message: "admin login successful" })

            } else {

                res.send({ message: "pls check your email and password" })
            }

        }
        
    })
}