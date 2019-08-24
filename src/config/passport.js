import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';

const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: { 'email or password': 'is invalid' }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
