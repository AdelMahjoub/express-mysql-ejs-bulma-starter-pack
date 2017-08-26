const User = require('../models/user.model');
const dns = require('dns');
const mailer = require('../class/Mailer');

module.exports = function(req, res, next) {
  // Form validation errors list
  let validationErrors = [];

  // The password and the confirm password fields do not matches
  if(Buffer.compare(Buffer.from(req.body['password']), Buffer.from(req.body['confirmPassword'])) !== 0) {
    validationErrors.push('Passwords mismatches');
  }
  
  // Candidate user to register
  let newUser = new User({
    username: req.body['username'],
    email: req.body['email'],
    password: req.body['password']
  });

  // Candidate user credentials are not valid
  if(newUser.validationResults().length > 0) {
    validationErrors = [... newUser.validationResults()];
  }

  // Check errors
  if(validationErrors.length > 0) {
    req.flash('error', [... validationErrors]);
    return res.redirect('/signup');
  }

  // Check if the email hostname contains MX records
  let emailHostname = newUser.email.split('@')[1];
  
  dns.resolveMx(emailHostname, (err, records) => {
    if(err || !records[0]) {
      req.flash('error', [`${newUser.email} do not exists`]);
      return res.redirect('/signup');
    }
    // Try insert the Candidate user
    User.insert(newUser)
      .then(result => {
        // Inserted 
        User.findById(result.insertId)
          .then(insertedUser => {
            let hostname = process.env.NODE_ENV === 'production' ? req.hostname : 'http://localhost:3000';
            mailer.sendVerificationMail(insertedUser, hostname)
              .then(info => {
                req.flash('info', 'Check your inbox for the verification token');
                return res.redirect('/confirm');
              })
              .catch(err => {
                console.log(err);
                req.flash('error', ['Unexpected error, please try again']);
                return res.redirect('/signup');
              })
          })
          .catch(err => {
            console.log(err);
            req.flash('error', ['Unexpected error, please try again']);
            return res.redirect('/signup');
          })
      })
      .catch(err => {
        console.log(err);
        // Candidate user's email is already registred
        if(err.includes('ER_DUP_ENTRY')) {
          validationErrors.push('This email address is already registred');
        } else {
          validationErrors.push('Unexpected error, please try again');
        }
        req.flash('error', [... validationErrors]);
        return res.redirect('/signup');
      });
  });
}