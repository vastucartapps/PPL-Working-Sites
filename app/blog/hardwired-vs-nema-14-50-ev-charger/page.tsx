/**
 * Blog post — Hardwired vs NEMA 14-50 EV charger.
 * Install-type buyer-intent article. GEO-native (.geo-answer per question-H2).
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

const ROUTE = '/blog/hardwired-vs-nema-14-50-ev-charger/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `Hardwired vs NEMA 14-50 EV Charger: How to Choose`,
  customDescription: `Hardwired or a NEMA 14-50 outlet for your Level 2 EV charger in ${BUSINESS.location.city}, ${BUSINESS.location.state}? How the run length, the target amperage, and whether you want to unplug the unit decide between the two.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const WORD_COUNT = 1300;
const { city, stateFull } = BUSINESS.location;

const BODY_IMAGES = [
  { key: 'hardwired',  caption: `A hardwired Level 2 unit wired straight to the circuit can run a higher continuous amperage and is the clean choice for a permanent install or the fastest home charging in a ${city} garage.` },
  { key: 'outlet',     caption: 'A NEMA 14-50 outlet lets you plug in a portable EVSE you can unplug and take with you, typically up to a 40-amp draw — flexibility over the absolute top charging speed.' },
  { key: 'wire-run',   caption: `Either way, the run length and wire gauge are the same engineering: a continuous EV load sized to 125 percent of the draw, with heavier wire for a long pull to a detached space.` },
] as const;
const bodyImgUrl = (key: string) => `${BUSINESS.siteUrl}/images/blog/body/hardwired-vs-outlet/${key}.jpg`;
const bodyImgSrc = (key: string) => `/images/blog/body/hardwired-vs-outlet/${key}.jpg`;

const FAQS = [
  { question: `Should I hardwire my EV charger or use a NEMA 14-50 outlet?`, answer: `Both are legitimate. Hardwire if you want the highest continuous amperage, a permanent clean install, or a long run — a hardwired unit can be set higher than an outlet allows. Choose a NEMA 14-50 outlet if you value flexibility: you can unplug a portable EVSE and move it, swap units, or take it to a new home, charging up to about 40 amps. The run length and your target amperage decide.` },
  { question: `Does hardwiring charge faster than a 14-50 outlet?`, answer: `It can, because a hardwired unit isn't limited by the outlet's rating and can run a higher continuous amperage — for example 48 amps on a 60-amp circuit, versus up to 40 amps on a 50-amp circuit for a 14-50. Whether that extra speed matters depends on your car and your daily driving. For most overnight charging, both are plenty; the difference shows up mainly if you need a fast turnaround between trips.` },
  { question: `Is a NEMA 14-50 outlet cheaper?`, answer: `Sometimes, but not by a guaranteed amount. The outlet is a simple device, and on a short run with a panel that has room, the install can be straightforward. But the cost still comes from the same places — the run distance, the wire gauge, and any panel work — so a long run or a panel upgrade can make either option cost more. The flexibility, not a fixed discount, is usually the reason to pick the outlet.` },
  { question: `Can I move a portable charger between homes with a 14-50?`, answer: `That's the main appeal. A portable EVSE with a NEMA 14-50 plug can move to any home or garage with a matching 14-50 outlet, which is handy if you rent, plan to move, or want a backup. A hardwired unit stays put. If portability matters to you, the outlet is usually the better call even if hardwiring would charge slightly faster.` },
];

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Hardwired vs NEMA 14-50', href: ROUTE, current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));
  const heroImageUrl = `${BUSINESS.siteUrl}/images/blog/hardwired-vs-outlet.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'Electrical wiring', 'NEMA connector'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'Install Type' })} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `Hardwired EV charger versus a NEMA 14-50 outlet in ${city}, ${stateFull}`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      {BODY_IMAGES.map((img) => (
        <JsonLd key={img.key} schema={imageObjectSchema({ url: bodyImgUrl(img.key), caption: img.caption, width: 1440, height: 900, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      ))}

      <BlogArticleLayout
        business={BUSINESS}
        breadcrumbTitle="Hardwired vs NEMA 14-50"
        badge="Install Type"
        badgeTone="purple"
        title={<>Hardwired vs NEMA 14-50 EV charger: how to choose</>}
        lead={`Both a hardwired Level 2 unit and a NEMA 14-50 outlet are real ways to charge at home in ${city}. Here's how the run length, the amperage you want, and whether you'd ever unplug the unit decide which one fits your house.`}
        heroImageSrc="/images/blog/hardwired-vs-outlet.jpg"
        heroImageAlt={`A hardwired EV charger beside a NEMA 14-50 outlet in a ${city} garage`}
        publishedAt={datePublished}
        modifiedAt={dateModified}
        readingMinutes={7}
        toc={[
          { id: 'the-short-version', label: 'The short version' },
          { id: 'hardwired', label: 'When to hardwire' },
          { id: 'outlet', label: 'When a 14-50 wins' },
          { id: 'same-circuit', label: 'Same circuit, either way' },
          { id: 'how-to-decide', label: 'How to decide' },
        ]}
        keyFacts={[
          { label: 'Hardwired', value: 'Higher amperage, permanent, fastest' },
          { label: 'NEMA 14-50', value: 'Flexible, unpluggable, up to ~40A' },
          { label: 'Deciding factors', value: 'Run length + target amperage' },
          { label: 'Either way', value: 'Sized to 125% of the draw, permitted' },
        ]}
        related={[
          { href: '/services/nema-14-50-outlet/', title: 'NEMA 14-50 outlet install', meta: 'Service' },
          { href: '/services/level-2-charger-install/', title: 'Level 2 charger install', meta: 'Service' },
          { href: '/blog/what-amperage-ev-charger-do-i-need/', title: 'What amperage do I need?', meta: '8 min · Sizing' },
        ]}
        ctaPhoneLabel="Tell us where you park and how far the panel is — we'll tell you which install fits."
      >
        <p className="tldr">
          Hardwire your EV charger if you want the highest continuous amperage, a clean permanent
          install, or a long run; choose a NEMA 14-50 outlet if you value the flexibility to unplug a
          portable EVSE and move it, charging up to about 40 amps. The run length and your target
          amperage decide. Either way it's the same engineering — a dedicated 240V circuit sized to
          125 percent of the continuous draw, permitted and inspected.
        </p>

        <h2 id="the-short-version">The short version</h2>
        <p className="geo-answer">
          A hardwired unit is wired straight to the circuit and can run a higher continuous amperage
          than an outlet allows, which makes it the choice for the fastest home charging or a clean
          permanent install. A NEMA 14-50 outlet is a 240V receptacle you plug a portable EVSE into,
          giving you the flexibility to unplug, swap, or move the unit, at up to roughly 40 amps. For
          most {city} drivers both deliver plenty of overnight charge; the decision is about amperage
          and flexibility, not whether one "works" better.
        </p>

        <BodyFigure src={bodyImgSrc('hardwired')} alt="A hardwired Level 2 EV charger mounted on a garage wall" caption={BODY_IMAGES[0].caption} />

        <h2 id="hardwired">When to hardwire</h2>
        <p className="geo-answer">
          Hardwire when you want the maximum charging speed your panel supports — a hardwired unit can
          be set to a higher continuous amperage than a 14-50 outlet, for example 48 amps on a 60-amp
          circuit. It's also the cleaner call for a long run, an outdoor install where you'd rather not
          have an exposed outlet, or simply a permanent setup you don't plan to move. If fast turnaround
          between trips matters, hardwiring is usually the answer.
        </p>

        <BodyFigure src={bodyImgSrc('outlet')} alt="A NEMA 14-50 outlet with a portable EV charger plugged in" caption={BODY_IMAGES[1].caption} />

        <h2 id="outlet">When a NEMA 14-50 wins</h2>
        <p className="geo-answer">
          A NEMA 14-50 outlet wins on flexibility. You can unplug a portable EVSE and take it to
          another home or garage with a matching outlet, swap to a different unit later, or keep a
          spare. At up to about 40 amps it's real Level 2 speed for most daily driving. If you rent,
          plan to move, or just like the option to relocate the charger, the outlet is usually the
          better fit even though a hardwired unit could charge slightly faster.
        </p>

        <BodyFigure src={bodyImgSrc('wire-run')} alt="EV charger wire and conduit run sized for the circuit" caption={BODY_IMAGES[2].caption} />

        <h2 id="same-circuit">Same circuit engineering, either way</h2>
        <p className="geo-answer">
          Whichever you choose, the circuit work is the same: a dedicated 240V circuit, wire and
          breaker sized to 125 percent of the continuous draw, grounded and bonded, pulled on a permit
          and inspected. A long run to a detached garage needs a heavier wire gauge in both cases. The
          choice between hardwired and outlet doesn't change the load calc or the run — it changes the
          termination at the wall and the amperage ceiling.
        </p>

        <h2 id="how-to-decide">How to decide</h2>
        <p>
          Start with two questions: how fast do you actually need to charge, and would you ever want to
          unplug the unit and move it. If the answers are "as fast as the panel allows" and "no," lean
          hardwired. If they're "fast enough is fine" and "maybe," lean 14-50. The amperage your panel
          can support is its own question — see{' '}
          <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage EV charger do I need</a> —
          and we'll confirm which install fits on the call. Either way we handle it as a{' '}
          <a href="/services/level-2-charger-install/">Level 2 install</a> or a{' '}
          <a href="/services/nema-14-50-outlet/">NEMA 14-50 outlet</a>, permitted and inspected.
        </p>
      </BlogArticleLayout>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          <FAQAccordion items={FAQS} />
          <InlineCTA business={BUSINESS} variant="combo" headline="Outlet or hardwire?" supporting={`Tell us where you park and how far the panel is and we'll tell you which install fits. ${BUSINESS.phone.display}.`} />
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </section>
    </>
  );
}
