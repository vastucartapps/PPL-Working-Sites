/**
 * Service detail — NEMA 14-50 Outlet Install.
 */
import type { Metadata } from 'next';
import { PageHero, CtaBand, JsonLd, RelatedLinks } from '@ppl/shared/components';
import { KEYWORD_GRAPH } from '@content/keyword-graph';
import { webPageSchema, breadcrumbSchema, serviceSchema, faqSchema, speakableSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const ROUTE = '/services/nema-14-50-outlet/';
const META = buildPageMeta({ pageType: 'service', ctx: { business: BUSINESS }, pathname: ROUTE });
const { city, county, stateFull } = BUSINESS.location;

const FAQS = [
  { question: `What is a NEMA 14-50 outlet and what does it charge at?`, answer: `A NEMA 14-50 is a 240V outlet — the same one used for electric ranges and RVs — installed on a dedicated 50-amp circuit. Plugged into a portable Level 2 EVSE, it typically supports up to a 40-amp continuous charging draw, since a continuous load is limited to 80 percent of the circuit. That is enough Level 2 speed for most ${city} drivers, with the bonus that you can unplug the unit and take it with you.` },
  { question: `Is a NEMA 14-50 outlet cheaper than hardwiring?`, answer: `Often, but not always. The outlet itself is a simple device, and if your panel has room and the run is short, the install can be straightforward. The cost still comes from the same places as any EV circuit — the run distance, the wire gauge for 50 amps, and any panel work. The flexibility to unplug is usually the bigger reason to choose it, not a guaranteed lower price.` },
  { question: `Can I run any portable charger on a 14-50 outlet?`, answer: `Most portable Level 2 EVSEs come with or offer a NEMA 14-50 plug and will charge up to 40 amps on a 50-amp circuit. Check that your unit is rated for the draw and that it is a quality, listed charger — a cheap cord that overheats at the plug is the failure point people hit. We can recommend a setup that matches the outlet and your car.` },
  { question: `Do you still pull a permit for an outlet?`, answer: `Yes. A 240V NEMA 14-50 outlet on a dedicated 50-amp circuit is licensed electrical work in ${stateFull} — Oregon CCB plus a BCD electrical license — pulled on a permit and inspected. It is a real circuit with real wire and breaker sizing, not a plug-in afternoon project, and the permit and inspection are what keep it safe and insurable.` },
];

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'NEMA 14-50 Outlet', href: ROUTE },
];
const crumbsForSchema = crumbs.map((c, i) => ({ name: c.label, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

export default function Page() {
  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'Electrical wiring', 'NEMA connector'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Service"
        h1={<>NEMA 14-50<br />Outlet Install</>}
        subhead={`A flexible 240V outlet on a dedicated 50-amp circuit for a plug-in Level 2 charger across ${city} and ${county}.`}
        backgroundImage="/images/service-nema-outlet.jpg"
      />

      <article className="prose-article mx-auto max-w-3xl px-6 py-12">
        <p className="tldr">
          A NEMA 14-50 outlet is a 240V outlet on a dedicated 50-amp circuit that lets you plug in a
          portable Level 2 charger — flexible, unpluggable, and often the simpler install for a {city}
          home. It typically supports up to a 40-amp charging draw, which is real Level 2 speed, with
          the bonus that you can unplug the unit and take it when you move.
        </p>

        <h2 id="what-it-solves">When an outlet is the right call</h2>
        <p className="geo-answer">
          A NEMA 14-50 outlet suits the driver who values flexibility over the absolute fastest
          charge: you can unplug a portable EVSE and move it, swap units later, or take it to a new
          home. At up to 40 amps it charges plenty fast for most daily driving. If you want the
          highest continuous amperage or the cleanest permanent install, a hardwired unit is the other
          path — the run length and your target amperage decide.
        </p>

        <h2 id="how-its-built">How a proper 14-50 install is built</h2>
        <p className="geo-answer">
          A correct outlet install starts with a load calculation, then runs a dedicated 50-amp 240V
          circuit at the right wire gauge, lands a 50-amp double-pole breaker, and installs a quality,
          listed NEMA 14-50 receptacle, grounded and bonded. Because EV charging is a continuous load,
          the outlet is held to a 40-amp draw, and using a quality charger that does not overheat at
          the plug matters — a cheap cordset is the usual failure point.
        </p>
        <ul>
          <li><strong>Load calc.</strong> Confirm the panel can carry a dedicated 50-amp circuit.</li>
          <li><strong>50-amp circuit.</strong> Right wire gauge and a 50-amp double-pole breaker.</li>
          <li><strong>Listed receptacle.</strong> A quality NEMA 14-50 outlet, grounded and bonded.</li>
          <li><strong>Permit + inspection.</strong> Pulled and inspected — a real circuit, not a plug-in project.</li>
        </ul>

        <h2 id="outlet-or-hardwired">Outlet or hardwired?</h2>
        <p>
          A NEMA 14-50 outlet gives flexibility; a{' '}
          <a href="/services/level-2-charger-install/">hardwired Level 2 install</a> can run a higher
          continuous amperage and suits a long run. If the load calc shows the panel is full, that is
          a <a href="/services/ev-panel-upgrade/">panel upgrade</a> first. We compare the two in depth
          in <a href="/blog/hardwired-vs-nema-14-50-ev-charger/">hardwired vs NEMA 14-50</a> and cover
          sizing in <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage you need</a>.
        </p>
      </article>

      <CtaBand
        business={BUSINESS}
        eyebrow="Flexible Level 2"
        headline={<>Free quote.<br />Unplug and go.</>}
        subhead="Tell us your panel and where you park — five minutes tells you whether a 14-50 outlet fits and whether it or a hardwired unit is the better call."
      />

      <div className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </div>
    </>
  );
}
