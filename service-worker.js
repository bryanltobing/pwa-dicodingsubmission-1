const CACHE_NAME = 'component';

const urlsToCache = [
  '/', '/index.html',
  '/template/navigation.html', '/template/footer.html',
  '/template/pages/about.html', '/template/pages/docs.html',
  '/template/pages/home.html', '/template/pages/story.html',
  '/css/materialize/materialize.min.css', '/css/style.css',
  '/js/materialize/materialize.min.js', '/js/loader.js',
  '/js/init.js',
  '/img/dicodinglogo.png', '/img/pwa1.png', '/img/pwa2.png',
  '/img/user1.jpeg', '/img/user2.jpg', '/img/user3.jpg',
  '/img/user4.jpg', '/img/user5.jpg', '/img/user6.jpg',
  '/img/icon-128.png', '/img/icon-256.png', '/img/icon-512.png',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches
          .open(CACHE_NAME)
          .then((cache) => {
            return cache.addAll(urlsToCache);
          }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches
          .match(event.request, {cacheName: CACHE_NAME})
          .then((response) => {
            if (response) {
              console.log(
                  'ServiceWorker: Gunakan aset dari cache: ',
                  response.url);
              return response;
            }

            console.log(
                'ServiceWorker: Memuat aset dari server: ',
                event.request.url,
            );
            return fetch(event.request);
          }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== CACHE_NAME) {
                console.log('Service worker: cache ' + cacheName + ' dihapus');
                return caches.delete(cacheName);
              }
            }),
        );
      }),
  );
});
