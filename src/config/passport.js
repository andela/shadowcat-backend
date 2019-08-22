import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { googleCredentials, facebookCredentials } from './socialMediaCredentials';

import models from '../models';

const { User } = models;

passport.serializeUser((user, done) => done(null, user.userId));
passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({
    where: {
      userId: id
    }
  });
  return done(null, user);
});
passport.use(new GoogleStrategy(
  {
    clientID: googleCredentials.clientID,
    clientSecret: googleCredentials.clientSecret,
    callbackURL: googleCredentials.callbackURL,
    passReqToCallback: true
  }, async (request, accessToken, refreshToken, profile, done) => {
    try {
      const { _json: userDetails } = profile;
      const {
        email, sub: userId, given_name: firstname, family_name: lastname
      } = userDetails;
      const result = await User.findOrCreate({
        where: {
          userId
        },
        defaults: {
          firstname: firstname || 'noname',
          lastname: lastname || 'noname',
          email
        }
      });
      const [userData, created] = result;
      const user = userData.get({ plain: true });
      user.newUser = created;
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.use(new FacebookStrategy(
  {
    clientID: facebookCredentials.clientID,
    clientSecret: facebookCredentials.clientSecret,
    callbackURL: facebookCredentials.callbackURL,
    profileFields: ['id', 'displayName', 'gender', 'emails']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { _json: userDetails } = profile;
      const { id: userId, name, email } = userDetails;
      const splittedNames = name.split(' ');
      const result = await User.findOrCreate({
        where: {
          userId
        },
        defaults: {
          firstname: splittedNames[0] || 'noname',
          lastname: splittedNames[2] || 'noname',
          email
        }
      });
      const [userData, created] = result;
      const user = userData.get({ plain: true });
      user.newUser = created;
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
