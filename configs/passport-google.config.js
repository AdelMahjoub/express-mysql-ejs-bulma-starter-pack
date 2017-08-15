const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const shortid = require('shortid');
const mailer = require('../class/Mailer');

const User = require('../models/user.model');
const callbackUrl = process.env.NODE_ENV === 'production' ?
  process.env.GOOGLE_AUTH_CALLBACK : 'http://localhost:3000/auth/google/callback';

module.exports = function() {
 passport.use('google', new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      // id from the google profile
      let googleId = profile['id'];

      // Try find a user by google id
      User.findByGoogleId(googleId)
        .then(user => {
          // User already registred with his google profile: authenticate
          if(user) {
            return done(null, user);
          }
          // User never registred with his google profile: insert a new user
          // Attribute a username and a password for the new user
          // Even though the user authenticate with a Single Sign On
          // he may want to update his app profile
          // for this reason he gets a username and a password
          let autoPass = shortid.generate();
          let autoUsername = `user-${shortid.generate()}`;
          let candidate = new User({
            googleId: googleId,
            displayName: profile['displayName'],
            email: profile['emails'][0]['value'],
            password: autoPass,
            username: autoUsername
          });
          User.insert(candidate)
            .then(results => {
              User.findByGoogleId(googleId)
                .then(newUser => {
                  mailer.sendAccountActivatedMail(newUser)
                    .then(info => {
                      return done(null, newUser);
                    })
                    .catch(err => {
                      console.log(err);
                      return done(null, newUser);
                    })
                })
                .catch(err => {
                  console.log(err);
                  return done(err, false);
                });
            })
            .catch(err => {
              console.log(err);
              return done(err, false);
            });
        })
        .catch(err => {
          console.log(err);
          return done(err, false);
        });      
    }
  ));
}