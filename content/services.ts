/**
 * Service catalog — the 4 Level 2 EV charger services this site offers.
 * Per SOP §29 (no pricing in UI) + [[no-fabricated-claims]]: NO priceRange.
 * Quote happens on the phone after the panel details and a real load calc.
 */
import type { ServiceOffer } from '@ppl/shared/lib/schema-gen';
import { BUSINESS } from './business';

export const SERVICES: readonly ServiceOffer[] = [
  {
    name: 'Level 2 Charger Installation',
    description: 'A dedicated 240V circuit and a hardwired or plug-in Level 2 EVSE, sized off a real panel load calculation, wire and breaker rated to 125 percent of the continuous draw, grounded and bonded, permitted and inspected. The core install for a Bend homeowner who wants to wake up to a full battery instead of waiting on a 120V outlet.',
    url: `${BUSINESS.siteUrl}/services/level-2-charger-install/`,
    priceCurrency: 'USD',
  },
  {
    name: 'EV Panel & Service Upgrade',
    description: 'When the load calc says the existing panel cannot carry an EV circuit, we upgrade the service or add a subpanel first, then run the charger circuit. The honest fix for a full panel or an older 100-amp service — done by a licensed Oregon electrician, permitted, so the EV circuit lands on capacity it actually has.',
    url: `${BUSINESS.siteUrl}/services/ev-panel-upgrade/`,
    priceCurrency: 'USD',
  },
  {
    name: 'NEMA 14-50 Outlet Install',
    description: 'A 240V NEMA 14-50 outlet on a dedicated 50-amp circuit for a plug-in Level 2 charger — flexible, unpluggable, and often the simpler install. The right call when you want to move the unit, charge at up to 40 amps, or keep a portable EVSE rather than hardwire to the wall.',
    url: `${BUSINESS.siteUrl}/services/nema-14-50-outlet/`,
    priceCurrency: 'USD',
  },
  {
    name: 'Multi-Unit & Multi-Charger Wiring',
    description: 'EV charging for two cars, an ADU, a duplex, or a small multi-family property — load management, subpanels, and multiple circuits planned as one job so the service is not overrun. The setup for households adding a second EV or property owners wiring charging for tenants.',
    url: `${BUSINESS.siteUrl}/services/multi-unit-ev-charging/`,
    priceCurrency: 'USD',
  },
];
