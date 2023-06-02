// service-worker.js

// Cache version
const CACHE_VERSION = "v1";

// Cache assets
const cacheAssets = [
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/images/logo.png",
  // Add more assets to cache as needed
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => {
        console.log("Cache opened");
        return cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_VERSION) {
              console.log("Clearing old cache");
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
