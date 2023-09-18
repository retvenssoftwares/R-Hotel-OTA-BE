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


//Onboarding
const property =require('./routers/Onboarding/addPropertyRouter');
const updateproperty =require('./routers/Onboarding/patchPropertyDetailsRouter');
//const postRoom =require('./routers/Onboarding/addRoomRouter');
const addRoom =require('./routers/Onboarding/addRoomRouter')
const  patchRoom =require('./routers/Onboarding/patchAddRoomRouter')

//location
const country =require('./routers/location/getAllcountryrouter')


//accountCreation
app.use(login);
app.use(registration);


//Onboarding
app.use(property);
app.use(updateproperty);
app.use(patchRoom);
app.use(addRoom)

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
