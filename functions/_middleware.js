// Subdomain rewrite (e.g. bend.evchargerone.com -> /locations/bend/), kept as
// a safety net in case wildcard DNS is ever configured -- not currently live
// (bend.evchargerone.com does not resolve). Previously lived in
// public/_worker.js, which Cloudflare Pages treats as the sole request
// handler for the whole site whenever it's present, silently overriding
// functions/api/* routes entirely. Moved here so /api/submit actually works.

const VALID_CITIES = ['bend', 'redmond', 'sisters', 'sunriver', 'la-pine', 'prineville', 'corvallis'];

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const hostname = url.hostname;
  const parts = hostname.split('.');
  let subdomain = '';

  if (parts.length >= 3 && !hostname.endsWith('.pages.dev')) {
    subdomain = parts[0].toLowerCase();
  }

  if (subdomain && subdomain !== 'www' && VALID_CITIES.includes(subdomain)) {
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = `/locations/${subdomain}/`;
    } else if (!url.pathname.startsWith(`/locations/${subdomain}`)) {
      url.pathname = `/locations/${subdomain}${url.pathname}`;
    }
    return next(new Request(url, request));
  }

  return next();
}
