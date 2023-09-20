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


//accountCreation
const registration = require('./routers/accountCreation/signUpRouter');
const login = require('./routers/accountCreation/loginRouter');
const logout = require('./routers/accountCreation/logOutRouter')

//Amenities
const getAmenities = require('./routers/Amenities/getAmenitiesRouter')
const fetchAmenityType = require('./routers/Amenities/fetchAmenityTypeRouter')
const fetchAmenityName = require('./routers/Amenities/fetchAmenityNameRouter')
const patchAmenityProperty = require('./routers/Amenities/patchAmenityPropertyRouter')

//Images
const propertyImages = require('./routers/Images/propertyImagesRouter')
const editImageDescription = require('./routers/Images/editDescriptionRouter')


//Onboarding
const property =require('./routers/Onboarding/addPropertyRouter');
const updateproperty =require('./routers/Onboarding/patchPropertyDetailsRouter');
//const postRoom =require('./routers/Onboarding/addRoomRouter');
const addRoom =require('./routers/Onboarding/addRoomRouter')
const  patchRoom =require('./routers/Onboarding/patchAddRoomRouter')
const addRateType =require('./routers/Onboarding/addRateTypeRouter')
const addRatePlan =require('./routers/Onboarding/addRatePlanRouter')

//location
const country =require('./routers/location/getAllcountryrouter')


//accountCreation
app.use(login);
app.use(logout);
app.use(registration);
app.use(propertyImages);
app.use(editImageDescription);

//Amenity
app.use(getAmenities);
app.use(fetchAmenityType)
app.use(fetchAmenityName)
app.use(patchAmenityProperty)

//Onboarding
app.use(property);
app.use(updateproperty);
app.use(patchRoom);
app.use(addRoom)
app.use(addRateType)
app.use(addRatePlan)

//location
app.use(country)

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
