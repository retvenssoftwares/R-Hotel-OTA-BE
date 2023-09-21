require('dotenv').config();
require('./Job Schedulers/testJob')
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  


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
const addRatePlan = require('./routers/Onboarding/addRatePlanRouter')
const addRateType = require('./routers/Onboarding/addRateTypeRouter');
const getAllUserProperties = require('./routers/Onboarding/getAllUserProperties')
const selectAmenitiesInRoom = require('./routers/Amenities/selectAmenitiesInRoomTypeRouter')
const fetchBedName =require('./routers/Onboarding/getBedTypeNameRouter');

//location
const country = require('./routers/location/getAllcountryrouter')

//room
const fetchRoomTypeList = require('./routers/Room/roomTypelistFetchRouter')


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

//room
app.use(fetchRoomTypeList)

//Onboarding
app.use(property);
app.use(getProperty)
app.use(updateproperty);
app.use(patchRoom);
app.use(addRoom)
app.use(addRateType)
app.use(addRatePlan)
app.use(selectAmenitiesInRoom);
app.use(getAllUserProperties)
app.use(fetchRoom)
app.use(fetchBedName)

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
