/**
 * Auto-discovering sitemap.xml per SOP §36.
 * Identical mechanism to site 1: globs app/blog/<slug>/page.tsx and derives
 * /locations/<town>/ from BUSINESS.location.nearbyCities. Never hardcode.
 */
import type { MetadataRoute } from 'next';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { BUSINESS } from '@content/business';

export const dynamic = 'force-static';

const today = new Date().toISOString().slice(0, 10);

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function discoverBlogRoutes(): string[] {
  const blogDir = join(process.cwd(), 'app', 'blog');
  if (!existsSync(blogDir)) return [];
  return readdirSync(blogDir)
    .filter((entry) => {
      const p = join(blogDir, entry);
      return statSync(p).isDirectory() && existsSync(join(p, 'page.tsx'));
    })
    .map((slug) => `/blog/${slug}/`);
}

function discoverLocationRoutes(): string[] {
  return (BUSINESS.location.nearbyCities ?? []).map(
    (c) => `/locations/${slugify(c.name)}/`,
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.siteUrl;
  type Entry = { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' };

  const staticRoutes: Entry[] = [
    { path: '/',                       priority: 1.0,  changeFrequency: 'weekly' },
    { path: '/services/',              priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/services/level-2-charger-install/', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/services/ev-panel-upgrade/',        priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/services/nema-14-50-outlet/',       priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/services/multi-unit-ev-charging/',  priority: 0.85, changeFrequency: 'monthly' },
    { path: '/locations/',             priority: 0.8,  changeFrequency: 'monthly' },
    { path: '/blog/',                  priority: 0.8,  changeFrequency: 'weekly' },
    { path: '/faq/',                   priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/glossary/',              priority: 0.7,  changeFrequency: 'yearly' },
    { path: '/about/',                 priority: 0.7,  changeFrequency: 'yearly' },
    { path: '/contact/',               priority: 0.7,  changeFrequency: 'yearly' },
    { path: '/privacy/',               priority: 0.2,  changeFrequency: 'yearly' },
    { path: '/terms/',                 priority: 0.2,  changeFrequency: 'yearly' },
    { path: '/affiliate-disclosure/',  priority: 0.2,  changeFrequency: 'yearly' },
  ];

  const blogRoutes: Entry[] = discoverBlogRoutes().map((path) => ({
    path, priority: 0.7, changeFrequency: 'monthly' as const,
  }));

  const locationRoutes: Entry[] = discoverLocationRoutes().map((path) => ({
    path, priority: 0.6, changeFrequency: 'monthly' as const,
  }));

  const seen = new Set<string>();
  const all = [...staticRoutes, ...blogRoutes, ...locationRoutes].filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });

  return all.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: today,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
