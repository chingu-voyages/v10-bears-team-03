const express = require('express');
const trackerRoutes = express.Router();

let UserTracker = require('../../models/UserTracker');
let User = require('../../models/User');
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
    console.log('trackers rethrued: ', trackers);
    res.json(trackers);
  });
});

//add
trackerRoutes.route('/add').post(function(req, res) {
  let tracker = new Tracker(req.body);
  tracker
    .save()
    .then(tracker => {
      res.status(200).json({ tracker: 'tracker added successfully' , ...tracker._doc});
    })
    .catch(err => {
      res.status(400).send('adding new tracker failed');
    });
});

//edit?
trackerRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id;
  Tracker.findById(id, function(err, tracker) {
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
            tracker.type = req.body.type;
            tracker.expire = req.body.expire;
            tracker.price = req.body.price;

            tracker.save().then(tracker => {
                res.json({tracker: 'Tracker updated!' , ...tracker._doc});
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
        else {
            tracker.UserTrackerGroup.forEach(element => {
                UserTracker.findByIdAndRemove({_id: element}, function(err, userTracker){
                    if(err) res.json(err);
                    else {
                        User.findById(userTracker.user_id, function(err, user) {
                            if (!user){
                                res.status(404).send("User id data is not found");
                            }
                            else {
                                user.UserTrackerGroup.splice( user.UserTrackerGroup.indexOf(userTracker._id), 1 );
                                user.save()
                                .catch(err => {
                                    res.status(400).send("User Update not possible");
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
//very distructive for removing all things only.
trackerRoutes.route('/deleteall/').delete(function (req, res){
  Tracker.remove({})
  .then(() => {
    UserTracker.remove({})
    .then(() => {
      User.remove({})
      .then(() => {
        res.status(400).send("remove all Tracker, User, and UserTracker");
      })
    })
  })
})

module.exports = trackerRoutes;
