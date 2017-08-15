const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports = function() {
  passport.use('local', new LocalStrategy({
      usernameField: 'email'
    },
    function(username, password, done) {
      let candidate = new User({
        email: username,
        password: password
      });
      User.findByEmail(candidate)
        .then(user => {
          if(!user) {
            return done(null, false);
          }
          if(!User.comparePasswords(candidate.password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(err => {
          console.log(err);
          return done(err);
        });
    }  
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        done(null, user)
      })
      .catch(err => {
        console.log(err);
        done(err, false);
      });
  });
}