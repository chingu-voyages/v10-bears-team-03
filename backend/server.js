const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const trackerRoutes = express.Router();
const PORT = 4000;

let Tracker = require('./models/Tracker');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tracker', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//api endpoints starts
//index
trackerRoutes.route('/').get(function(req, res) {
    Tracker.find(function(err, trackers) {
        if (err) {
            console.log(err);
        } else {
            res.json(trackers);
        }
    });
});
//show
trackerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Tracker.findById(id, function(err, trackers) {
        res.json(trackers);
    });
});
//add
trackerRoutes.route('/add').post(function(req, res) {
    let tracker = new Tracker(req.body);
    tracker.save()
        .then(tracker => {
            res.status(200).json({'tracker': 'tracker added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new tracker failed');
        });
});
//update
/*
name: String,
  type: String,
  date_purchased: Date,
  expire: Number,
  price: Number,
  where_purchased: String
*/
trackerRoutes.route('/update/:id').post(function(req, res) {
    Tracker.findById(req.params.id, function(err, tracker) {
        if (!tracker)
            res.status(404).send("data is not found");
        else
            tracker.name = req.body.name;
            tracker.date_purchased = req.body.date_purchased;
            tracker.expire = req.body.expire;
            tracker.price = req.body.price;
            tracker.where_purchased = req.body.where_purchased;
            
            tracker.save().then(tracker => {
                res.json('Tracker updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
//api endpoint ends
app.use('/trackers', trackerRoutes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});