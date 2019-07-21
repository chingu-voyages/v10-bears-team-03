const express = require('express');
const trackerRoutes = express.Router();

let Tracker = require('../../models/Tracker');

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

//edit?
trackerRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Tracker.findById(id, function (err, tracker){
        res.json(tracker);
    });
  });

//update
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

//delete
trackerRoutes.route('/delete/:id').delete(function (req, res) {
    Tracker.findByIdAndRemove({_id: req.params.id}, function(err, tracker){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = trackerRoutes;