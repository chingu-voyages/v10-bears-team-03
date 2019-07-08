const Tracker = require('../../models/Tracker');

module.exports = (app) => {
  app.get('/api/trackers', (req, res, next) => {
    Tracker.find()
      .exec()
      .then((tracker) => res.json(tracker))
      .catch((err) => next(err));
  });

  app.post('/api/trackers', function (req, res, next) {
    const tracker = new Tracker();

    tracker.save()
      .then(() => res.json(tracker))
      .catch((err) => next(err));
  });

  app.delete('/api/trackers/:id', function (req, res, next) {
    Tracker.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((tracker) => res.json())
      .catch((err) => next(err));
  });
};