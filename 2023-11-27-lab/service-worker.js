// Service Worker

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/~rdvyas/5130f2023/2023-11-27-lab/index.html',
  '/~rdvyas/5130f2023/2023-11-27-lab/signup.html',
  '/~rdvyas/5130f2023/2023-11-27-lab/index.js',
  '/~rdvyas/5130f2023/2023-11-27-lab/signup.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
