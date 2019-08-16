import passport from 'passport';
<<<<<<< HEAD
import passportLocal from 'passport-local';
import mongoose from 'mongoose';

const LocalStrategy = passportLocal.Strategy;
=======
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';

>>>>>>> staging
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    ((email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: { 'email or password': 'is invalid' }
            });
          }

          return done(null, user);
        })
        .catch(done);
    })
  )
);
