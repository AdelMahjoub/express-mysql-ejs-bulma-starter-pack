const express = require('express');
const passport = require('passport');

const auth = express.Router();

const AuthGuard = require('../class/AuthGuard');

const signupController = require('../controllers/signup.controller');

auth.route('/signup')
  .get((req, res, next) => {
    res.render('signup');
  })
  .post(AuthGuard.reCaptcha, signupController, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password',
  }));

auth.route('/signin')
  .get((req, res, next) => {
    res.render('signin');
  })
  .post(AuthGuard.reCaptcha, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password',
  }));

auth.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

auth.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: 'Unexpected error, please try again'
}));

auth.get('/logout', AuthGuard.loginRequired, (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    res.redirect('/');
  });
});

module.exports = auth;