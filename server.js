require('dotenv').config();
const cors = require('cors')
const bodyParser = require('body-parser');
const app = require('express')();

const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));


//Onboarding
const registration = require('./routers/accountCreation/signUpRouter');
const login = require('./routers/accountCreation/loginRouter');

//Amenities
const getAmenities = require('./routers/Amenities/getAmenitiesRouter')

//Images
const propertyImages = require('./routers/Images/propertyImagesRouter')


///
app.use(login);
app.use(registration);
app.use(getAmenities);
app.use(propertyImages);


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
