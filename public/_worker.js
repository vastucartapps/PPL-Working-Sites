// Cloudflare Pages Edge Worker Router for Dynamic Subdomain Rewriting (*.evchargerone.com)

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Extract subdomain (e.g. "bend" from "bend.evchargerone.com")
    const parts = hostname.split('.');
    let subdomain = '';

    if (parts.length >= 3 && !hostname.endsWith('.pages.dev')) {
      subdomain = parts[0].toLowerCase();
    }

    const validCities = ['bend', 'redmond', 'sisters', 'sunriver', 'la-pine', 'prineville'];

    // If request comes from a valid city subdomain (e.g. bend.evchargerone.com)
    if (subdomain && validCities.includes(subdomain) && subdomain !== 'www') {
      // Internal rewrite to static location output without changing browser URL
      if (url.pathname === '/' || url.pathname === '') {
        url.pathname = `/locations/${subdomain}/`;
      } else if (!url.pathname.startsWith(`/locations/${subdomain}`)) {
        url.pathname = `/locations/${subdomain}${url.pathname}`;
      }
      return env.ASSETS.fetch(url);
    }

    return env.ASSETS.fetch(request);
  }
};
