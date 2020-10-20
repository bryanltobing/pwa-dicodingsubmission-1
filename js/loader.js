const loadNavigation = (page) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status !== 200) return;
      // Add Navigation Menu
      document.querySelectorAll('.topnav, .sidenav').forEach((element) => {
        element.innerHTML = xhttp.responseText;
      });
      document.querySelectorAll('.topnav a, .sidenav a').forEach((element) => {
        element.addEventListener('click', (event) => {
          // Close Sidenav
          const sidenav = document.querySelector('.sidenav');
          M.Sidenav.getInstance(sidenav).close();

          // Go to content
          page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      });
    }
  };

  xhttp.open('GET', 'template/navigation.html', true);
  xhttp.send();
};

const loadFooter = (page) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status !== 200) return;
      // Add Navigation Menu
      document.querySelectorAll('.footer').forEach((element) => {
        element.innerHTML = xhttp.responseText;
      });

      document.querySelectorAll('.footer a').
          forEach((element) => {
            element.addEventListener('click', (event) => {
              // Go to content
              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
    }
  };

  xhttp.open('GET', 'template/footer.html', true);
  xhttp.send();
};

const loadPage = (page) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const content = document.querySelector('#bodyContent');
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = '<p>Halaman tidak ditemukan</p>';
      } else {
        content.innerHTML = '<p>Halaman tidak dapat diakses</p>';
      }
      const linkToDocs = document.querySelector('.link');
      if (linkToDocs !== null) {
        linkToDocs.addEventListener('click', (event) => {
          // Go to docs
          page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      }
    }
  };
  xhttp.open('GET', 'template/pages/' + page + '.html', true);
  xhttp.send();
};

export {
  loadNavigation,
  loadFooter,
  loadPage,
};
