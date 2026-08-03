/**
 * Blog post — Level 1 vs Level 2 EV charging.
 * Comparison / buyer-intent article. Miles per hour, daily need, when L1 is enough.
 * GEO-native (.geo-answer per question-H2). Voice: Bend EV Charger Crew.
 */
import type { Metadata } from 'next';
import { BlogArticleLayout, BodyFigure, FAQAccordion, InlineCTA, JsonLd, RelatedLinks } from '@ppl/shared/components';
import { webPageSchema, breadcrumbSchema, articleSchema, faqSchema, speakableSchema, imageObjectSchema } from '@ppl/shared/lib/schema-gen';
import { IMAGE_CREDITS } from '@content/_image-credits';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';
import { KEYWORD_GRAPH } from '@content/keyword-graph';

const ROUTE = '/blog/level-1-vs-level-2-ev-charging/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `Level 1 vs Level 2 EV Charging: Which Do You Need?`,
  customDescription: `Level 1 or Level 2 home charging for your ${BUSINESS.location.city}, ${BUSINESS.location.state} EV? How miles of range per hour, your daily driving, and a few honest cases where a 120V outlet is enough decide whether you need a 240V circuit.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const WORD_COUNT = 1290;
const { city, stateFull } = BUSINESS.location;

const BODY_IMAGES = [
  { key: 'level-1',  caption: `Level 1 is the cordset that came with the car plugged into a standard 120V outlet. It adds only a few miles of range an hour — fine for a plug-in hybrid or a light week, slow for a daily ${city} commute on a full EV.` },
  { key: 'level-2',  caption: 'Level 2 runs on a dedicated 240V circuit and charges several times faster, the difference between always topping up and never thinking about it.' },
  { key: 'daily-drive', caption: `The honest test is your daily driving: if a Level 1 overnight charge replaces the miles you put on in a day, it may be enough; if it doesn't keep up, that's the case for Level 2.` },
] as const;
const bodyImgUrl = (key: string) => `${BUSINESS.siteUrl}/images/blog/body/level-1-vs-2/${key}.jpg`;
const bodyImgSrc = (key: string) => `/images/blog/body/level-1-vs-2/${key}.jpg`;

const FAQS = [
  { question: `What's the difference between Level 1 and Level 2 charging?`, answer: `Level 1 uses a standard 120V household outlet and the cordset that came with the car, adding only a few miles of range per hour. Level 2 uses a dedicated 240V circuit — the same voltage class as an electric range or dryer — and a dedicated EVSE, charging several times faster. The practical difference is whether an overnight charge keeps up with your daily driving.` },
  { question: `Do I really need Level 2 charging at home?`, answer: `For most full EV drivers in ${city}, yes — a 120V outlet adds only a handful of miles overnight, which falls short for a normal commute plus weekend trips. The exception is a plug-in hybrid with a small battery, or a very low-mileage driver whose daily miles a Level 1 overnight charge can replace. The honest test is whether Level 1 keeps up with how you actually drive.` },
  { question: `How many miles per hour does each level add?`, answer: `Level 1 adds only a few miles of range per hour, so an overnight charge replaces a modest daily commute at best. Level 2 adds several times that, depending on the circuit amperage and the car, which is usually enough to fully recover a normal day's driving overnight. Exact figures depend on your specific vehicle, so we don't promise a number for a car we haven't checked — but the gap between the two levels is large.` },
  { question: `When is Level 1 actually enough?`, answer: `Level 1 can be enough for a plug-in hybrid with a small battery, a second car that barely drives, or a household whose daily mileage is low enough that an overnight 120V charge keeps up. If that's you, there's no reason to spend on Level 2. We'll tell you honestly on the phone if your driving doesn't justify a 240V circuit yet — selling you one you don't need isn't the goal.` },
];

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Level 1 vs Level 2', href: ROUTE, current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));
  const heroImageUrl = `${BUSINESS.siteUrl}/images/blog/level-1-vs-2.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'SAE J1772', 'Battery electric vehicle'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'Comparison' })} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `Level 1 versus Level 2 EV charging for a ${city}, ${stateFull} home`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      {BODY_IMAGES.map((img) => (
        <JsonLd key={img.key} schema={imageObjectSchema({ url: bodyImgUrl(img.key), caption: img.caption, width: 1440, height: 900, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      ))}

      <BlogArticleLayout
        business={BUSINESS}
        breadcrumbTitle="Level 1 vs Level 2"
        badge="Comparison"
        badgeTone="rose"
        title={<>Level 1 vs Level 2 EV charging: which do you need?</>}
        lead={`A wall outlet or a 240V circuit? For a ${city} EV owner the answer comes down to miles of range per hour against your daily driving. Here's how the two levels compare, and the honest cases where Level 1 is genuinely enough.`}
        heroImageSrc="/images/blog/level-1-vs-2.jpg"
        heroImageAlt={`Level 1 versus Level 2 EV charging for a ${city} home`}
        publishedAt={datePublished}
        modifiedAt={dateModified}
        readingMinutes={7}
        toc={[
          { id: 'the-difference', label: 'The core difference' },
          { id: 'level-1', label: 'What Level 1 gives you' },
          { id: 'level-2', label: 'What Level 2 gives you' },
          { id: 'which', label: 'Which do you need?' },
        ]}
        keyFacts={[
          { label: 'Level 1', value: '120V outlet, a few miles per hour' },
          { label: 'Level 2', value: '240V circuit, several times faster' },
          { label: 'Deciding test', value: 'Does overnight keep up with daily miles' },
          { label: 'Level 1 fits', value: 'PHEV or very low daily mileage' },
        ]}
        related={[
          { href: '/services/level-2-charger-install/', title: 'Level 2 charger install', meta: 'Service' },
          { href: '/blog/what-amperage-ev-charger-do-i-need/', title: 'What amperage do I need?', meta: '8 min · Sizing' },
          { href: '/blog/ev-charger-install-cost-bend/', title: 'EV charger install cost', meta: '8 min · Cost' },
        ]}
        ctaPhoneLabel="Tell us how far you drive in a day — we'll tell you honestly whether you need Level 2."
      >
        <p className="tldr">
          Level 1 charging uses a standard 120V outlet and the car's cordset, adding only a few miles
          of range per hour. Level 2 uses a dedicated 240V circuit and charges several times faster.
          For most full EV drivers in {city}, Level 2 is what keeps an overnight charge ahead of daily
          driving. Level 1 can be enough for a plug-in hybrid or a very low-mileage car — the honest
          test is whether an overnight charge replaces the miles you put on in a day.
        </p>

        <h2 id="the-difference">The core difference</h2>
        <p className="geo-answer">
          The difference between Level 1 and Level 2 is voltage and, with it, speed. Level 1 runs on a
          standard 120V household outlet — no install needed, just the cordset that came with the car —
          and adds only a few miles of range per hour. Level 2 runs on a dedicated 240V circuit, the
          same voltage class as an electric range, and charges several times faster. Everything else
          about the comparison flows from that gap.
        </p>

        <BodyFigure src={bodyImgSrc('level-1')} alt="A Level 1 EV cordset plugged into a standard 120V garage outlet" caption={BODY_IMAGES[0].caption} />

        <h2 id="level-1">What Level 1 gives you</h2>
        <p className="geo-answer">
          Level 1 gives you charging with zero install: plug the car's cordset into a normal outlet and
          it trickles in a few miles of range an hour. Over a full night that's a modest amount —
          enough to recover a short daily commute, not enough to refill a battery you ran down on a
          weekend trip. For a plug-in hybrid with a small battery, or a car that barely drives, that
          can genuinely be all you need.
        </p>

        <BodyFigure src={bodyImgSrc('level-2')} alt="A Level 2 EV charger on a 240V circuit in a garage" caption={BODY_IMAGES[1].caption} />

        <h2 id="level-2">What Level 2 gives you</h2>
        <p className="geo-answer">
          Level 2 gives you an overnight refill. On a 240V circuit, charging is several times faster
          than Level 1 — fast enough that a normal day's driving recovers fully overnight, and a deeply
          run-down battery is back up by morning. For a full EV doing a typical {city} commute plus
          errands and weekend trips, that's the difference between always managing your charge and
          never thinking about it. The exact miles per hour depend on the circuit amperage and your
          car.
        </p>

        <BodyFigure src={bodyImgSrc('daily-drive')} alt="A car odometer and a calendar showing daily driving miles" caption={BODY_IMAGES[2].caption} />

        <h2 id="which">Which do you need?</h2>
        <p className="geo-answer">
          Run the honest test: does a Level 1 overnight charge replace the miles you actually drive in
          a day? If yes — a plug-in hybrid, a low-mileage second car, or a short commute — Level 1 may
          be enough and there's no reason to spend on a 240V circuit. If no, that's the case for Level
          2. Most full EV drivers land on Level 2 because their daily mileage outruns what a wall outlet
          can replace overnight.
        </p>
        <p>
          If Level 2 is the answer, the next questions are what amperage and what install type — see{' '}
          <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage EV charger do I need</a>{' '}
          and <a href="/blog/hardwired-vs-nema-14-50-ev-charger/">hardwired vs NEMA 14-50</a>. When
          you're ready, our <a href="/services/level-2-charger-install/">Level 2 install</a> service
          handles it permitted and inspected. And if your driving doesn't justify Level 2 yet, we'll
          tell you that on the phone.
        </p>
      </BlogArticleLayout>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          <FAQAccordion items={FAQS} />
          <InlineCTA business={BUSINESS} variant="combo" headline="Do you need Level 2?" supporting={`Tell us how far you drive in a day and we'll tell you honestly. ${BUSINESS.phone.display}.`} />
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </section>
    </>
  );
}
