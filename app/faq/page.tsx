/**
 * FAQ Pillar Page — EV charger site (Level 2 EV charger install × Bend OR).
 * Comprehensive Q&A grouped by topic for AEO/SGE play.
 */
import type { Metadata } from 'next';
import { PageHero, FAQAccordion, CtaBand, JsonLd } from '@ppl/shared/components';
import {
  webPageSchema, breadcrumbSchema, articleSchema, faqSchema, speakableSchema, professionalServiceSchema,
} from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';
import { FAQ_PILLAR_SECTIONS, flatFAQs } from '@content/faqs/pillar';

const ROUTE = '/faq/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `EV Charger FAQ — Every Level 2 Install Question Answered (${BUSINESS.location.city}, ${BUSINESS.location.stateFull})`,
  customDescription: `Comprehensive Level 2 EV charger Q&A from local licensed electricians in ${BUSINESS.location.city}, ${BUSINESS.location.state}. Charging levels, panel capacity, install type, permits, the Central Electric Co-op rebate, and Oregon licensing. The single answer resource for the ${BUSINESS.location.county} area.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const ALL_FAQS = flatFAQs(FAQ_PILLAR_SECTIONS);
const WORD_COUNT = ALL_FAQS.reduce((sum, f) => sum + f.question.split(/\s+/).length + f.answer.split(/\s+/).length, 0);

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

function slugifyForAnchor(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function FAQPillarPage() {
  const city = BUSINESS.location.city;
  const crumbsForSchema = [
    { name: 'Home', url: `${BUSINESS.siteUrl}/` },
    { name: 'FAQ', url: `${BUSINESS.siteUrl}${ROUTE}` },
  ];

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'CollectionPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: `${BUSINESS.siteUrl}/images/hero-ev-charger-bend.jpg`, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'EV Charger FAQ' })} />
      <JsonLd schema={professionalServiceSchema(BUSINESS)} />
      <JsonLd schema={faqSchema(ALL_FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.faq-answer'])} />

      <PageHero
        size="standard"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        eyebrow="Questions, answered"
        h1={`Frequently asked questions about Level 2 EV chargers in ${city}`}
        subhead="What we hear on the phone — charging levels and speed, panel capacity, install type, permits and licensing, the Central Electric Co-op rebate, and Oregon regulations."
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <p className="text-sm text-neutral-600 italic mb-2">
                {ALL_FAQS.length} questions, answered by a local licensed electrician serving {BUSINESS.location.county}.
              </p>

              <p className="tldr text-lg text-neutral-800 leading-relaxed font-medium border-l-4 border-accent pl-5 my-6 italic">
                The {ALL_FAQS.length}-question reference page for everything Level 2 EV charging —
                charging levels and speed, panel and electrical capacity, install type, permits and
                licensing, the Central Electric Co-op rebate, and Oregon regulations. Jump to a topic
                using the links below, or scroll the full page. Phone quote for anything not covered:{' '}
                <a href={`tel:${BUSINESS.phone.tel}`} className="text-brand font-bold underline underline-offset-2">
                  {BUSINESS.phone.display}
                </a>.
              </p>

              <nav aria-label="FAQ groups" className="flex flex-wrap gap-2 mb-10">
                {FAQ_PILLAR_SECTIONS.map((g) => (
                  <a
                    key={g.heading}
                    href={`#${slugifyForAnchor(g.heading)}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 text-brand font-semibold text-sm px-4 py-2 hover:bg-brand hover:text-white transition"
                  >
                    {g.heading}
                    <svg className="w-3.5 h-3.5" aria-hidden="true"><use href="#i-chevron-right" /></svg>
                  </a>
                ))}
              </nav>

              {FAQ_PILLAR_SECTIONS.map((group) => (
                <section key={group.heading} id={slugifyForAnchor(group.heading)} className="scroll-mt-24">
                  <FAQAccordion
                    items={group.items}
                    headingId={`heading-${slugifyForAnchor(group.heading)}`}
                    title={group.heading}
                  />
                </section>
              ))}
            </div>

            <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
              <div className="rounded-2xl bg-brand text-white p-6 shadow-lg">
                <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-wider font-bold mb-2">
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-phone" /></svg>
                  Fastest path
                </div>
                <p className="text-sm text-neutral-200 mb-3">
                  A phone quote is free, five minutes, and ends with a real number or an honest
                  &quot;you'll need a panel upgrade first.&quot;
                </p>
                <a href={`tel:${BUSINESS.phone.tel}`} className="block text-2xl font-extrabold text-white hover:text-accent transition">
                  {BUSINESS.phone.display}
                </a>
                <p className="mt-4 text-xs text-neutral-300">
                  Have your panel size and the car you charge handy — it sets the amperage and rebate math.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider font-bold mb-3">
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-check" /></svg>
                  Quick tips
                </div>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true"><use href="#i-check" /></svg>
                    <span>The load calc is the job. A 48-amp circuit promised before anyone opened the panel is the one that becomes a change order.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true"><use href="#i-check" /></svg>
                    <span>Charge speed is amperage — and the right amperage is the lower of what your car accepts and your panel can spare.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true"><use href="#i-check" /></svg>
                    <span>Ask whether your address is in Central Electric Co-op territory — the up-to-$450 rebate can change the math.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider font-bold mb-3">
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-message" /></svg>
                  Couldn&rsquo;t find your answer?
                </div>
                <p className="text-sm text-neutral-700 mb-4">
                  Send us your specific situation and we&rsquo;ll add the answer here in the next
                  update.
                </p>
                <a href="/contact/" className="inline-flex items-center gap-1.5 text-brand font-semibold text-sm hover:text-accent transition">
                  Go to contact page
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-arrow-right" /></svg>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow="Still unsure?"
        headline="Talk it through in five minutes."
        subhead="Free phone quote off your panel details and the car you charge. We tell you what install fits — and we're honest when the panel needs an upgrade first."
      />
    </>
  );
}
