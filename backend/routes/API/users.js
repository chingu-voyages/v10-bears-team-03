const User = require('../../models/User');

module.exports = (app) => {
  app.get('/api/user', (req, res, next) => {
    User.find()
      .exec()
      .then((user) => res.json(user))
      .catch((err) => next(err));
  });

  app.post('/api/user', function (req, res, next) {
    const user = new User();

    user.save()
      .then(() => res.json(user))
      .catch((err) => next(err));
  });

  app.delete('/api/user/:id', function (req, res, next) {
    User.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((user) => res.json())
      .catch((err) => next(err));
  });
};