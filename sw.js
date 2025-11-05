// Service Worker: simple cache-first strategy for static assets to improve repeat-visit performance
const CACHE_VERSION = 'v1';
const CORE_CACHE = `portfolio-core-${CACHE_VERSION}`;
const RUNTIME_IMAGE_CACHE = `portfolio-images-${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/assets/fonts/kode_mono/Kode[wght].woff2',
  '/assets/img/socials/github-142-svgrepo-com.svg',
  '/assets/img/socials/linkedin-rounded-svgrepo-com.svg',
  '/assets/img/socials/Twitter-X--Streamline-Bootstrap.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE).then((cache) => {
      // Attempt to cache core assets; ignore failures for cross-origin items
      return cache.addAll(CORE_ASSETS.map(url => new Request(url, {integrity: '', cache: 'reload'}))).catch(() => {
        // Fallback: add without special request if any addAll fails
        return Promise.all(CORE_ASSETS.map(u => fetch(u).then(r => cache.put(u, r.clone())).catch(() => {})));
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CORE_CACHE && k !== RUNTIME_IMAGE_CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Helper: cache-first for same-origin static, runtime caching for images, network-first for navigations
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Don't interfere with analytics or third-party scripts (allow network)
  if (url.hostname.includes('simpleanalyticscdn.com') || url.hostname.includes('unpkg.com')) {
    return; // fall through to network
  }

  // Navigation requests (HTML) - network-first with cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        // update cache
        caches.open(CORE_CACHE).then(cache => cache.put('/index.html', res.clone()));
        return res;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Images (including cross-origin like Cloudinary) - cache-first then network & populate image cache
  if (req.destination === 'image' || url.hostname.includes('res.cloudinary.com')) {
    event.respondWith(
      caches.open(RUNTIME_IMAGE_CACHE).then(cache => cache.match(req).then(cached => cached || fetch(req).then(netRes => { cache.put(req, netRes.clone()); return netRes; }).catch(() => cached)))
    );
    return;
  }

  // For other same-origin requests (css, js, fonts) use cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(netRes => {
        // cache built responses for future
        if (req.method === 'GET') {
          caches.open(CORE_CACHE).then(cache => cache.put(req, netRes.clone()));
        }
        return netRes;
      }).catch(() => cached))
    );
    return;
  }

  // Default: let network handle it
});

// NOTE: This service worker helps repeat-visit performance locally even if server cache headers are short.
// For best results, configure your web server to set Cache-Control headers for static assets (fonts/images/css/js)
// with a long max-age and `immutable` for fingerprinted files, and a short TTL for HTML.
