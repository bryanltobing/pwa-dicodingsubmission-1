import {loadNavigation, loadFooter, loadPage} from './loader.js';

document.addEventListener('DOMContentLoaded', () => {
  // Sidenav Activation
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);

  // Load Content for Every Menu
  let page = window.location.hash.substr(1);
  if (page == '') page = 'home';

  loadNavigation(page);
  loadFooter(page);
  loadPage(page);
});


