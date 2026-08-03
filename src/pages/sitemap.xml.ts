import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';
import { LOCATIONS } from '../config/locations';

const articleSlugs = [
  '200-amp-electrical-panel-upgrade-bend-or',
  'bend-electrician-rates-2026',
  'central-electric-coop-ev-rebates-deschutes-county',
  'chargepoint-home-flex-vs-tesla-wall-connector',
  'commercial-fleet-ev-charger-installation-redmond-or',
  'detached-garage-underground-conduit-ev-charger-bend-or',
  'do-i-need-200-amp-panel-for-ev-charger',
  'emporia-ev-charger-installation-guide',
  'ev-charger-installation-corvallis-or',
  'ev-charger-installation-redmond-or',
  'ev-charger-installation-salem-or',
  'ev-charger-repair-and-troubleshooting-bend-or',
  'federal-30c-tax-credit-ev-charger-installation',
  'ford-f150-lightning-charge-station-pro-bend-or',
  'garage-subpanel-installation-for-ev-charger-bend-or',
  'grizzl-e-smart-ev-charger-cold-weather-review',
  'hardwired-vs-plugin-ev-charger',
  'heat-pump-plus-ev-charger-electrical-panel-load-bend-or',
  'how-much-does-it-cost-to-install-ev-charger-in-garage',
  'level-2-ev-charger-installation-bend-or',
  'nacs-vs-j1772-ev-charger-adapter-guide-2026',
  'nec-article-220-ev-charger-load-calculation',
  'pacific-power-ev-charger-rebate-oregon-guide',
  'pacific-power-ev-rebates',
  'permits-deschutes-county',
  'rivian-r1t-r1s-level-2-charger-bend-or',
  'solar-panel-ev-charger-integration-bend-or',
  'tesla-cybertruck-ev-charger-installation-bend-or',
  'tesla-wall-connector-installation-bend-or',
  'vacation-rental-airbnb-ev-charger-installation-sunriver-or'
];

const serviceSlugs = [
  'tesla-wall-connector',
  'nema-14-50-upgrade',
  'panel-capacity-upgrade',
  'commercial-ev-charging'
];

const cityKeys = Object.keys(LOCATIONS);

export const GET: APIRoute = async () => {
  const pages: string[] = [
    '',
    '/about',
    '/contact',
    '/calculator',
    '/contractor-disclosure',
    '/privacy',
    '/services',
    '/locations',
    '/blog'
  ];

  // Core Service Pages
  serviceSlugs.forEach((service) => {
    pages.push(`/services/${service}`);
  });

  // Root Article Pages
  articleSlugs.forEach((slug) => {
    pages.push(`/${slug}`);
  });

  // Location Hub Pages & Sub-pages
  cityKeys.forEach((cityId) => {
    pages.push(`/locations/${cityId}`);
    pages.push(`/locations/${cityId}/about`);
    pages.push(`/locations/${cityId}/contact`);
    pages.push(`/locations/${cityId}/calculator`);
    pages.push(`/locations/${cityId}/services`);

    serviceSlugs.forEach((service) => {
      pages.push(`/locations/${cityId}/services/${service}`);
    });

    articleSlugs.forEach((slug) => {
      pages.push(`/locations/${cityId}/${slug}`);
    });
  });

  const lastMod = new Date().toISOString();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_CONFIG.baseUrl}${page}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/services') || page.startsWith('/locations') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
