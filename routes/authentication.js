const express = require('express');
const passport = require('passport');

const auth = express.Router();

const AuthGuard = require('../class/AuthGuard');

const signupController = require('../controllers/signup.controller');
const confirmController = require('../controllers/confirm.controller');

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
  .post(AuthGuard.reCaptcha, AuthGuard.confirmRequired, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password',
  }));

auth.route('/confirm')
  .get((req, res, next) => {
    res.render('confirm');
  })
  .post(AuthGuard.reCaptcha, confirmController);

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