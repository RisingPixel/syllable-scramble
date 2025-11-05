const CACHE_VERSION = 'v1';
const DICT_CACHE_NAME = `dictionaries-${CACHE_VERSION}`;

// Install event - skip waiting to activate immediately
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker installing...');
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('dictionaries-'))
          .filter(name => name !== DICT_CACHE_NAME)
          .map(name => {
            console.log(`🗑️ Deleting old cache: ${name}`);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache dictionaries aggressively
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache dictionary files
  if (url.pathname.includes('/dictionaries/') && url.pathname.endsWith('.txt')) {
    event.respondWith(
      caches.open(DICT_CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            console.log(`📚 Dictionary from cache: ${url.pathname}`);
            return cachedResponse;
          }
          
          console.log(`📥 Downloading dictionary: ${url.pathname}`);
          return fetch(event.request).then(response => {
            // Only cache successful responses
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(error => {
            console.error(`❌ Failed to fetch dictionary: ${url.pathname}`, error);
            throw error;
          });
        });
      })
    );
    return;
  }
  
  // Default: network first for all other requests
  event.respondWith(fetch(event.request));
});
