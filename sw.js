// =====================
// GCalc service worker — offline support for a small static site.
//
// Strategy: the whole site is tiny, so we precache everything on
// install, then serve cache-first with a background refresh
// (stale-while-revalidate). Google Fonts are cached at runtime.
//
// DEPLOY NOTE: bump VERSION below whenever site files change so
// returning visitors pick up the new build.
// =====================
const VERSION = 'gcalc-v1';

const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './shared.js',
  './app.js',
  './manifest.json',
  './favicon.svg',
  './apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './404.html',
  './about/',
  './privacy-policy/',
  './calculators/age-calculator/',
  './calculators/bmi-calculator/',
  './calculators/calorie-calculator/',
  './calculators/date-calculator/',
  './calculators/fuel-calculator/',
  './calculators/grade-calculator/',
  './calculators/investment-calculator/',
  './calculators/loan-calculator/',
  './calculators/mortgage-calculator/',
  './calculators/percentage-calculator/',
  './calculators/scientific-calculator/',
  './calculators/tip-calculator/',
  './calculators/unit-converter/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isFonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  // Only handle our own assets (plus Google Fonts). Everything else —
  // analytics, ad scripts, etc. — goes straight to the network.
  if (url.origin !== location.origin && !isFonts) return;

  event.respondWith(staleWhileRevalidate(req));
});

// Cache-first with background update. Offline navigations to pages we
// never cached fall back to the precached homepage.
function staleWhileRevalidate(request) {
  return caches.open(VERSION).then(cache =>
    cache.match(request).then(cached => {
      const network = fetch(request).then(response => {
        // Cache successes (and opaque font responses). Never cache 404s —
        // GitHub Pages must keep serving its real 404 page when online.
        if (response && (response.ok || response.type === 'opaque')) {
          cache.put(request, response.clone());
        }
        return response;
      }).catch(() => cached || cache.match('./'));

      return cached || network;
    })
  );
}
