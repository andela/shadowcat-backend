<<<<<<< HEAD

import mongoose from 'mongoose';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

const User = mongoose.model('User');

router.get('/user', (req, res, next) => {
=======
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';

const usersRouter = express.Router();

const User = mongoose.model('User');

usersRouter.get('/user', (req, res, next) => {
>>>>>>> staging
  User.findById(req.payload.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

<<<<<<< HEAD
router.put('/user', (req, res, next) => {
=======
usersRouter.put('/user', (req, res, next) => {
>>>>>>> staging
  User.findById(req.payload.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.user.username !== 'undefined') {
        user.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== 'undefined') {
        user.email = req.body.user.email;
      }
      if (typeof req.body.user.bio !== 'undefined') {
        user.bio = req.body.user.bio;
      }
      if (typeof req.body.user.image !== 'undefined') {
        user.image = req.body.user.image;
      }
      if (typeof req.body.user.password !== 'undefined') {
        user.setPassword(req.body.user.password);
      }

      return user.save().then(() => res.json({ user: user.toAuthJSON() }));
    })
    .catch(next);
});

<<<<<<< HEAD
router.post('/users/login', (req, res, next) => {
=======
usersRouter.post('/users/login', (req, res, next) => {
>>>>>>> staging
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }
  passport.authenticate('local', { session: false }, (
    err,
    user,
    info
  ) => {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({ user: user.toAuthJSON() });
    }
    return res.status(422).json(info);
  })(req, res, next);
});

<<<<<<< HEAD
router.post('/users', (req, res, next) => {
=======
usersRouter.post('/users', (req, res, next) => {
>>>>>>> staging
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(next);
});

export default usersRouter;
