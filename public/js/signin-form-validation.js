window.addEventListener('DOMContentLoaded', function() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let submitBtn = document.querySelector('button[type="submit"]');
  submitBtn.setAttribute('disabled', '');

  window.addEventListener('keyup', function() {
    if(email.value && password.value) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', '');
    }
  }, false);
});