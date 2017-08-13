window.addEventListener('DOMContentLoaded', function() {

  const formControls = [];
  const inputFields = document.querySelectorAll('input');
  const submitBtn = document.querySelector('button[type="submit"]');

  const Validators = {
    isEmail: function(value) {
      const email = value.toString();
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = emailRegex.test(email);
      let msg = isValid ? '' : 'Not a valid email address';
      return { isValid, msg }
    },
    isUsername: function(value) {
      const username = value.toString();
      const isValid = (username.length >= 4) && (username.length <= 20);
      let msg = isValid ? '' : 'The username length should be between 4 and 20 characters';
      return { isValid, msg }
    },
    isPassword: function(value) {
      const password = value.toString();
      const isValid = (password.length >= 6) && (password.length <= 20);
      let msg = isValid ? '' : 'The password length should be between 6 and 20 characters';
      return { isValid, msg }
    },
    isEqual: function(guess, value) {
      const candidate = guess.toString();
      const final = value.toString();
      const isValid = (candidate === final) && final !== '';
      let msg = isValid ? '' : (final !== '' ? 'Passwords do not matches': 'The password is required');
      return { isValid, msg }
    }
  }

  class FormControl {
    constructor(domElement, validator) {
      this.name = domElement.name;
      this.node = domElement;
      this.value = domElement.value;
      this.validator = validator;
      this.help = domElement.parentElement.nextElementSibling;
      this.stateIcon = domElement.nextElementSibling.nextElementSibling;
      this.isValid = false;
    }

    feedbadck () {
      if(!this.isValid) {
        this.stateIcon.firstElementChild.setAttribute('class', 'fa fa-warning');
        this.node.setAttribute('class', 'input is-danger');
        this.help.setAttribute('class', 'help is-danger');
      } else {
        this.stateIcon.firstElementChild.setAttribute('class', 'fa fa-check');
        this.node.setAttribute('class', 'input is-success');
        this.help.setAttribute('class', 'help is-success');
      }
    }
  }

  function initFormControls() {
    inputFields.forEach(field => {
      let validator;
      switch(field.name) {
        case 'username':
          validator = Validators.isUsername;
        break;
        case 'email':
          validator = Validators.isEmail;
        break;
        case 'password':
          validator = Validators.isPassword;
        break;
        case 'confirmPassword':
          validator = Validators.isEqual;
        break;
        default:
      }
    formControls.push(new FormControl(field, validator));
    });
  }

  initFormControls();

  submitBtn.setAttribute('disabled', '');

  formControls.forEach(control => {

    control.stateIcon.setAttribute('style', '');

    control.node.addEventListener('keyup', function(e) {
      
      let validationResult;
      control.value = e.target.value;
      
      if(control.name === 'confirmPassword') {
        let password = document.getElementById('password').value;
        validationResult = control.validator(control.value, password);
      } else {
        validationResult = control.validator(control.value);
      }
      
      control.isValid = validationResult.isValid;
      control.help.textContent = validationResult.msg;

      if(control.name === 'password') {
        let confirmPasswordControl = formControls.filter(control => control.name === 'confirmPassword')[0];
        let confirmPasswordField = document.getElementById('confirmPassword');
        confirmPasswordField.value = '';
        confirmPasswordControl.value = '';
        confirmPasswordControl.isValid = false;
        confirmPasswordControl.feedbadck();
      }
      control.feedbadck();
    }, false);
  });

  window.addEventListener('keyup', function(e) {
    let validControls = [];
    formControls.forEach(control => {
      validControls.push(control.isValid);
    });
    let formIsValid = validControls.reduce((a, b) => a && b, true);
    if(formIsValid) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', '');
    }
  }, false);
});