const User = require('../models/user.model');
const mailer = require('../class/Mailer');

module.exports = function(req, res, next) {

  let email = req.body['email'];
  let confirmToken = req.body['confirmToken'];

  User.findByEmail({email})
    .then(user => {
      if(user && (confirmToken === user['confirmToken'])) {
        User.confirm(user.id)
          .then(result => {
            mailer.sendAccountActivatedMail(user)
              .then(info => {
                req.flash('info', ['Account confirmed and activated ! Signin to proceed.']);
                return res.redirect('/signin');
              })
              .catch(err => {
                console.log(err);
                req.flash('error', ['Unexpected error, please try again']);
                return res.redirect('/confirm');
              })
          })
          .catch(err => {
            console.log(err);
            req.flash('error', ['Unexpected error, please try again']);
            return res.redirect('/confirm');
          })
      } else {
        req.flash('error', ['Invalid email or confirmation token']);
        return res.redirect('/confirm');
      }
    })
    .catch(err => {
      console.log(err);
      req.flash('error', ['Unexpected error, please try again']);
      return res.redirect('/confirm');
    });
}