const bodyParser = require('body-parser');
const app = require('express')();
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());


//
const registration = require('./routers/Onboarding/signUpRouter');


app.use(registration);



mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.log(err, "mongo_error");
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });