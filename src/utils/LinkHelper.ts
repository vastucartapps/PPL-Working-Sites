// Subdomain-Aware Link Helper Utility

import { LocationData, DEFAULT_LOCATION } from '../config/locations';

export function getLocalizedPath(path: string, location?: LocationData): string {
  const currentLoc = location || DEFAULT_LOCATION;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // If path is already a location route, return it
  if (cleanPath.startsWith('/locations/')) {
    return cleanPath;
  }

  // Under subdomain SSG export, internal links map cleanly to /locations/[city]/[path] or relative paths
  if (currentLoc.slug === 'bend') {
    return cleanPath;
  }

  return `/locations/${currentLoc.slug}${cleanPath === '/' ? '' : cleanPath}`;
}
