const express = require('express');
const userRoutes = express.Router();

let UserTracker = require('../../models/UserTracker');
let User = require('../../models/User');
let Tracker = require('../../models/Tracker');

//index
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//show
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, users) {
        res.json(users);
    });
});

//add
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

//edit?
userRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user){
        res.json(user);
    });
  });

//update
userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.name = req.body.name;
            user.username = req.body.username;
            user.email = req.body.email;
            user.dateCreated = req.body.dateCreated;
            
            user.save().then(user => {
                res.json('User updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//delete 
userRoutes.route('/delete/:id').delete(function (req, res) {
    // UserTracker.find({ user_id: req.params.id }, function(err, userTrackers){
    //     userTrackers.forEach(element => {
    //         Tracker.findById(element.tracker_id, function(err, tracker) {
    //             if (!tracker)
    //                 res.status(404).send("data is not found");
    //             else
    //                 tracker.UserTrackerGroup.push(userTracker._id)
                    
    //                 tracker.save()
    //                 .catch(err => {
    //                     res.status(400).send("Tracker Update not possible");
    //                 });
    //             });
    //     });
    // })
    // UserTracker.remove({ user_id: req.params.id })
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else {
            user.UserTrackerGroup.forEach(element => {
                UserTracker.findByIdAndRemove({_id: element}, function(err, userTracker){
                    if(err) res.json(err);
                    else {
                        Tracker.findById(userTracker.tracker_id, function(err, tracker) {
                            if (!tracker)
                                res.status(404).send("data is not found");
                            else{
                                tracker.UserTrackerGroup.splice( tracker.UserTrackerGroup.indexOf(userTracker._id), 1 );
                                tracker.save()
                                .catch(err => {
                                    res.status(400).send("Tracker Update not possible");
                                });
                            }
                        });
                    }
                })
            })
            res.json('Successfully removed');
        }
    });
});

module.exports = userRoutes;