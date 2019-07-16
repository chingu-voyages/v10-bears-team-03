const express = require('express');
const userTrackerRoutes = express.Router();

let UserTracker = require('../../models/UserTracker');

//index
userTrackerRoutes.route('/').get(function(req, res) {
    UserTracker.find(function(err, userTrackers) {
        if (err) {
            console.log(err);
        } else {
            res.json(userTrackers);
        }
    });
});

//show
userTrackerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    UserTrackerTracker.findById(id, function(err, userTrackers) {
        res.json(userTrackers);
    });
});

//add
userTrackerRoutes.route('/add').post(function(req, res) {
    let userTracker = new UserTracker(req.body);
    userTracker.save()
        .then(userTracker => {
            res.status(200).json({'userTracker': 'userTracker added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new userTracker failed');
        });
});

//edit?
userTrackerRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    UserTracker.findById(id, function (err, userTracker){
        res.json(userTracker);
    });
  });

//update
userTrackerRoutes.route('/update/:id').post(function(req, res) {
    UserTracker.findById(req.params.id, function(err, userTracker) {
        if (!userTracker)
            res.status(404).send("data is not found");
        else
            userTracker.tracker_id = req.body.tracker_id;
            userTracker.user_id = req.body.user_id;
            userTracker.distance_used = req.body.distance_used;
            
            userTracker.save().then(userTracker => {
                res.json('UserTracker updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//delete use GET!!!! 
userTrackerRoutes.route('/delete/:id').get(function (req, res) {
    UserTracker.findByIdAndRemove({_id: req.params.id}, function(err, userTracker){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userTrackerRoutes;