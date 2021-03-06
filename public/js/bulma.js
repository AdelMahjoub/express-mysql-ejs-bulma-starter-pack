window.addEventListener('DOMContentLoaded', function() {

  const navbarBurger = document.querySelector('.navbar-burger');
  const navbarMenu = document.querySelector('.navbar-menu');
  const notificationBtns = document.querySelectorAll('.delete');

  function toggleNavbarMenu(e) {
    if(navbarBurger.classList.contains('is-active')) {
      navbarBurger.classList.remove('is-active');
    } else {
      navbarBurger.classList.add('is-active');
    }

    if(navbarMenu.classList.contains('is-active')) {
      navbarMenu.classList.remove('is-active');
    } else {
      navbarMenu.classList.add('is-active');
    }
  }

  function closeNotification(e) {
    let notification = e.target.parentElement;
    notification.classList.add('is-hidden');
  }

  navbarBurger.addEventListener('click', toggleNavbarMenu, false);

  notificationBtns.forEach(btn => {
    if(btn) {
      btn.addEventListener('click', closeNotification, false);
    }
  });
  
});