/**
 * Blog post — What amperage EV charger do I need?
 * Sizing-led education article. Charge speed = amperage; car + panel + 125% rule.
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

const ROUTE = '/blog/what-amperage-ev-charger-do-i-need/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `What Amperage EV Charger Do I Need?`,
  customDescription: `What amperage Level 2 EV charger do you need in ${BUSINESS.location.city}, ${BUSINESS.location.state}? How the car, the panel's available capacity, and the 125 percent continuous-load rule set the circuit — and why 48 amps isn't always the answer.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const WORD_COUNT = 1370;
const { city, stateFull } = BUSINESS.location;

const BODY_IMAGES = [
  { key: 'amperage-dial', caption: `Charge speed is amperage. A 40-amp circuit charges faster than a 20-amp one, but the EVSE can only pull what the circuit and the panel allow — the dial is set by the wiring, not the box.` },
  { key: 'breaker',       caption: 'A Level 2 charger is a continuous load, so the circuit is sized to 125 percent of the draw: a 48-amp charger needs a 60-amp breaker and the wire to match. The 125 percent rule is why amperage drives wire cost.' },
  { key: 'car-port',      caption: `The car matters too: most EVs accept a ceiling on AC charging, so running more amps than the vehicle can take just pays for copper you can't use in a ${city} install.` },
] as const;
const bodyImgUrl = (key: string) => `${BUSINESS.siteUrl}/images/blog/body/amperage/${key}.jpg`;
const bodyImgSrc = (key: string) => `/images/blog/body/amperage/${key}.jpg`;

const FAQS = [
  { question: `What amperage EV charger do I need?`, answer: `The right amperage is set by three things: what your car can accept on AC charging, how much capacity your panel can spare, and the 125 percent continuous-load rule that sizes the circuit. Common residential EV circuits are 20, 30, 40, or 48 amps. The honest answer comes after a load calc — buying a 48-amp charger for a panel that can spare 24 amps, or a car that caps lower, just leaves capacity unused.` },
  { question: `Is a 48-amp charger always better than a 40-amp one?`, answer: `No. A 48-amp charger only charges faster if your panel can carry a 60-amp circuit and your car can accept 48 amps on AC. If either falls short, the extra amperage does nothing but cost more in wire. For many ${city} drivers a 40-amp circuit fully recovers a day's driving overnight, so the "biggest number" isn't automatically the right one — the right one is what the car and panel justify.` },
  { question: `What is the 125 percent rule?`, answer: `An EV charger is a continuous load — it draws for three or more hours — so the National Electrical Code requires the circuit to be sized to 125 percent of the charger's rated draw. That's why a 48-amp charger needs a 60-amp breaker and wire, a 40-amp charger needs a 50-amp circuit, and so on. It's not optional padding; it's how the wire stays cool under a long continuous draw.` },
  { question: `How do I find out what my car can accept?`, answer: `Your EV's onboard charger sets a ceiling on how many amps it can pull on AC (Level 2), and it varies by model and trim. Running a circuit above that ceiling won't charge any faster. We ask which vehicle you're charging so we size the circuit to what the car can actually use, not just what the panel could theoretically deliver — that's part of getting the amperage right rather than oversized.` },
];

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'What amperage do I need', href: ROUTE, current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));
  const heroImageUrl = `${BUSINESS.siteUrl}/images/blog/amperage.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'Electrical wiring', 'Ampacity'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'Sizing' })} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `Sizing the amperage for an EV charger circuit in ${city}, ${stateFull}`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      {BODY_IMAGES.map((img) => (
        <JsonLd key={img.key} schema={imageObjectSchema({ url: bodyImgUrl(img.key), caption: img.caption, width: 1440, height: 900, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      ))}

      <BlogArticleLayout
        business={BUSINESS}
        breadcrumbTitle="What amperage do I need"
        badge="Sizing"
        badgeTone="slate"
        title={<>What amperage EV charger do I need?</>}
        lead={`Charge speed is amperage, but more isn't automatically better. Here's how the car, your ${city} panel's available capacity, and the 125 percent continuous-load rule set the right circuit — and why 48 amps isn't always the answer.`}
        heroImageSrc="/images/blog/amperage.jpg"
        heroImageAlt={`Sizing the amperage for an EV charger circuit in a ${city} home`}
        publishedAt={datePublished}
        modifiedAt={dateModified}
        readingMinutes={8}
        toc={[
          { id: 'speed-is-amps', label: 'Charge speed is amperage' },
          { id: 'the-car', label: 'What the car can accept' },
          { id: 'the-panel', label: 'What the panel can spare' },
          { id: '125-rule', label: 'The 125% rule' },
          { id: 'right-number', label: 'Landing on the right number' },
        ]}
        keyFacts={[
          { label: 'Common circuits', value: '20, 30, 40, or 48 amps' },
          { label: 'Set by', value: 'Car ceiling + panel capacity' },
          { label: 'Circuit sizing', value: '125% of the continuous draw' },
          { label: 'Honest note', value: '48A only helps if car + panel support it' },
        ]}
        related={[
          { href: '/services/level-2-charger-install/', title: 'Level 2 charger install', meta: 'Service' },
          { href: '/blog/do-i-need-a-panel-upgrade-for-ev-charger/', title: 'Do I need a panel upgrade?', meta: '8 min · Panel' },
          { href: '/blog/hardwired-vs-nema-14-50-ev-charger/', title: 'Hardwired vs NEMA 14-50', meta: '7 min · Install type' },
        ]}
        ctaPhoneLabel="Tell us your car and your panel — we'll tell you the right amperage in five minutes."
      >
        <p className="tldr">
          The right EV charger amperage is set by three things: what your car can accept on AC charging,
          how much capacity your panel can spare, and the 125 percent continuous-load rule that sizes
          the circuit. Common residential circuits are 20, 30, 40, or 48 amps. Bigger isn't
          automatically better — a 48-amp charger only charges faster if both the panel and the car
          support it. The honest number comes from a load calc, not the box on the shelf.
        </p>

        <h2 id="speed-is-amps">Charge speed is amperage, not the brand</h2>
        <p className="geo-answer">
          On Level 2, charging speed scales with the circuit amperage. A 40-amp circuit delivers more
          power than a 20-amp one, and the EVSE on the wall can only pull what the circuit and the
          panel allow. The charger brand barely matters to speed; the amperage of the circuit feeding
          it does. That's why "what amperage do I need" is the real question, and why buying the
          biggest charger on the shelf before sizing the circuit puts the cart before the horse.
        </p>

        <BodyFigure src={bodyImgSrc('amperage-dial')} alt="An EV charger amperage setting and a circuit breaker" caption={BODY_IMAGES[0].caption} />

        <h2 id="the-car">What the car can accept</h2>
        <p className="geo-answer">
          Your EV's onboard charger caps how many amps it can pull on AC charging, and that ceiling
          varies by model and trim. Running a circuit above what the car accepts charges no faster — it
          just costs more in wire. So the first input to the right amperage is the vehicle: a car that
          tops out around 32 or 40 amps gains nothing from a 48-amp circuit. We ask which EV you're
          charging precisely so we don't oversize the circuit past what the car can use.
        </p>

        <BodyFigure src={bodyImgSrc('breaker')} alt="A double-pole breaker sized for an EV charger circuit" caption={BODY_IMAGES[1].caption} />

        <h2 id="the-panel">What the panel can spare</h2>
        <p className="geo-answer">
          The second input is your panel's available capacity. A load calculation shows how much the
          service can spare for an EV circuit after the existing loads. A modern 200-amp panel with
          headroom may carry a 48-amp circuit; a fuller or older panel may only support 30 or 40 amps,
          or need an upgrade first. The amperage you can run is the smaller of what the car accepts and
          what the panel can spare — never more than the weaker of the two. We cover the panel side in{' '}
          <a href="/blog/do-i-need-a-panel-upgrade-for-ev-charger/">do I need a panel upgrade</a>.
        </p>

        <BodyFigure src={bodyImgSrc('car-port')} alt="An EV charging port on a vehicle in a garage" caption={BODY_IMAGES[2].caption} />

        <h2 id="125-rule">The 125 percent continuous-load rule</h2>
        <p className="geo-answer">
          An EV charger is a continuous load — it draws steadily for three or more hours — so the
          National Electrical Code sizes the circuit to 125 percent of the charger's rated draw. That's
          why a 48-amp charger needs a 60-amp breaker and matching wire, a 40-amp charger needs a
          50-amp circuit, and a 32-amp charger needs a 40-amp circuit. The rule isn't padding; it keeps
          the wire from running hot under a long continuous draw, and it's why higher amperage means
          heavier, costlier copper.
        </p>

        <h2 id="right-number">Landing on the right number</h2>
        <p>
          Put the three inputs together: take the lower of what your car accepts and what your panel can
          spare, then size the circuit to 125 percent of that. For many {city} drivers a 40-amp circuit
          is the sweet spot — real overnight charging without overbuilding. The biggest number is only
          the right number when the car and the panel both support it. Tell us the car and the panel and
          we'll size it honestly on the phone, then handle the{' '}
          <a href="/services/level-2-charger-install/">Level 2 install</a> permitted and inspected. If
          you're still deciding outlet versus hardwire, see{' '}
          <a href="/blog/hardwired-vs-nema-14-50-ev-charger/">hardwired vs NEMA 14-50</a>.
        </p>
      </BlogArticleLayout>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          <FAQAccordion items={FAQS} />
          <InlineCTA business={BUSINESS} variant="combo" headline="What amperage fits your house?" supporting={`Tell us your car and your panel and we'll size it honestly on the phone. ${BUSINESS.phone.display}.`} />
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </section>
    </>
  );
}
