/**
 * Blog post — Do I need a panel upgrade for an EV charger?
 * Panel-capacity demand-capture article. The load calc decides. GEO-native (.geo-answer per question-H2).
 * Voice: Bend EV Charger Crew.
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

const ROUTE = '/blog/do-i-need-a-panel-upgrade-for-ev-charger/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `Do I Need a Panel Upgrade for an EV Charger?`,
  customDescription: `Do you need an electrical panel upgrade for a Level 2 EV charger in ${BUSINESS.location.city}, ${BUSINESS.location.state}? How a load calculation decides whether your 100A or 200A panel carries the circuit as-is — or needs an upgrade or subpanel first.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const WORD_COUNT = 1360;
const { city, stateFull } = BUSINESS.location;

const BODY_IMAGES = [
  { key: 'panel-open',   caption: `The honest answer starts with the panel cover off. We total what a ${city} panel already carries — range, dryer, AC, water heater — against its rating before promising any EV amperage.` },
  { key: 'load-calc',    caption: 'A load calculation is arithmetic, not a guess: existing connected load against the service rating, with the EV circuit added at 125 percent of its draw. That number decides whether you upgrade or not.' },
  { key: 'subpanel',     caption: `When the service has capacity but no open slots, a subpanel adds circuit spaces more simply than a full service change — one of the quieter ways to fit an EV circuit in an older Deschutes County home.` },
] as const;
const bodyImgUrl = (key: string) => `${BUSINESS.siteUrl}/images/blog/body/panel-upgrade/${key}.jpg`;
const bodyImgSrc = (key: string) => `/images/blog/body/panel-upgrade/${key}.jpg`;

const FAQS = [
  { question: `How do I know if I need a panel upgrade for an EV charger?`, answer: `A load calculation answers it. An electrician totals what your panel already carries against its rating — usually 100A or 200A — and adds the EV circuit at 125 percent of its draw. If there's room, no upgrade is needed. If the panel is full, undersized, or has no open breaker spaces, an upgrade or a subpanel comes first. The calc is the deciding number, not a rule of thumb.` },
  { question: `Can I add an EV charger to a 100-amp panel?`, answer: `Often, yes, with a right-sized circuit and sometimes a smaller amperage than the maximum. Plenty of homes charge fine on a 100-amp service as long as the load calc supports it. What matters is the available capacity after your existing loads, not the headline rating. A 100-amp panel already carrying a lot may only support a 30- or 40-amp EV circuit, or need an upgrade — the calc tells us which.` },
  { question: `What does a panel or service upgrade involve?`, answer: `If the main service is undersized, the fix is a service upgrade — often to 200 amps — coordinated with the utility, permitted, and inspected. If the service has capacity but no open slots, a subpanel adds spaces more simply. Both are licensed electrical work in ${stateFull} (Oregon CCB plus a BCD electrical license). We sequence the upgrade and the EV circuit as one job so nothing is wasted.` },
  { question: `Is load management an alternative to upgrading my panel?`, answer: `Sometimes. Load-management equipment can let an EV circuit back off when the rest of the house is drawing heavily, which can fit a charger onto a panel that couldn't otherwise carry it at full amperage. It's a real option, especially for a second charger, but it's not always the right one — we'll tell you on the call whether load management or an upgrade is the cleaner fix for your panel.` },
];

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Do I need a panel upgrade', href: ROUTE, current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));
  const heroImageUrl = `${BUSINESS.siteUrl}/images/blog/panel-upgrade.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: crumbsForSchema, mentionsEntities: ['Electrical wiring', 'Distribution board', 'Charging station', 'Electric vehicle'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'Panel' })} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `Checking an electrical panel for EV charger capacity in ${city}, ${stateFull}`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      {BODY_IMAGES.map((img) => (
        <JsonLd key={img.key} schema={imageObjectSchema({ url: bodyImgUrl(img.key), caption: img.caption, width: 1440, height: 900, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      ))}

      <BlogArticleLayout
        business={BUSINESS}
        breadcrumbTitle="Do I need a panel upgrade"
        badge="Panel"
        badgeTone="blue"
        title={<>Do I need a panel upgrade for an EV charger?</>}
        lead={`The honest answer for a ${city} home is "it depends on a load calculation." Here's how an electrician decides whether your 100A or 200A panel carries a Level 2 circuit as-is, when it needs an upgrade or a subpanel first, and why the panel rating on the door isn't the deciding number.`}
        heroImageSrc="/images/blog/panel-upgrade.jpg"
        heroImageAlt={`Checking an electrical panel for EV charger capacity in a ${city} home`}
        publishedAt={datePublished}
        modifiedAt={dateModified}
        readingMinutes={8}
        toc={[
          { id: 'the-answer', label: 'The honest answer' },
          { id: 'load-calc', label: 'What the load calc checks' },
          { id: 'hundred-amp', label: 'Can a 100A panel do it?' },
          { id: 'upgrade-or-subpanel', label: 'Upgrade or subpanel' },
          { id: 'load-management', label: 'Load management' },
        ]}
        keyFacts={[
          { label: 'Deciding number', value: 'Load calc, not the panel rating' },
          { label: 'EV circuit basis', value: '125% of the continuous draw' },
          { label: 'Common fixes', value: 'Right-size, subpanel, or service upgrade' },
          { label: 'Sometimes', value: 'Load management instead of an upgrade' },
        ]}
        related={[
          { href: '/services/ev-panel-upgrade/', title: 'EV panel & service upgrade', meta: 'Service' },
          { href: '/blog/what-amperage-ev-charger-do-i-need/', title: 'What amperage do I need?', meta: '8 min · Sizing' },
          { href: '/blog/ev-charger-install-cost-bend/', title: 'EV charger install cost', meta: '8 min · Cost' },
        ]}
        ctaPhoneLabel="Tell us your panel and what's on it — we'll tell you whether it carries the EV circuit in five minutes."
      >
        <p className="tldr">
          Whether you need a panel upgrade for an EV charger comes down to a load calculation — your
          panel's existing connected load against its rating, with the EV circuit added at 125 percent
          of its draw. A modern 200-amp service with headroom usually carries a Level 2 circuit as-is.
          A full or undersized panel may need a service upgrade, a subpanel, or load management first.
          The rating on the panel door isn't the deciding number; the available capacity is.
        </p>

        <h2 id="the-answer">The honest answer: it depends on the load calc</h2>
        <p className="geo-answer">
          There's no universal yes or no, because two {city} homes with the same panel rating can have
          very different available capacity depending on what's already connected. The only honest way
          to know whether your panel carries a Level 2 circuit is a load calculation — totaling the
          existing load against the service rating and adding the EV circuit. That's why we open the
          panel before promising any amperage, instead of quoting a charging speed sight unseen.
        </p>
        <p>
          The good news: many homes are fine. The frustrating news: you can't know from the rating on
          the door, and an installer who promises a 48-amp circuit before opening the panel is the one
          you don't want.
        </p>

        <BodyFigure src={bodyImgSrc('panel-open')} alt="An open electrical panel showing breakers and available spaces" caption={BODY_IMAGES[0].caption} />

        <h2 id="load-calc">What the load calculation checks</h2>
        <p className="geo-answer">
          A load calculation totals your home's connected electrical load — the range, dryer, AC, water
          heater, and general circuits — and compares it to the service rating, usually 100A or 200A.
          The EV circuit is added at 125 percent of its draw because it's a continuous load. If the
          total stays within the service capacity, the panel carries the charger; if it pushes over,
          something has to give. It's arithmetic on real numbers, not a guess.
        </p>
        <p>
          Two physical things also matter alongside the math: whether the panel has open breaker
          spaces, and whether the bus and main breaker can take the added load. A panel can have
          capacity on paper but no slots, which is its own fixable problem.
        </p>

        <h2 id="hundred-amp">Can a 100-amp panel handle an EV charger?</h2>
        <p className="geo-answer">
          Often, yes — with a right-sized circuit and sometimes a smaller amperage than the maximum.
          Plenty of homes charge fine on a 100-amp service as long as the load calc supports it. A
          100-amp panel already carrying a lot may only have room for a 30- or 40-amp EV circuit, which
          is still real Level 2 speed for most drivers. If the calc shows no room, that's when an
          upgrade or load management enters the picture. The rating doesn't decide; the math does.
        </p>

        <BodyFigure src={bodyImgSrc('load-calc')} alt="A load calculation worksheet totaling household electrical load" caption={BODY_IMAGES[1].caption} />

        <h2 id="upgrade-or-subpanel">Upgrade the service or add a subpanel?</h2>
        <p className="geo-answer">
          If the load calc says the panel can't carry the EV circuit, there are two main fixes. When
          the main service itself is undersized, a service upgrade — often to 200 amps — is the answer,
          coordinated with the utility, permitted, and inspected. When the service has capacity but no
          open slots, a subpanel adds circuit spaces more simply and often more cheaply. We size the
          fix to the actual problem rather than defaulting to a full service change.
        </p>

        <BodyFigure src={bodyImgSrc('subpanel')} alt="A subpanel installed to add circuit spaces for an EV charger" caption={BODY_IMAGES[2].caption} />

        <h2 id="load-management">When load management is the better fix</h2>
        <p className="geo-answer">
          Load-management equipment lets an EV circuit back off when the rest of the house is drawing
          heavily, so the charger and the existing loads share the service without overrunning it. It
          can fit a charger onto a panel that couldn't carry a full-amperage circuit otherwise, and
          it's especially useful for a second charger. It isn't always the right call — for a
          chronically maxed panel a real upgrade is better — but it's a genuine alternative worth
          weighing.
        </p>
        <p>
          The bottom line: get the load calc first, then choose. If you're wiring for{' '}
          <a href="/services/multi-unit-ev-charging/">two cars or an ADU</a>, the math changes again,
          and the right amperage to ask for is its own question — see{' '}
          <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage EV charger do I need</a>.
          When the answer is an upgrade, our{' '}
          <a href="/services/ev-panel-upgrade/">panel and service upgrade</a> service sequences it with
          the EV circuit as one job.
        </p>
      </BlogArticleLayout>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          <FAQAccordion items={FAQS} />
          <InlineCTA business={BUSINESS} variant="combo" headline="Will your panel carry it?" supporting={`Tell us your panel and what's on it and we'll tell you on the phone in five minutes. ${BUSINESS.phone.display}.`} />
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </section>
    </>
  );
}
