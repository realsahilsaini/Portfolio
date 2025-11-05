# Portfolio

## Caching & deployment recommendations

To improve repeat-visit performance and avoid unnecessary downloads (savings ~40 KiB observed), configure your hosting to use long cache lifetimes for static, fingerprinted assets and short TTLs for HTML.

Recommended Cache-Control rules:

- HTML (index.html): Cache-Control: public, max-age=0, must-revalidate (or short, e.g. 60s)
- CSS / JS / Fonts / Images (fingerprinted): Cache-Control: public, max-age=31536000, immutable
- Non-fingerprinted static assets: Cache-Control: public, max-age=604800 (1 week)

If you cannot change server headers immediately, a small service worker (`/sw.js`) is included to provide effective client-side caching for repeat visits. The SW uses a cache-first policy for CSS/JS/fonts/images and network-first for HTML navigations.

Deploy tips:

- Netlify: use `_headers` to set Cache-Control values.
- GitHub Pages: use a CDN or set cache headers via a reverse proxy or by deploying with a build step that fingerprints assets.
- IIS / Apache / Nginx: set `Cache-Control` in server config for static file routes.

Verify caching by running Lighthouse or checking DevTools → Network and looking at `200 (from ServiceWorker)` or `cache-control` response headers.


