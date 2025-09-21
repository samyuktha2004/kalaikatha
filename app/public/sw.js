const CACHE_NAME = 'kalaikatha-cache-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/src/index.css',
  '/src/styles/App.css',
  '/assets/logo.svg',
  '/dist/index.html',
  '/dist/assets/index.js',
  '/dist/assets/vendor.js',
  '/dist/assets/index.css'
];

// Cache names for different types of content
const RUNTIME_CACHE = 'runtime-cache-v1';
const API_CACHE = 'api-cache-v1';

// API endpoints to cache
const API_ENDPOINTS = [
  '/products/',
  '/my-products',
  '/get-analytics-data'
];

// Helper function to determine if a request is an API call
const isApiRequest = (url) => {
  return API_ENDPOINTS.some(endpoint => url.includes(endpoint));
};

// Install event - cache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache app shell
      caches.open(CACHE_NAME).then(cache => {
        console.log('Caching app shell');
        return cache.addAll(APP_SHELL);
      }),
      // Create runtime cache
      caches.open(RUNTIME_CACHE)
    ])
    .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => ![CACHE_NAME, RUNTIME_CACHE, API_CACHE].includes(name))
          .map(name => {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Optional: Clean old API responses (older than 24 hours)
      return caches.open(API_CACHE).then(cache => {
        return cache.keys().then(requests => {
          return Promise.all(
            requests.map(request => {
              return cache.match(request).then(response => {
                if (response) {
                  const fetchDate = new Date(response.headers.get('date'));
                  if ((new Date() - fetchDate) > (24 * 60 * 60 * 1000)) {
                    return cache.delete(request);
                  }
                }
              });
            })
          );
        });
      });
    })
  );
});

// Fetch event with API caching strategy
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // HTML navigation - network first with cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // App shell assets - cache first
  if (APP_SHELL.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  // API requests - cache first, then network
  if (event.request.method === 'GET' && isApiRequest(event.request.url)) {
    event.respondWith(
      caches.open(API_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(response => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => {
            console.log('Fetch failed; returning cached response');
            return cached;
          });

          // Return cached response immediately if available
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Other GET requests - network first with runtime caching
  if (event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Pass through all other requests
  event.respondWith(fetch(event.request));
});