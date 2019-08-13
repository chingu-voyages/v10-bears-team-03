const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")



// const trackerRoutes = express.Router();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, "client/build")))
  
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
 
  }
  


const trackerRoutes = require('./routes/API/trackers');
const userRoutes = require('./routes/API/users');
const userTrackerRoutes = require('./routes/API/userTrackers');


mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tracker';
console.log("mongo test", MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/trackers', trackerRoutes)
app.use('/users', userRoutes)
app.use('/userTrackers', userTrackerRoutes)


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
