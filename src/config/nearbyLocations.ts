import { LOCATIONS, LocationData } from './locations';

/**
 * Real geographic distance between two locations (haversine, in miles).
 *
 * "Nearby service areas" links are sensible internal linking only if "nearby"
 * means something real -- an alphabetical or declaration-order list of the
 * other 6 cities is still an arbitrary link farm with extra steps. This uses
 * each location's actual lat/lng, already in locations.ts.
 */
function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

export interface NearbyLocation {
  location: LocationData;
  distanceMiles: number;
}

/** The `count` real-closest other served locations, nearest first. */
export function nearestLocations(citySlug: string, count = 3): NearbyLocation[] {
  const here = LOCATIONS[citySlug];
  if (!here) return [];
  return Object.values(LOCATIONS)
    .filter((loc) => loc.slug !== citySlug)
    .map((loc) => ({ location: loc, distanceMiles: milesBetween(here.geo, loc.geo) }))
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, count);
}

/**
 * A stable, non-random structural variant index for a city.
 *
 * Not for spam evasion (see .claude/skills/evc-seo-blueprint for why that
 * framing was rejected) -- for genuine DOM variance once real content differs
 * by city, so pages built from one template don't *also* read as the same
 * shape with different words poured in. Deterministic per slug (not random,
 * so a given city's layout doesn't change between builds), and round-robin
 * by declaration order in LOCATIONS rather than a hash of the slug: a hash
 * clumped 4 of this site's 7 cities into the same variant (bend, redmond,
 * sisters and sunriver all landed on variant 1), which defeated the point --
 * two cities sharing a variant also share its exact spotlight template and
 * section order, on top of whatever real content they already share.
 * Round-robin guarantees an even 3/2/2 split across 7 cities instead.
 */
export function layoutVariant(citySlug: string, variantCount = 3): number {
  const slugs = Object.keys(LOCATIONS);
  const index = slugs.indexOf(citySlug);
  return index < 0 ? 0 : index % variantCount;
}
