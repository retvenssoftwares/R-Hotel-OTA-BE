const express = require('express');
const mongoose = require('mongoose');
require('./Job Schedulers/testJob')
const app = express();
const cors = require('cors');
const http = require('http').Server(app); // Create an HTTP server
const io = require('socket.io')(http); // Initialize Socket.io and pass the http server instance
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: '*'
}));



app.use(express.static(path.join(__dirname, 'R-Hotel-OTA-BE')));



const fetchInventory = require('./routers/manageInventory/getInventoryByPropertyId');
const createBookingRouter = require('./routers/Bookings/createBookingRouter')
app.use(createBookingRouter)
app.use(fetchInventory(io))
io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



mongoose
  .connect("mongodb+srv://doadmin:3Q47p2nS098GIXe6@r-own-backend-8e41357f.mongo.ondigitalocean.com/OTA?tls=true&authSource=admin&replicaSet=r-own-backend", {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB'))
  .catch(err => {
      console.log(err, "mongo_error");
});

http.listen(4000, function () {
    console.log('Server listening at http://localhost:4000');
});
