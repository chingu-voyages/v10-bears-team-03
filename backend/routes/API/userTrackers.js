const express = require('express');
const userTrackerRoutes = express.Router();

let UserTracker = require('../../models/UserTracker');
let User = require('../../models/User');
let Tracker = require('../../models/Tracker');



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

//add //adding userTracker to the tracker and users array
userTrackerRoutes.route('/add').post(function(req, res) {
    let userTracker = new UserTracker(req.body);
    console.log(userTracker.user_id)

    User.findById(userTracker.user_id, function(err, user) {
        if (!user)
            res.status(404).send("User id data is not found");
        else
            user.UserTrackerGroup.push(userTracker._id)
            
            user.save()
            .catch(err => {
                res.status(400).send("User Update not possible");
            });
        });

    Tracker.findById(userTracker.tracker_id, function(err, tracker) {
        if (!tracker)
            res.status(404).send("data is not found");
        else
            tracker.UserTrackerGroup.push(userTracker._id)
            
            tracker.save()
            .catch(err => {
                res.status(400).send("Tracker Update not possible");
            });
        });
    
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

//update ids
userTrackerRoutes.route('/updateIds/:id').post(function(req, res) {
    UserTracker.findById(req.params.id, function(err, userTracker) {

        //remove the item from the list 
        User.findById(userTracker.user_id, function(err, user) {
            if (!user)
                res.status(404).send("User id data is not found");
            else
                user.UserTrackerGroup.splice( user.UserTrackerGroup.indexOf(userTracker._id), 1 );
                
                user.save()
                .catch(err => {
                    res.status(400).send("User Update not possible");
                });
            });
    
        Tracker.findById(userTracker.tracker_id, function(err, tracker) {
            if (!tracker)
                res.status(404).send("data is not found");
            else
                tracker.UserTrackerGroup.splice( tracker.UserTrackerGroup.indexOf(userTracker._id), 1 );
                
                tracker.save()
                .catch(err => {
                    res.status(400).send("Tracker Update not possible");
                });
            });

        if (!userTracker)
            res.status(404).send("data is not found");
        else //update and add the new items on both (tracker and user) id list
            userTracker.tracker_id = req.body.tracker_id;
            userTracker.user_id = req.body.user_id;

            User.findById(userTracker.user_id, function(err, user) {
                if (!user)
                    res.status(404).send("User id data is not found");
                else
                    user.UserTrackerGroup.push(userTracker._id)
                    
                    user.save()
                    .catch(err => {
                        res.status(400).send("User Update not possible");
                    });
                });
        
            Tracker.findById(userTracker.tracker_id, function(err, tracker) {
                if (!tracker)
                    res.status(404).send("data is not found");
                else{
                    tracker.UserTrackerGroup.push(userTracker._id)
                    
                    tracker.save()
                    .catch(err => {
                        res.status(400).send("Tracker Update not possible");
                    });
                }
                    
            });

            userTracker.save().then(userTracker => {
                res.json('UserTracker updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//update everything else that is not id
userTrackerRoutes.route('/update/:id').post(function(req, res) {
    UserTracker.findById(req.params.id, function(err, userTracker) {

        if (!userTracker)
            res.status(404).send("data is not found");
        else {
            userTracker.distance_used = req.body.distance_used;
            userTracker.save().then(userTracker => {
                res.json('UserTracker updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
            
    });
});

//delete
userTrackerRoutes.route('/delete/:id').delete(function (req, res) {
    UserTracker.findById(req.params.id, function(err, userTracker) {
        //remove the item from the list 
        User.findById(userTracker.user_id, function(err, user) {
            if (!user)
                res.status(404).send("User id data is not found");
            else{
                user.UserTrackerGroup.splice( user.UserTrackerGroup.indexOf(userTracker._id), 1 );
                
                user.save()
                .catch(err => {
                    res.status(400).send("User Update not possible");
                });
            }
        });

        Tracker.findById(userTracker.tracker_id, function(err, tracker) {
            if (!tracker)
                res.status(404).send("data is not found");
            else {
                tracker.UserTrackerGroup.splice( tracker.UserTrackerGroup.indexOf(userTracker._id), 1 );
                tracker.save()
                .catch(err => {
                    res.status(400).send("Tracker Update not possible");
                });
            }
                
            });
    });

    UserTracker.findByIdAndRemove({_id: req.params.id}, function(err, userTracker){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userTrackerRoutes;