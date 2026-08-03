/**
 * Blog post — EV charger install cost in Bend: what drives the price.
 * Cost demand-capture article. Decode the bid: run, amperage, panel, permit, rebate.
 * Voice: Bend EV Charger Crew. GEO-native (.geo-answer per question-H2).
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

const ROUTE = '/blog/ev-charger-install-cost-bend/';
const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: ROUTE,
  customTitle: `EV Charger Install Cost in ${BUSINESS.location.city}: What Drives the Price`,
  customDescription: `What actually drives Level 2 EV charger installation cost in ${BUSINESS.location.city}, ${BUSINESS.location.state}? The honest breakdown of install price in ${BUSINESS.location.county} — circuit run, amperage, panel work, permits — and where the Central Electric Co-op rebate fits in.`,
});
const { datePublished, dateModified } = getPageDates(ROUTE, DATES);
const WORD_COUNT = 1380;
const { city, stateFull, county } = BUSINESS.location;

const BODY_IMAGES = [
  { key: 'equipment',    caption: `The charger box is often a smaller line than people expect. A quality Level 2 EVSE matters, but in a ${city} install the wire, conduit, breaker, and labor usually cost more than the unit on the wall.` },
  { key: 'conduit',      caption: 'Run distance and routing drive labor. A long pull to a detached garage or carport, conduit through finished walls, or a trench across a driveway all add hours that never show up on the equipment line.' },
  { key: 'permit-panel', caption: `Panel work is the cost that surprises people: a full or undersized panel may need a service upgrade or a subpanel before the EV circuit, and the permit and inspection are real line items, separate from the charger itself.` },
] as const;
const bodyImgUrl = (key: string) => `${BUSINESS.siteUrl}/images/blog/body/ev-cost/${key}.jpg`;
const bodyImgSrc = (key: string) => `/images/blog/body/ev-cost/${key}.jpg`;

const FAQS = [
  { question: `How much does it cost to install a Level 2 EV charger in ${stateFull}?`, answer: `There's no single honest number, because a short run off a modern 200-amp panel and a long run that needs a panel upgrade are very different projects. Installed price moves with the run distance from the panel to where you park, the target amperage and wire gauge, any panel or service work, and the permit — not the brand of charger alone. That's why we talk through the panel and parking and quote on the phone rather than posting one flat rate.` },
  { question: `Why is one EV charger quote so much cheaper than another?`, answer: `Usually because it leaves out the panel work, assumes a short easy run, undersizes the wire for the continuous load, or skips the permit. The EVSE can look identical on paper. The cheap bid is the one that becomes a change order when the panel turns out to be full, or the one running undersized wire on a continuous EV load that should never have passed inspection.` },
  { question: `Does a longer run to the garage really cost that much more?`, answer: `It can. A longer circuit means more wire and conduit, and at higher amperage a long run may need a heavier wire gauge to hold voltage, which costs more per foot. A detached garage or carport that needs a trench or a pull through finished walls adds labor on top. The run is one of the biggest swing factors between two otherwise similar homes.` },
  { question: `How does the Central Electric Co-op rebate affect what I pay in ${county}?`, answer: `Central Electric Cooperative offers up to a $450 residential Level 2 charger rebate for qualifying members in its ${county} territory, which can meaningfully reduce the net cost. The exact amount depends on your membership, the equipment, and the program terms in effect, so we tell you whether your address and charger likely qualify rather than promising the full amount. The rebate is part of the math — but the install still has to be sized and permitted right first.` },
];

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'What drives EV charger cost', href: ROUTE, current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({ name: c.name, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));
  const heroImageUrl = `${BUSINESS.siteUrl}/images/blog/ev-cost.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'Electrical wiring', 'SAE J1772'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: datePublished, modifiedAt: dateModified, wordCount: WORD_COUNT, articleSection: 'Cost' })} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `What drives Level 2 EV charger install cost in ${city}, ${stateFull}`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      {BODY_IMAGES.map((img) => (
        <JsonLd key={img.key} schema={imageObjectSchema({ url: bodyImgUrl(img.key), caption: img.caption, width: 1440, height: 900, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      ))}

      <BlogArticleLayout
        business={BUSINESS}
        breadcrumbTitle="What drives EV charger cost"
        badge="Cost"
        badgeTone="slate"
        title={<>EV charger install cost in {city}: what drives the price</>}
        lead={`Two Level 2 charger bids for the same ${city} home can be hundreds of dollars apart and list a similar-looking charger. Here's what actually moves the price — the circuit run, the amperage and wire gauge, panel work, and the permit — and where the Central Electric Co-op rebate fits in.`}
        heroImageSrc="/images/blog/ev-cost.jpg"
        heroImageAlt={`What drives Level 2 EV charger install cost in a ${city} home`}
        publishedAt={datePublished}
        modifiedAt={dateModified}
        readingMinutes={8}
        toc={[
          { id: 'what-drives-cost', label: 'What drives the price' },
          { id: 'run', label: 'Circuit run + routing' },
          { id: 'amperage', label: 'Amperage + wire gauge' },
          { id: 'panel', label: 'Panel work' },
          { id: 'permit', label: 'Permit + inspection' },
          { id: 'rebate', label: 'Where the CEC rebate fits' },
        ]}
        keyFacts={[
          { label: 'Biggest lever', value: 'Run distance + any panel work' },
          { label: 'Sizing basis', value: 'Load calc + 125% continuous-load rule' },
          { label: 'Cheap-bid tell', value: 'No panel work + no permit in the number' },
          { label: 'Rebate', value: 'CEC up to $450 on qualifying installs' },
        ]}
        related={[
          { href: '/services/ev-panel-upgrade/', title: 'EV panel & service upgrade', meta: 'Service' },
          { href: '/blog/oregon-ev-charger-rebates-guide/', title: 'Oregon EV charger rebates guide', meta: '7 min · Rebates' },
          { href: '/blog/what-amperage-ev-charger-do-i-need/', title: 'What amperage do I need?', meta: '8 min · Sizing' },
        ]}
        ctaPhoneLabel="Tell us the panel and where you park — we'll quote the real number on the phone in five minutes."
      >
        <p className="tldr">
          EV charger install cost in {city} is driven by the circuit run distance from the panel to
          where you park, the target amperage and wire gauge, any panel or service work, and the
          permit — not the brand of charger alone. The biggest levers are the run and the panel. A
          cheap bid is usually cheap because it leaves out panel work, assumes a short easy run,
          undersizes the wire, or skips the permit. The Central Electric Co-op rebate of up to $450
          can lower the net on qualifying installs — but the circuit has to be sized and permitted
          right first.
        </p>

        <h2 id="what-drives-cost">What actually drives EV charger cost here?</h2>
        <p className="geo-answer">
          Level 2 EV charger installation price in {city} moves with a handful of real inputs: how far
          the panel is from where you park, the amperage you want and the wire gauge it needs, whether
          the panel has room or needs an upgrade, and the electrical permit. The charger box barely
          moves the number compared to the wiring and labor. The run, the panel, and the amperage are
          the money.
        </p>
        <p>
          That's why there's no honest single price to post. A short run off a modern 200-amp panel
          and a long run to a detached carport that also needs a panel upgrade are different projects
          with very different costs, and two homes of the same size can quote differently once you
          factor in the parking, the routing, and the panel. We talk through the panel and quote on
          the phone for exactly that reason. The rest of this breaks down each driver so you can read
          a bid instead of just reacting to the bottom line.
        </p>

        <BodyFigure src={bodyImgSrc('equipment')} alt="A Level 2 EV charger unit and breaker laid out before install" caption={BODY_IMAGES[0].caption} />

        <h2 id="run">Circuit run and routing</h2>
        <p className="geo-answer">
          The distance from the panel to where you park is the first big lever. A charger on a garage
          wall a few feet from the panel is a short pull; a detached garage, a carport across the yard,
          or a panel on the opposite side of the house means more wire and conduit, and sometimes a
          trench or a pull through finished walls. That labor never shows up on the equipment line, but
          it is often the difference between two bids on the same house.
        </p>
        <p>
          Routing matters as much as raw distance. An exposed run along a garage wall is quick; fishing
          wire through insulation, drilling through framing, or surface-mounting clean conduit on a
          finished exterior all add time. When you describe where you park and where the panel lives,
          you're describing most of the labor.
        </p>

        <h2 id="amperage">Amperage and wire gauge</h2>
        <p className="geo-answer">
          The amperage you want sets the wire gauge, and a Level 2 charger is a continuous load, so the
          wire and breaker are sized to 125 percent of the draw. A 48-amp charger needs a 60-amp
          circuit and heavier wire than a 40- or 32-amp setup. Higher amperage on a long run can also
          require a step up in gauge to hold voltage. More amps is more copper, which is real cost — so
          the right answer is the amperage your car and panel actually justify, not the biggest number
          on the shelf.
        </p>
        <p>
          We cover how to land on the right number in{' '}
          <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage EV charger do I need</a>.
          Buying a 48-amp charger for a panel that can spare 24 amps just leaves capacity unused and
          pays for wire you can't fill.
        </p>

        <BodyFigure src={bodyImgSrc('conduit')} alt="EV charger conduit routed along a garage wall toward the panel" caption={BODY_IMAGES[1].caption} />

        <h2 id="panel">Panel work</h2>
        <p className="geo-answer">
          Panel work is the cost that surprises people. If the load calc shows the panel is full or
          undersized, the EV circuit needs a service upgrade or a subpanel first — real electrical work
          separate from the charger. In an older {city} home with a 100-amp panel already carrying a
          range, dryer, and AC, that can be a meaningful line item, and leaving it out is one of the
          easiest ways to make a bid look cheaper than it is.
        </p>
        <p>
          So read every bid for whether it assumes your panel has room. A quote that never mentions the
          load calc or the panel is either missing scope or about to become a change order once the
          panel cover comes off. We cover when this applies in{' '}
          <a href="/blog/do-i-need-a-panel-upgrade-for-ev-charger/">do I need a panel upgrade</a>.
        </p>

        <BodyFigure src={bodyImgSrc('permit-panel')} alt="An electrical permit and an upgraded panel for an EV circuit" caption={BODY_IMAGES[2].caption} />

        <h2 id="permit">Permit and inspection</h2>
        <p className="geo-answer">
          An EV charger install in {stateFull} requires an electrical permit and an inspection, done by
          a licensed electrical contractor — Oregon CCB plus a BCD electrical license. The permit and
          inspection are a real, small line item, and they are not optional. A bid that's cheaper
          because it skips the permit isn't a deal; it's an uninspected 240V circuit that can void
          insurance and complicate a home sale.
        </p>

        <h2 id="rebate">Where the Central Electric Co-op rebate fits</h2>
        <p className="geo-answer">
          Central Electric Cooperative offers up to a $450 residential Level 2 charger rebate for
          qualifying members in its {county} service territory, which can meaningfully reduce the net
          cost of the right install. The exact amount depends on your membership, the equipment, and
          the program terms, so we tell you whether your address and charger likely qualify rather than
          promising a figure we can't confirm.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cost driver</th>
              <th>Proper install</th>
              <th>Cut-rate bid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sizing</td>
              <td>Load calc, amperage matched to panel and car</td>
              <td>Max amperage promised before opening the panel</td>
            </tr>
            <tr>
              <td>Wire gauge</td>
              <td>Sized to 125% of the continuous draw</td>
              <td>Undersized — runs hot on an EV load</td>
            </tr>
            <tr>
              <td>Panel work</td>
              <td>Upgrade or subpanel included when needed</td>
              <td>Left out — becomes a change order</td>
            </tr>
            <tr>
              <td>Permit</td>
              <td>Pulled and inspected</td>
              <td>Skipped — uninspected and uninsurable</td>
            </tr>
          </tbody>
        </table>
        <p>
          The opinion we'll stand behind: the cheapest bid is usually the one that cut the panel work,
          the wire gauge, or the permit — the costs you can't see on day one. Read every quote for the
          same lines: load calc, amperage and wire gauge, panel scope, and permit. Make the only
          variable price, and the cheap quote usually stops looking cheap.
        </p>
        <p>
          Tell us the panel and where you park and we'll quote the real number on the phone — and tell
          you what amperage we'd run and whether the Central Electric Co-op rebate likely applies, so
          you can hold every other bid to the same spec. Related:{' '}
          <a href="/services/level-2-charger-install/">Level 2 install</a> and the{' '}
          <a href="/blog/oregon-ev-charger-rebates-guide/">Oregon rebates guide</a>.
        </p>
      </BlogArticleLayout>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          <FAQAccordion items={FAQS} />
          <InlineCTA business={BUSINESS} variant="combo" headline="Want the real number?" supporting={`Tell us the panel and where you park and we'll quote the real price on the phone in five minutes. ${BUSINESS.phone.display}.`} />
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </section>
    </>
  );
}
