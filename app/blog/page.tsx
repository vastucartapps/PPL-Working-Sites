/**
 * Blog index — lists all 6 Phase-0 articles.
 */
import type { Metadata } from 'next';
import { JsonLd, ResponsiveImage } from '@ppl/shared/components';
import { webPageSchema, breadcrumbSchema, itemListSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const ROUTE = '/blog/';
const META = buildPageMeta({ pageType: 'blog-index', ctx: { business: BUSINESS }, pathname: ROUTE });
const { city, county } = BUSINESS.location;

type BadgeTone = 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'slate';
interface Post {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly readingMin: number;
  readonly cluster: string;
  readonly badge: string;
  readonly badgeTone: BadgeTone;
  readonly featured?: boolean;
}

const POSTS: readonly Post[] = [
  {
    title: 'EV Charger Install Cost in Bend: What Drives the Price',
    slug: 'ev-charger-install-cost-bend',
    summary: 'The real price drivers. Circuit run distance, target amperage, wire gauge, panel work, and the permit — and where the Central Electric Co-op rebate fits in.',
    image: '/images/blog/ev-cost.jpg',
    imageAlt: 'EV charger equipment beside an electrical panel and a quote sheet',
    readingMin: 8,
    cluster: 'Cost',
    badge: 'Cost',
    badgeTone: 'slate',
    featured: true,
  },
  {
    title: 'Do I Need a Panel Upgrade for an EV Charger?',
    slug: 'do-i-need-a-panel-upgrade-for-ev-charger',
    summary: 'The load calc decides. How to tell whether your 100A or 200A panel carries a Level 2 circuit as-is, or needs an upgrade or subpanel first.',
    image: '/images/blog/panel-upgrade.jpg',
    imageAlt: 'An electrician checking an electrical panel for EV charger capacity',
    readingMin: 8,
    cluster: 'Panel',
    badge: 'Panel',
    badgeTone: 'blue',
  },
  {
    title: 'Hardwired vs NEMA 14-50 EV Charger',
    slug: 'hardwired-vs-nema-14-50-ev-charger',
    summary: 'Outlet or hardwire? How the run length, the target amperage, and whether you want to unplug the unit decide between a NEMA 14-50 outlet and a hardwired charger.',
    image: '/images/blog/hardwired-vs-outlet.jpg',
    imageAlt: 'A hardwired EV charger beside a NEMA 14-50 outlet install',
    readingMin: 7,
    cluster: 'Install type',
    badge: 'Install Type',
    badgeTone: 'purple',
  },
  {
    title: 'Level 1 vs Level 2 EV Charging',
    slug: 'level-1-vs-level-2-ev-charging',
    summary: 'Wall outlet or 240V? Miles of range per hour, what your daily driving needs, and the cases where Level 1 is genuinely enough.',
    image: '/images/blog/level-1-vs-2.jpg',
    imageAlt: 'A 120V Level 1 cord beside a 240V Level 2 charger',
    readingMin: 7,
    cluster: 'Comparison',
    badge: 'Comparison',
    badgeTone: 'rose',
  },
  {
    title: 'Oregon EV Charger Rebates Guide',
    slug: 'oregon-ev-charger-rebates-guide',
    summary: 'How the Central Electric Co-op up-to-$450 residential Level 2 rebate works — who qualifies, what counts, and how to fit it into the cost of the right install.',
    image: '/images/blog/rebates.jpg',
    imageAlt: 'An Oregon homeowner reviewing EV charger rebate paperwork',
    readingMin: 7,
    cluster: 'Rebates',
    badge: 'Rebates',
    badgeTone: 'emerald',
  },
  {
    title: 'What Amperage EV Charger Do I Need?',
    slug: 'what-amperage-ev-charger-do-i-need',
    summary: 'Charge speed is amperage. How the car, the panel, and the 125 percent continuous-load rule set the circuit — and why 48 amps is not always the answer.',
    image: '/images/blog/amperage.jpg',
    imageAlt: 'Wire gauge and breaker options for an EV charger circuit',
    readingMin: 8,
    cluster: 'Sizing',
    badge: 'Sizing',
    badgeTone: 'slate',
  },
];

const BADGE_TONES: Record<BadgeTone, string> = {
  amber:   'bg-amber-100 text-amber-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  blue:    'bg-blue-100 text-blue-800',
  purple:  'bg-purple-100 text-purple-800',
  rose:    'bg-rose-100 text-rose-800',
  slate:   'bg-slate-100 text-slate-800',
};

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: ROUTE, current: true },
];
const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

export default function BlogIndexPage() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0]!;
  const others = POSTS.filter((p) => p !== featured);

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'CollectionPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={itemListSchema(`${city} EV charger articles`, POSTS.map((p, i) => ({
        name: p.title,
        url: `${BUSINESS.siteUrl}/blog/${p.slug}/`,
        position: i + 1,
      })))} />

      <section className="bg-brand text-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="eyebrow !text-accent mb-3">Field intel</div>
          <h1 className="display text-4xl md:text-5xl font-extrabold !text-white max-w-3xl">
            {city} EV charging intel — cost, panel capacity, amperage, and Oregon rebates
          </h1>
          <p className="mt-4 text-neutral-200 max-w-2xl">
            Straight answers on what a Level 2 charger costs, whether your panel can carry it, what
            amperage you actually need, and how the Central Electric Co-op rebate fits the math for a
            {' '}{county} home. No brochure claims — the numbers and trade-offs as they actually are.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="eyebrow mb-4">Featured</div>
          <a href={`/blog/${featured.slug}/`} className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center group">
            <div className="lg:col-span-7 aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100">
              <ResponsiveImage
                src={featured.image}
                alt={featured.imageAlt}
                profile="thumb"
                sizes="(max-width: 1024px) 100vw, 60vw"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs text-neutral-500 uppercase tracking-wider mb-3">
                <span className={`${BADGE_TONES[featured.badgeTone]} px-2.5 py-1 rounded font-bold`}>{featured.badge}</span>
                <span>{featured.readingMin} min</span>
              </div>
              <h2 className="display text-3xl md:text-4xl font-extrabold text-brand leading-[1.1] mb-4 group-hover:text-accent transition">
                {featured.title}
              </h2>
              <p className="text-neutral-700 leading-relaxed">{featured.summary}</p>
            </div>
          </a>
        </div>
      </section>

      <section aria-label="All articles" className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="display text-2xl md:text-3xl font-extrabold text-brand mb-8">All articles</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {others.map((p, i) => (
              <article key={p.slug} className="bg-white rounded-lg overflow-hidden border border-neutral-200 lift">
                <a href={`/blog/${p.slug}/`} className="block group">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                    <ResponsiveImage
                      src={p.image}
                      alt={p.imageAlt}
                      profile="thumb"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={i < 3 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-2">
                      <span className={`${BADGE_TONES[p.badgeTone]} px-2 py-0.5 rounded font-bold`}>{p.badge}</span>
                      <span>{p.readingMin} min</span>
                    </div>
                    <h3 className="display font-extrabold text-lg text-brand leading-snug mb-2 group-hover:text-accent transition">
                      {p.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{p.summary}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
