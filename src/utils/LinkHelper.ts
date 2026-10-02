// Subdomain-Aware Link Helper Utility

import { LocationData, DEFAULT_LOCATION } from '../config/locations';

export function getLocalizedPath(path: string, location?: LocationData): string {
  const currentLoc = location || DEFAULT_LOCATION;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  let result: string;
  if (cleanPath.startsWith('/locations/')) {
    // If path is already a location route, return it as-is
    result = cleanPath;
  } else if (currentLoc.slug === 'bend') {
    // Under subdomain SSG export, internal links map cleanly to /locations/[city]/[path] or relative paths
    result = cleanPath;
  } else {
    result = `/locations/${currentLoc.slug}${cleanPath === '/' ? '' : cleanPath}`;
  }

  // The site serves every route with a trailing slash (astro.config trailingSlash) --
  // a path without one 308-redirects, which is what fragmented this site's GSC index
  // entries in two. Every generated link must match what's actually served.
  return result.endsWith('/') ? result : `${result}/`;
}
