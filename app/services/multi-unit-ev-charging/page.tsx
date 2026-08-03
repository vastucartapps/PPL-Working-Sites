/**
 * Service detail — Multi-Unit & Multi-Charger Wiring.
 */
import type { Metadata } from 'next';
import { PageHero, CtaBand, JsonLd, RelatedLinks } from '@ppl/shared/components';
import { KEYWORD_GRAPH } from '@content/keyword-graph';
import { webPageSchema, breadcrumbSchema, serviceSchema, faqSchema, speakableSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const ROUTE = '/services/multi-unit-ev-charging/';
const META = buildPageMeta({ pageType: 'service', ctx: { business: BUSINESS }, pathname: ROUTE });
const { city, county } = BUSINESS.location;

const FAQS = [
  { question: `Can my panel handle two EV chargers?`, answer: `Sometimes as-is, often with load management or a subpanel. Two Level 2 circuits is a lot of continuous load, so the load calc decides whether the service carries both, whether a subpanel is the cleaner route, or whether load-sharing equipment that lets the two chargers split available capacity is the answer. We run one calc for the whole picture rather than bolting on a second circuit that pushes the panel over.` },
  { question: `What is EV load management?`, answer: `Load management — or load sharing — lets two or more chargers split a single circuit's capacity, so they do not both pull full amperage at once and overrun the service. It is how you charge two cars on a panel that could not otherwise carry two full circuits. We use it where it makes sense and tell you when a subpanel or service upgrade is the better long-term fix instead.` },
  { question: `Can you wire EV charging for an ADU or a duplex?`, answer: `Yes. An ADU, a duplex, or a small multi-family property is a planned job: separate metering questions, a subpanel, and circuits sized so the whole service is not overrun. We scope it as one project — where each charger lives, how the load is shared or separated, and what the panel needs — rather than adding circuits one at a time until something trips.` },
  { question: `Do tenants or an HOA change anything?`, answer: `They can. Wiring charging for tenants raises metering and cost-allocation questions, and an HOA or property may have rules on where equipment goes and how it is fed. We plan around the metering and the property's requirements up front so the install is clean and the responsibility for the energy cost is clear. Mention the setup on the call and we will scope it.` },
];

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Multi-Unit EV Charging', href: ROUTE },
];
const crumbsForSchema = crumbs.map((c, i) => ({ name: c.label, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

export default function Page() {
  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema, mentionsEntities: ['Charging station', 'Electric vehicle', 'Electrical wiring', 'Distribution board'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Service"
        h1={<>Multi-Unit &amp;<br />Multi-Charger Wiring</>}
        subhead={`EV charging for two cars, an ADU, or a duplex — planned as one job with load management across ${city} and ${county}.`}
        backgroundImage="/images/service-multi-unit.jpg"
      />

      <article className="prose-article mx-auto max-w-3xl px-6 py-12">
        <p className="tldr">
          Multi-unit charging is EV wiring for more than one car or unit — a second EV, an ADU, a
          duplex, or a small multi-family property — planned as one job. Load management, subpanels,
          and multiple circuits sized together so the {city} service is not overrun, rather than
          bolting on a second circuit until the panel trips.
        </p>

        <h2 id="what-it-solves">What multi-unit wiring solves</h2>
        <p className="geo-answer">
          Two Level 2 circuits is a lot of continuous load, and adding a second charger to a panel
          sized for one is how households end up tripping breakers. Multi-unit wiring solves it by
          planning the whole picture at once: whether the service carries both circuits, whether a
          subpanel is cleaner, and whether load-sharing equipment that lets the chargers split
          available capacity is the right answer for a household adding a second EV or a property owner
          wiring for tenants.
        </p>

        <h2 id="how-its-built">How a proper multi-unit install is built</h2>
        <p className="geo-answer">
          A correct multi-unit install starts with one load calculation for the whole service, then
          decides the architecture — separate circuits, a subpanel, or load management — and sizes
          everything together so no single point is overrun. For an ADU or duplex it also handles the
          metering and where each charger lives. Done right, the chargers coexist on the service; done
          piecemeal, the second one is the circuit that pushes the panel over.
        </p>
        <ul>
          <li><strong>One whole-service load calc.</strong> Size the architecture to the combined load, not circuit by circuit.</li>
          <li><strong>Load management.</strong> Let chargers share capacity where the service cannot carry two full circuits.</li>
          <li><strong>Subpanel where it fits.</strong> Add spaces and capacity cleanly for multiple circuits.</li>
          <li><strong>Metering + permit.</strong> Sorted up front for ADUs, duplexes, and tenant charging; permitted and inspected.</li>
        </ul>

        <h2 id="one-job">Planned as one job</h2>
        <p>
          If the load calc shows the service cannot carry the added load, that is a{' '}
          <a href="/services/ev-panel-upgrade/">panel or service upgrade</a> first. Each charger is
          still a proper <a href="/services/level-2-charger-install/">Level 2 install</a> on its own
          circuit. For whether your panel needs more capacity before any of this, read{' '}
          <a href="/blog/do-i-need-a-panel-upgrade-for-ev-charger/">do I need a panel upgrade</a>.
        </p>
      </article>

      <CtaBand
        business={BUSINESS}
        eyebrow="Two cars, one plan"
        headline={<>Free quote.<br />Sized as one job.</>}
        subhead="Tell us the property and how many chargers you need — five minutes tells you whether load management, a subpanel, or an upgrade is the right architecture."
      />

      <div className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </div>
    </>
  );
}
