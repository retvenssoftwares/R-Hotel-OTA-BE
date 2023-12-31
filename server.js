require('dotenv').config();
require('./Job Schedulers/testJob')
require('./Job Schedulers/deleteOldBookings')
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path')

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 8000;

// app.use(express.static('R-Hotel-OTA-BE'));
app.use(express.static(path.join(__dirname, 'R-Hotel-OTA-BE')));

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
const fetchAmenityCategory = require('./routers/Amenities/fetchAmenityCategoryRouter');
const fetchRoomTypeAmenity = require('./routers/Amenities/getRoomAmenitiesRouter')

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
const fetchBooking = require('./routers/Bookings/fetchBookingByPorpertyIdRouter')
const fetchCheckOutBooking = require('./routers/Bookings/fetchCheckOutBookingByPropertyIdRouter')
//const patchBooking = require('./routers/Bookings/patchBookingRouter');
const getUserBookings = require('./routers/Bookings/getBookingsByUserIdRouter')
const getBookingData = require('./routers/Bookings/getBookingDetailsRouter')
const checkInPendingBooking = require('./routers/Bookings/fetchCheckInPendingBookingByPropertyRouter')
const checkOutPendingBooking = require('./routers/Bookings/fetchCheckOutPendingBookingByPropertyRouter')
const fetchPaymentData = require('./routers/Bookings/fetchPaymentDataByCheckInAndOutRouter');
const fetchCancelledBookings = require('./routers/Bookings/fetchCancelledBookingsRouter')

//Onboarding
const property = require('./routers/Onboarding/addPropertyRouter');
const getProperty = require('./routers/Onboarding/getPropertyRouter');
const updateproperty = require('./routers/Onboarding/patchPropertyDetailsRouter');
const getAllUserProperties = require('./routers/Onboarding/getAllUserProperties')
const selectAmenitiesInRoom = require('./routers/Amenities/selectAmenitiesInRoomTypeRouter')
const fetchAllProperty = require('./routers/Onboarding/getAllPropertyRouter')
const getRegisteredUsers = require('./routers/accountCreation/getRegisteredUsersRouter')
const getUserById = require('./routers/accountCreation/getUserByUserIDRouter')

//Property
const getTopProperties = require('./routers/Property/getTopSixPropertiesRouter')
const hotelImages = require('./routers/Onboarding/pacthLogoAndCoverPhoto');
const getRateTypeByPropertyId = require("./routers/Property/getRateTypeByPropertyIdRouter")
const propertyByCity = require('./routers/Property/getPropertyByCityRouter')
const addPropertyReview = require('./routers/Property/postRatingsRouter')
const getPropertyReview = require('./routers/Property/getReviewsOfPropertyRouter')
const editPropertyReview = require('./routers/Property/editReviewRouter')

//const hotelImages = require('./routers/Onboarding/pacthLogoAndCoverPhoto')
const propertyCity = require('./routers/Onboarding/fetchCityOfPropertyRouter')
//location
const country = require('./routers/location/getAllcountryrouter')

//Promotion
const createPromotion = require('./routers/Promotion/addPromotionRouter')
const editPromotion = require('./routers/Promotion/editPromotionRouter');
const getPromotion = require('./routers/Promotion/getPromotionByPropertyIdRouter.js')

//room
const fetchRoomTypeList = require('./routers/Room/roomTypelistFetchRouter')
const fetchRoomType = require('./routers/Room/fetchRoomTypeByPropertyIdRouter')
const addRoom = require('./routers/Room/addRoomRouter')
const fetchRoom = require('./routers/Room/getRoomRouter')
const patchRoom = require('./routers/Room/patchAddRoomRouter')
const addRatePlan = require('./routers/Room/addRatePlanRouter')
const addRateType = require('./routers/Room/addRateTypeRouter');
const fetchBedName = require('./routers/Room/getBedTypeNameRouter');
const fetchRatePlan = require('./routers/Room/getRatePlanByRoomTypeRouter');
const getRatePlan = require('./routers/Room/getRatePlanByPropertyIdRouter');
const editRateType = require('./routers/Room/patchRateTypeRouter')
const getRatePlanById = require('./routers/Room/getRatePlanByIdRouter')
const getRoomType = require('./routers/Room/getRoomTypeByPropertyIdRouter');
const getRateType = require('./routers/Room/fetchRateTypeByRateIdRouter')
const editRatePlan = require('./routers/Room/patchRatePlanRouter')
const getRateTypesByRoomId = require('./routers/Room/getRateTypesByRoomIdRouter')

//ManageInventory
const fetchInventory = require('./routers/manageInventory/getInventoryByPropertyId');
const fetchRate = require('./routers/manageInventory/getRateByPropertyId');
const patchInventory = require('./routers/manageInventory/patchInventoryRouter')
const patchRates = require('./routers/manageInventory/patchRatesRouter')
const getAvailableInvetory = require('./routers/manageInventory/fetchInventoryRouter');
const blockUnBlockInventory = require('./routers/manageInventory/blockUnblockInventoryRouter')

//reports
const getRevenueDetailsData = require("./routers/Report/revenueGenwratedOfPropertyRounter")
const grossrevenue = require("./routers/Report/totalGrossRevenueRouter")
const avgrate = require("./routers/Report/avgSellingPriceRouter")
const roomReport = require("./routers/Report/roomAndRatePlanReportRouter")

//accountCreation
app.use(login);
app.use(logout);
app.use(registration);
app.use(propertyImages);
app.use(editImageDescription);
app.use(getRegisteredUsers)
app.use(getUserById)

//Image 
app.use(getImageOgRoomType)

//Promotion
app.use(createPromotion)
app.use(editPromotion)
app.use(getPromotion)

//Amenity
app.use(getAmenities);
app.use(fetchAmenityType)
app.use(fetchAmenityName)
app.use(patchAmenityProperty)
app.use(fetchAmenityCategory)
app.use(fetchRoomTypeAmenity)

//inclusions
app.use(getInclusionsByType)
app.use(inclusionRateType)
app.use(selectUnselectInclusions);
app.use(getInclusions)

//Properties
app.use(getTopProperties)
app.use(getRateTypeByPropertyId)
app.use(propertyByCity)
app.use(addPropertyReview)
app.use(editPropertyReview)
app.use(getPropertyReview)

//room
app.use(fetchRoomTypeList)
app.use(fetchRoomType)
app.use(getRoomType);
app.use(getRateType);
app.use(getRatePlanById);
app.use(editRateType)
app.use(getRateTypesByRoomId);
app.use(editRatePlan);

//booking
app.use(createBookingRouter)
app.use(patchBooking)
app.use(fetchBooking)
app.use(fetchCheckOutBooking)
app.use(getBookingData)
app.use(getUserBookings);
app.use(checkInPendingBooking)
app.use(checkOutPendingBooking)
app.use(fetchCancelledBookings)
app.use(fetchPaymentData)

//inventory
app.use(patchInventory)
app.use(fetchInventory(io))
app.use(patchRates)
app.use(fetchRate)
app.use(blockUnBlockInventory)

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
app.use(fetchAllProperty)
app.use(propertyCity)

//manageInventory
app.use(getAvailableInvetory)

//location
app.use(country)

//reports
app.use(getRevenueDetailsData)
app.use(grossrevenue)
app.use(avgrate)
app.use(roomReport)

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
