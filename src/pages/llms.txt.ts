import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';
import { LOCATIONS } from '../config/locations';

export const GET: APIRoute = async () => {
  const base = SITE_CONFIG.baseUrl;
  const cityLines = Object.values(LOCATIONS)
    .map((loc) => `- [${loc.name}, ${loc.state}](${base}/locations/${loc.slug}/): ${loc.utilityName} rebate filing and ${loc.permitOffice} trade permits.`)
    .join('\n');

  const body = `# ${SITE_CONFIG.brandName}

> ${SITE_CONFIG.defaultDescription}

## Core Pages & System Navigation
- [${SITE_CONFIG.brandName} Homepage](${base}/): Level 2 EV charger installation and utility rebate filing in Bend & Central Oregon.
- [Electrical Installation Services](${base}/services/): Level 2 EVSE installs, NEMA 14-50 outlets, and 200A panel upgrades.
- [Tesla Wall Connector Installation](${base}/services/tesla-wall-connector/): Hardwired 48A Level 2 charging on a dedicated 60A circuit breaker.
- [NEMA 14-50 Outlet Upgrade](${base}/services/nema-14-50-upgrade/): 240V 50A receptacle installation with GFCI breaker protection.
- [200A Panel Capacity Upgrade](${base}/services/panel-capacity-upgrade/): Service panel heavy-up for multi-EV charging demand.
- [Commercial EV Charging Hubs](${base}/services/commercial-ev-charging/): Multi-family and commercial fleet charging infrastructure.
- [EV Charging Speed & Cost Calculator](${base}/calculator/): Charging time and utility rebate estimate tool.
- [Central Oregon Service Locations](${base}/locations/): ${Object.values(LOCATIONS).map((l) => l.name).join(', ')} service hubs.
- [Knowledge Base & Technical Guides](${base}/blog/): Technical articles on NEC Article 625, Deschutes County permits, and rebates.
- [About ${SITE_CONFIG.brandName}](${base}/about/): Licensed Oregon electrical partner network credentials and ${SITE_CONFIG.ccbLicenseNumber} disclosures.
- [Request Fixed-Price Estimate](${base}/contact/): Free quote request form.

## Service Hubs
${cityLines}

## Technical Specifications & Details
- [Full Technical Manual](${base}/llms-full.txt): Complete structured text context for AI agents.
- [XML Sitemap](${base}/sitemap.xml): Machine-readable sitemap, generated from the live route list.
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
