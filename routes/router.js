const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();

const User = require('../models/user.model.js');
const authRoutes = require('./authentication');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.route('/')
  .get((req, res, next) => {
    res.render('index');
  })
  .post((req, res, next) => {
    next(err);
  });

router.use(authRoutes);

router.use('*', (req, res, next) => {
  res.render('not-found');
});

router.use((err, req, res, next) => {
  res.redirect('/');
});

module.exports = router;