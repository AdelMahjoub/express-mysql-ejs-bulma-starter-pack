const User = require('../models/user.model.js');

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

  // Try insert the Candidate user
  User.insert(newUser)
    .then(results => {
      // Inserted the Candidate user
      req.flash('info', 'Registred a new user');
      next();
    })
    .catch(err => {
      // Candidate user's email is already registred
      if(err.includes('ER_DUP_ENTRY')) {
        validationErrors.push('This email address is already registred');
      } else {
        validationErrors.push('Unexpected error, please try again');
      }
      req.flash('error', [... validationErrors]);
      return res.redirect('/signup');
    });
}