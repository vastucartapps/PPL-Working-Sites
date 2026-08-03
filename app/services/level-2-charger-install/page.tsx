/**
 * Service detail — Level 2 Charger Installation.
 */
import type { Metadata } from 'next';
import { PageHero, CtaBand, JsonLd, RelatedLinks } from '@ppl/shared/components';
import { KEYWORD_GRAPH } from '@content/keyword-graph';
import { webPageSchema, breadcrumbSchema, serviceSchema, faqSchema, speakableSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const ROUTE = '/services/level-2-charger-install/';
const META = buildPageMeta({ pageType: 'service', ctx: { business: BUSINESS }, pathname: ROUTE });
const { city, county, stateFull } = BUSINESS.location;

const FAQS = [
  { question: `How much does a Level 2 charger install cost in ${city}?`, answer: `Cost is driven by the run distance from the panel to where you park, the target amperage and wire gauge, whether any panel work is needed, and the permit — not one flat rate. The charger box is often a smaller line than the wiring and labor. A short run off a modern 200-amp panel is the simple end; a long run or a panel upgrade adds to it. We quote on the phone after the panel and parking details, and the Central Electric Co-op rebate can apply.` },
  { question: `How fast will it charge my car?`, answer: `Charge speed comes from the circuit amperage, not the charger brand. A 40-amp circuit delivers more than a 20-amp one, and the EVSE can only pull what the circuit and panel allow. We run a load calc to find the honest amperage your panel can support, then size the circuit to that and to what your specific EV can accept.` },
  { question: `Do you handle the permit and inspection?`, answer: `Yes. A Level 2 install in ${stateFull} requires an electrical permit and an inspection, and the work has to be done by a licensed electrical contractor (Oregon CCB plus a BCD electrical license). We pull the permit, do the work to code, and see it through inspection. An uninspected 240V circuit is a liability and an insurance problem, not a saving.` },
  { question: `Hardwired or a NEMA 14-50 outlet — which goes with this?`, answer: `Either. A hardwired unit can run a higher continuous amperage and suits a long run or the fastest charging; a NEMA 14-50 outlet lets you plug in a portable EVSE you can unplug and move, typically up to a 40-amp draw. We size the circuit the same way for both — the run length and your target amperage decide which install makes sense.` },
];

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Level 2 Charger Install', href: ROUTE },
];
const crumbsForSchema = crumbs.map((c, i) => ({ name: c.label, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

export default function Page() {
  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'SAE J1772', 'Electrical wiring'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Service"
        h1={<>Level 2<br />Charger Installation</>}
        subhead={`A dedicated 240V circuit and a hardwired or plug-in EVSE — the core home-charging install across ${city} and ${county}.`}
        backgroundImage="/images/service-level-2.jpg"
      />

      <article className="prose-article mx-auto max-w-3xl px-6 py-12">
        <p className="tldr">
          A Level 2 charger install is a dedicated 240V circuit feeding a hardwired or plug-in EVSE,
          and it is the standard fix for a {city} EV owner tired of adding a few miles a night on a
          120V outlet. Sized off a real panel load calculation, with wire and breaker rated to 125
          percent of the continuous draw, grounded and bonded, permitted and inspected — so you wake
          up to a full battery without overrunning the panel.
        </p>

        <h2 id="what-it-solves">What a Level 2 install solves</h2>
        <p className="geo-answer">
          A Level 2 charger turns home charging from a trickle into an overnight fill. A 120V outlet
          adds only a few miles of range per hour; a Level 2 circuit at 240V charges several times
          faster, which is the difference between always topping up and never thinking about it. For
          most full EVs and a normal {city} commute, Level 2 is what makes home charging actually keep
          up with how you drive.
        </p>

        <h2 id="how-its-built">How a proper Level 2 install is built</h2>
        <p className="geo-answer">
          A correct install starts with a load calculation on the panel, then runs a dedicated 240V
          circuit at the right wire gauge for the amperage, lands a correctly sized double-pole
          breaker, grounds and bonds the circuit, and mounts and connects the hardwired unit or NEMA
          14-50 outlet. Because an EV charger is a continuous load, the wire and breaker are sized to
          125 percent of the draw — undersizing them is a heat problem you live with, not a corner to cut.
        </p>
        <ul>
          <li><strong>Load calc.</strong> Open the panel, check available capacity, set the amperage the service can carry.</li>
          <li><strong>Dedicated circuit.</strong> Right wire gauge and a correctly sized breaker for the continuous load.</li>
          <li><strong>Unit + connection.</strong> Hardwired EVSE or a NEMA 14-50 outlet, grounded and bonded.</li>
          <li><strong>Permit + inspection.</strong> Pulled and inspected — the part that protects you.</li>
        </ul>

        <h2 id="hardwired-or-outlet">Hardwired or a NEMA 14-50 outlet?</h2>
        <p>
          A hardwired unit can run a higher continuous amperage and is the call for a long run or the
          fastest charging; a <a href="/services/nema-14-50-outlet/">NEMA 14-50 outlet</a> lets you
          unplug and move a portable EVSE. If the load calc shows the panel is full, that is a{' '}
          <a href="/services/ev-panel-upgrade/">panel upgrade</a> first. We walk through which one
          your house actually needs in <a href="/blog/hardwired-vs-nema-14-50-ev-charger/">hardwired
          vs NEMA 14-50</a> and <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage you
          need</a>.
        </p>
      </article>

      <CtaBand
        business={BUSINESS}
        eyebrow="Wake up to a full battery"
        headline={<>Free quote.<br />Right-sized. Permitted.</>}
        subhead="Tell us your panel and where you park — five minutes tells you whether your panel carries a Level 2 circuit as-is and what amperage it supports."
      />

      <div className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </div>
    </>
  );
}
