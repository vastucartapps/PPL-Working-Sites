import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';
import { LOCATIONS } from '../config/locations';

export const GET: APIRoute = async () => {
  const base = SITE_CONFIG.baseUrl;
  const cityLines = Object.values(LOCATIONS)
    .map((loc) => `- [${loc.name}, ${loc.state}](${base}/locations/${loc.slug}/)`)
    .join('\n');

  const body = `# ${SITE_CONFIG.brandName} Full Documentation

> Complete technical & compliance manual for ${SITE_CONFIG.brandName} -- Central Oregon's licensed EV charging installation network.

## System Overview
${SITE_CONFIG.brandName} coordinates residential and commercial Level 2 EV charger installations across Deschutes and Crook County, Oregon. All electrical work is performed by licensed Oregon electrical contractors holding active CCB credentials (${SITE_CONFIG.ccbLicenseNumber} network).

## Core Services & Architecture
- [Tesla Wall Connector (48A Hardwired)](${base}/services/tesla-wall-connector/): 11.52 kW continuous output on dedicated 60A breaker.
- [NEMA 14-50 240V Outlet](${base}/services/nema-14-50-upgrade/): 9.6 kW output on 50A breaker with required GFCI protection.
- [200A Electrical Panel Upgrade](${base}/services/panel-capacity-upgrade/): Main service panel heavy-up per NEC Article 220.
- [Commercial EV Hubs](${base}/services/commercial-ev-charging/): Multi-unit residential and commercial charging management.

## Rebates & Incentives
- **Local utility rebate:** cash-back incentive per qualifying Level 2 EVSE install, amount varies by utility provider and is confirmed at time of permit filing.
- **Federal 30C Credit:** federal tax credit program for qualifying EV charging equipment and installation costs -- consult a tax professional for current eligibility.

## Service Hubs
${cityLines}
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
