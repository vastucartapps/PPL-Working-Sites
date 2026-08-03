/**
 * Centralized copy — single source of truth for repeated UI strings.
 * EV charger site (Bend, OR). Considered-purchase funnel, not emergency.
 */
import { BUSINESS } from './business';

const { city, county, stateFull } = BUSINESS.location;

export const SITE_COPY = {
  hours: {
    weekday: 'Mon–Fri 7 a.m. – 6 p.m. PT',
    weekend: 'Sat 8 a.m. – 2 p.m. PT',
    holidayNote: 'After-hours messages returned the next business morning',
  },
  phoneFirst: 'Phone first · we connect you with a vetted local Bend electrician',
  serviceArea: `Serving ${city}, ${county}, and Central Oregon`,
  serviceAreaShort: `${city} · ${county}`,
  trustChips: [
    'Free quote on the phone',
    'Real panel load check',
    `Service area: ${county} & Central Oregon`,
  ],
  affiliateShort: `${BUSINESS.name} is a service-connection platform. All installation work is performed by our vetted, licensed local electricians (Oregon CCB + BCD) in ${county}, ${stateFull}.`,
  // Home hero quick-path rail — "What does your install need?" (considered-purchase
  // version of the demand-capture rail; routes to the matching service).
  causeChips: [
    { label: 'Install a Level 2 charger', icon: 'i-zap', href: '/services/level-2-charger-install/' },
    { label: 'Is my panel big enough?', icon: 'i-building', href: '/services/ev-panel-upgrade/' },
    { label: 'NEMA 14-50 outlet', icon: 'i-property', href: '/services/nema-14-50-outlet/' },
    { label: 'Two cars / ADU', icon: 'i-users', href: '/services/multi-unit-ev-charging/' },
  ],
};
