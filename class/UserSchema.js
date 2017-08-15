const validator = require('validator');

/**
 * Blueprint for the User model
 */
class UserSchema {
  constructor(props) {
    this.id = props['id'] || null;
    this.googleId = props['googleId'] ? validator.escape(props['googleId']) : null;
    this.displayName = props['displayName'] ? validator.escape(props['displayName']) : null;
    this.username = props['username'] ? validator.escape(props['username']) : '';
    this.email = props['email'] ? validator.escape(props['email']) : '';
    this.password = props['password'] || '';
    this.signupDate = props['signupDate'] || null;
    this.isAdmin = props['isAdmin'] || false;
    this.confirmToken = props['confirmToken'] || null;
    this.confirmed = props['confirmed'] || false;
  }
  
  /**
   * if a User object has valid credentials return an empty array
   * if a User object has invalid credentials return an array errors messages
   */
  validationResults() {
    let validationErrors = [];
    if(!this.validUsername()) {
      validationErrors.push('The username length should be between 4 and 20 characters');
    }
    if(!this.validEmail()) {
      validationErrors.push('The email address is not valid');
    }
    if(!this.validPassword()) {
      validationErrors.push('The password length should be between 6 and 20 characters');
    }
    return validationErrors;
  }

  /**
   * return true if the username is valid
   * return false if the username is not valid
   */
  validUsername() {
    return this.username.length >= 4 && this.username.length <= 20;
  }

  /**
   * return true if the email is valid
   * return false if the email is not valid
   */
  validEmail() {
    return validator.isEmail(this.email);
  }

  /**
   * return true if the password is valid
   * return false if the password is not valid
   */
  validPassword() {
    return this.password.length >= 6 && this.password.length <= 20;
  }
}

module.exports = UserSchema;