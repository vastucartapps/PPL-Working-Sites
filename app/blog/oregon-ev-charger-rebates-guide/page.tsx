/**
 * Blog post — Oregon EV charger rebates guide (Central Electric Co-op).
 * Rebate demand-capture article. CEC up-to-$450 residential L2 rebate, honest framing.
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

const ROUTE = '/blog/oregon-ev-charger-rebates-guide/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `Oregon EV Charger Rebates Guide (${BUSINESS.location.county})`,
  customDescription: `How EV charger rebates work in ${BUSINESS.location.county}, ${BUSINESS.location.stateFull} — the Central Electric Cooperative up-to-$450 residential Level 2 rebate, who qualifies, what counts, and how to fit it into the cost of the right install in ${BUSINESS.location.city}.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const WORD_COUNT = 1300;
const { city, stateFull, county } = BUSINESS.location;

const BODY_IMAGES = [
  { key: 'rebate-form',  caption: `The Central Electric Co-op rebate is a member program, so the paperwork ties to your account, the equipment, and a permitted install. Keeping the invoice and model numbers makes the claim straightforward.` },
  { key: 'home-charger', caption: 'The rebate applies to a qualifying residential Level 2 charger on a permitted circuit — which is another reason the install has to be done right and inspected, not just cheap.' },
  { key: 'consult',      caption: `We tell you on the phone whether your ${county} address is in Central Electric Co-op territory and whether your equipment likely qualifies, rather than promising the full amount to everyone.` },
] as const;
const bodyImgUrl = (key: string) => `${BUSINESS.siteUrl}/images/blog/body/rebates/${key}.jpg`;
const bodyImgSrc = (key: string) => `/images/blog/body/rebates/${key}.jpg`;

const FAQS = [
  { question: `Is there an EV charger rebate in ${county}?`, answer: `Yes. Central Electric Cooperative (CEC) offers up to a $450 residential Level 2 charger rebate for qualifying members in its ${county} service territory. The exact amount depends on your membership, the equipment, and the program terms in effect, so we tell you whether your address and charger likely qualify rather than promising the full $450 to everyone.` },
  { question: `Who qualifies for the Central Electric Co-op rebate?`, answer: `It's a member program, so you generally need to be a Central Electric Cooperative member with service at the address, installing a qualifying residential Level 2 charger on a permitted circuit. Not every ${city} address is in CEC territory — some are served by other utilities — which is the first thing to confirm. We can tell you whether your address is in CEC's area on the call.` },
  { question: `Does the rebate require a permitted, inspected install?`, answer: `A rebate program tied to a qualifying Level 2 charger generally expects a proper, code-compliant install, which in ${stateFull} means a permitted circuit done by a licensed electrical contractor and inspected. That's another reason a cheap, unpermitted install is a false economy — it can put both your insurance and your rebate eligibility at risk. We do it permitted, which keeps the rebate path clean.` },
  { question: `How do I claim the rebate?`, answer: `Typically you keep the itemized invoice and the charger's model information and submit the claim to Central Electric Cooperative per its current process. Because program terms and forms change, we point you to CEC's current requirements rather than quoting a fixed procedure, and we make sure the paperwork from our side — the permitted, inspected install and an itemized invoice — supports the claim.` },
];

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Oregon EV charger rebates', href: ROUTE, current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));
  const heroImageUrl = `${BUSINESS.siteUrl}/images/blog/rebates.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'Rebate (marketing)', 'Electricity'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'Rebates' })} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `Reviewing EV charger rebate eligibility in ${city}, ${stateFull}`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      {BODY_IMAGES.map((img) => (
        <JsonLd key={img.key} schema={imageObjectSchema({ url: bodyImgUrl(img.key), caption: img.caption, width: 1440, height: 900, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      ))}

      <BlogArticleLayout
        business={BUSINESS}
        breadcrumbTitle="Oregon EV charger rebates"
        badge="Rebates"
        badgeTone="emerald"
        title={<>Oregon EV charger rebates guide for {county}</>}
        lead={`For a ${city} home, the rebate that matters most is the Central Electric Cooperative residential Level 2 charger rebate of up to $450. Here's who qualifies, what it expects from the install, and how to fit it into the cost of doing the job right.`}
        heroImageSrc="/images/blog/rebates.jpg"
        heroImageAlt={`Reviewing EV charger rebate eligibility in a ${city} home`}
        publishedAt={datePublished}
        modifiedAt={dateModified}
        readingMinutes={7}
        toc={[
          { id: 'whats-available', label: 'What is available' },
          { id: 'who-qualifies', label: 'Who qualifies' },
          { id: 'permitted', label: 'Why permitted matters' },
          { id: 'claim', label: 'How to claim it' },
          { id: 'the-math', label: 'Fitting it into the math' },
        ]}
        keyFacts={[
          { label: 'Program', value: 'Central Electric Cooperative (CEC)' },
          { label: 'Amount', value: 'Up to $450 residential Level 2' },
          { label: 'Requires', value: 'CEC member + qualifying charger' },
          { label: 'Honest note', value: 'Not every address is in CEC territory' },
        ]}
        related={[
          { href: '/services/level-2-charger-install/', title: 'Level 2 charger install', meta: 'Service' },
          { href: '/blog/ev-charger-install-cost-bend/', title: 'EV charger install cost', meta: '8 min · Cost' },
          { href: '/blog/do-i-need-a-panel-upgrade-for-ev-charger/', title: 'Do I need a panel upgrade?', meta: '8 min · Panel' },
        ]}
        ctaPhoneLabel="Tell us your address and we'll tell you whether you're in CEC territory and likely qualify."
      >
        <p className="tldr">
          The main EV charger rebate for a {county} home is the Central Electric Cooperative residential
          Level 2 charger rebate of up to $450 for qualifying members. It's a member program tied to a
          qualifying charger on a permitted install, and not every {city} address is in CEC's
          territory. We tell you whether your address and equipment likely qualify rather than promising
          the full amount — and the install still has to be sized and permitted right first.
        </p>

        <h2 id="whats-available">What's available in Deschutes County</h2>
        <p className="geo-answer">
          The rebate that applies to most {city}-area homeowners is from Central Electric Cooperative:
          up to $450 toward a residential Level 2 charger for qualifying members in its service
          territory. It's a meaningful chunk of a typical install, which is why it's worth confirming
          before you buy equipment. The exact amount depends on your membership, the charger, and the
          current program terms — we frame it as "up to $450" because that's the honest ceiling, not a
          flat payout.
        </p>

        <BodyFigure src={bodyImgSrc('rebate-form')} alt="EV charger rebate paperwork with an invoice and charger model number" caption={BODY_IMAGES[0].caption} />

        <h2 id="who-qualifies">Who qualifies</h2>
        <p className="geo-answer">
          The rebate is a member program, so you generally need to be a Central Electric Cooperative
          member with service at the address, installing a qualifying residential Level 2 charger. The
          first thing to confirm is whether your address is actually in CEC's territory — Central
          Oregon is served by more than one utility, and a {city} home on a different provider wouldn't
          use this particular program. We can check that on the call so you're not counting on a rebate
          your address doesn't qualify for.
        </p>

        <BodyFigure src={bodyImgSrc('home-charger')} alt="A qualifying residential Level 2 charger installed on a permitted circuit" caption={BODY_IMAGES[1].caption} />

        <h2 id="permitted">Why a permitted install matters for the rebate</h2>
        <p className="geo-answer">
          A rebate tied to a qualifying Level 2 charger generally expects a proper, code-compliant
          install — which in {stateFull} means a permitted circuit by a licensed electrical contractor,
          inspected. That's one more reason a cheap, unpermitted install is a false economy: it can put
          your insurance and your rebate eligibility at risk at the same time. Doing it permitted keeps
          the rebate path clean and the circuit safe.
        </p>

        <BodyFigure src={bodyImgSrc('consult')} alt="An electrician reviewing rebate eligibility with a homeowner" caption={BODY_IMAGES[2].caption} />

        <h2 id="claim">How to claim it</h2>
        <p className="geo-answer">
          Typically you keep the itemized invoice and the charger's model information and submit the
          claim to Central Electric Cooperative through its current process. Because program forms and
          terms change over time, we point you to CEC's current requirements rather than quoting a
          fixed procedure — and we make sure our side supports it with a permitted, inspected install
          and a clear itemized invoice.
        </p>

        <h2 id="the-math">Fitting the rebate into the math</h2>
        <p>
          Treat the rebate as part of the cost math, not the whole pitch. It can meaningfully lower the
          net on the right install, but the install still has to be sized and permitted correctly — a
          rebate on a wrong-sized or unpermitted circuit isn't a win. For the full cost picture see{' '}
          <a href="/blog/ev-charger-install-cost-bend/">what drives EV charger install cost</a>, and
          when you're ready, our <a href="/services/level-2-charger-install/">Level 2 install</a>{' '}
          service handles the permitted install and the paperwork that supports your claim.
        </p>
      </BlogArticleLayout>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          <FAQAccordion items={FAQS} />
          <InlineCTA business={BUSINESS} variant="combo" headline="Do you qualify?" supporting={`Tell us your address and we'll tell you whether you're in CEC territory and likely qualify. ${BUSINESS.phone.display}.`} />
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </section>
    </>
  );
}
