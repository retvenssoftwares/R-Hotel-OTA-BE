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
const patchAmenityProperty = require('./routers/Amenities/patchAmenityPropertyRouter');
const fetchAmenityCategory =  require('./routers/Amenities/fetchAmenityCategoryRouter');

//Inclusions
const getInclusionsByType = require('./routers/Inclusions/getInclusionsByTypeRouter')
const inclusionRateType = require('./routers/Inclusions/patchInclusionRateTypeRouter')
const selectUnselectInclusions = require('./routers/Inclusions/selectInclusionInRatePlanRouter')
const getInclusions = require('./routers/Inclusions/fetchInclusionTypeRouter')

//Images
const propertyImages = require('./routers/Images/propertyImagesRouter')
const editImageDescription = require('./routers/Images/editDescriptionRouter')
const getImageOgRoomType = require('./routers/Images/getRoomTypeAndPropertyImagesRouter')

//Booking
const createBookingRouter = require('./routers/Bookings/createBookingRouter')
const patchBooking = require('./routers/Bookings/patchBookingRouter')


//Onboarding
const property =require('./routers/Onboarding/addPropertyRouter');
const getProperty =require('./routers/Onboarding/getPropertyRouter');
const updateproperty =require('./routers/Onboarding/patchPropertyDetailsRouter');
const getAllUserProperties = require('./routers/Onboarding/getAllUserProperties')
const selectAmenitiesInRoom = require('./routers/Amenities/selectAmenitiesInRoomTypeRouter')

//Property
const getTopProperties = require('./routers/Property/getTopSixPropertiesRouter')
const hotelImages = require('./routers/Onboarding/pacthLogoAndCoverPhoto')
const propertyCity = require('./routers/Onboarding/fetchCityOfPropertyRouter')
//location
const country = require('./routers/location/getAllcountryrouter')

//room
const fetchRoomTypeList = require('./routers/Room/roomTypelistFetchRouter')
const fetchRoomType = require('./routers/Room/fetchRoomTypeByPropertyIdRouter')
const addRoom =require('./routers/Room/addRoomRouter')
const fetchRoom =require('./routers/Room/getRoomRouter')
const  patchRoom =require('./routers/Room/patchAddRoomRouter')
const addRatePlan = require('./routers/Room/addRatePlanRouter')
const addRateType = require('./routers/Room/addRateTypeRouter');
const fetchBedName =require('./routers/Room/getBedTypeNameRouter');
const fetchRatePlan =require('./routers/Room/getRatePlanByRoomTypeRouter');
const getRatePlan =require('./routers/Room/getRatePlanByPropertyIdRouter');
const editRateType = require('./routers/Room/patchRateTypeRouter')
const getRatePlanById = require('./routers/Room/getRatePlanByIdRouter')
const getRoomType = require('./routers/Room/getRoomTypeByPropertyIdRouter');
const getRateType = require('./routers/Room/fetchRateTypeByRateIdRouter')
const editRatePlan =  require('./routers/Room/patchRatePlanRouter')

//ManageInventory
const fetchInventory = require('./routers/manageInventory/getInventoryByPropertyId');
const fetchRate = require('./routers/manageInventory/getRateByPropertyId');
const patchInventory = require('./routers/manageInventory/patchInventoryRouter')
const patchRates = require('./routers/manageInventory/patchRatesRouter')

//accountCreation
app.use(login);
app.use(logout);
app.use(registration);
app.use(propertyImages);
app.use(editImageDescription);

//Image 

app.use(getImageOgRoomType)

//Amenity
app.use(getAmenities);
app.use(fetchAmenityType)
app.use(fetchAmenityName)
app.use(patchAmenityProperty)
app.use(fetchAmenityCategory)

//inclusions
app.use(getInclusionsByType)
app.use(inclusionRateType)
app.use(selectUnselectInclusions);
app.use(getInclusions)

//Properties
app.use(getTopProperties)

//room
app.use(fetchRoomTypeList)
app.use(fetchRoomType)
app.use(getRoomType);
app.use(getRateType);
app.use(getRatePlanById);
app.use(editRateType)
app.use(editRatePlan);

//booking
app.use(createBookingRouter)
app.use(patchBooking)

//inventory
app.use(patchInventory)
app.use(fetchInventory)
app.use(patchRates)
app.use(fetchRate)

//Onboarding
app.use(property);
app.use(getProperty)
app.use(updateproperty);
app.use(patchRoom);
app.use(addRoom)
app.use(addRateType)
app.use(addRatePlan)
app.use(fetchRoom)
app.use(fetchBedName)
app.use(fetchRatePlan)
app.use(getRatePlan)
app.use(selectAmenitiesInRoom);
app.use(getAllUserProperties)
app.use(hotelImages)
app.use(propertyCity)

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
