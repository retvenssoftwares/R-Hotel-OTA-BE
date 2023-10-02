const { Router } = require('express');
const addBooking = require('../../controllers/Booking/createBooking');
const app = Router();

//app.post('/createBooking',addBooking);

module.exports = (io) => {
    // Define the route for fetching inventory
    app.post('/createBooking', addBooking(io))

    return app;
};

