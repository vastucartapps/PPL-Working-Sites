/**
 * Business config — Batch-4 Site (ev-charger × Bend EV Charger Pros).
 * NEW-SITE DEFAULTS per SOP §28 + [[no-fabricated-claims]].
 */
import type { Business } from '@ppl/shared/lib/types';
import { getNiche, getLocation } from '@ppl/shared/lib/data';
import { PHONE } from './_generated-phone';

const niche = getNiche('ev-charger');
const location = getLocation('bend-or');

if (!niche) throw new Error('ev-charger niche not found in master-config/niches.json');
if (!location) throw new Error('bend-or location not found in master-config/locations.json');

export const BUSINESS: Business = {
  slug: 'ev-charger-bend-or',
  name: "Bend EV Charger Pros",
  tagline: "Honest Level 2 EV charger install help for Bend and Deschutes County. Licensed electricians, real panel load checks, priced on the phone.",
  siteUrl: 'https://ev-charger-bend-or.web.app',
  phone: PHONE,
  email: 'help@ev-charger-bend-or.web.app',
  founded: 2026,
  jobsCompleted: 0,
  review: { rating: 0, count: 0, source: '' },
  author: {
    name: "Bend EV Charger Crew",
    role: "Local licensed electricians serving Deschutes County",
    years: 0,
    imageInitials: "BE",
    bio: "A locally-operated EV charger installation service connecting Bend-area homeowners with vetted, licensed local electricians. Phone-first quoting, a real electrical-panel load check before we promise a 240V circuit, and honest guidance on the Central Electric Co-op rebate. We tell you when your panel needs an upgrade first and when a NEMA 14-50 outlet beats a hardwired unit.",
    sameAs: [],
  },
  niche,
  location,
};
