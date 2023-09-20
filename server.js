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

//Inclusions
const getInclusionsByType = require('./routers/Inclusions/getInclusionsByTypeRouter')
const inclusionRateType = require('./routers/Inclusions/patchInclusionRateTypeRouter')
const selectUnselectInclusions = require('./routers/Inclusions/selectInclusionInRatePlanRouter')

//Images
const propertyImages = require('./routers/Images/propertyImagesRouter')
const editImageDescription = require('./routers/Images/editDescriptionRouter')


//Onboarding
const property =require('./routers/Onboarding/addPropertyRouter');
const getProperty =require('./routers/Onboarding/getPropertyRouter');
const updateproperty =require('./routers/Onboarding/patchPropertyDetailsRouter');
//const postRoom =require('./routers/Onboarding/addRoomRouter');
const addRoom =require('./routers/Onboarding/addRoomRouter')
const fetchRoom =require('./routers/Onboarding/getRoomRouter')
const  patchRoom =require('./routers/Onboarding/patchAddRoomRouter')
//const addRateType =require('./routers/Onboarding/addRateTypeRouter')
const addRatePlan =require('./routers/Onboarding/addRatePlanRouter')
const addRateType =require('./routers/Onboarding/addRateTypeRouter');
const selectAmenitiesInRoom = require('./routers/Amenities/selectAmenitiesInRoomTypeRouter')

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

//inclusions
app.use(getInclusionsByType)
app.use(inclusionRateType)
app.use(selectUnselectInclusions);

//Onboarding
app.use(property);
app.use(getProperty)
app.use(updateproperty);
app.use(patchRoom);
app.use(addRoom)
app.use(addRateType)
app.use(addRatePlan)
app.use(selectAmenitiesInRoom)
app.use(fetchRoom)

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
