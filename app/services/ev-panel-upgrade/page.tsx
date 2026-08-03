/**
 * Service detail — EV Panel & Service Upgrade.
 */
import type { Metadata } from 'next';
import { PageHero, CtaBand, JsonLd, RelatedLinks } from '@ppl/shared/components';
import { KEYWORD_GRAPH } from '@content/keyword-graph';
import { webPageSchema, breadcrumbSchema, serviceSchema, faqSchema, speakableSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const ROUTE = '/services/ev-panel-upgrade/';
const META = buildPageMeta({ pageType: 'service', ctx: { business: BUSINESS }, pathname: ROUTE });
const { city, county, stateFull } = BUSINESS.location;

const FAQS = [
  { question: `How do I know if my panel needs an upgrade for an EV charger?`, answer: `A load calculation answers it. We total what the panel already carries — range, dryer, AC, water heater — against its rating, usually 100A or 200A, and see how much capacity is left. If there is room for the EV circuit, no upgrade is needed. If the panel is full, undersized, or has no open spaces, an upgrade or a subpanel comes first. We open the panel before quoting any amperage.` },
  { question: `Do I always need a 200-amp service for an EV charger?`, answer: `No. Plenty of homes charge fine on a 100-amp service with a right-sized circuit, as long as the load calc supports it. What matters is the available capacity after your existing loads, not the headline rating. A 200-amp service gives more headroom and is often worth it if you are also adding other loads, but the calc, not the number, decides.` },
  { question: `What is a subpanel and when is it the better fix?`, answer: `A subpanel is a smaller panel fed from the main service that adds circuit spaces. When the main panel has capacity but no open slots, or when you are wiring for more than one EV or an ADU, a subpanel can be cleaner and cheaper than a full service upgrade. We will tell you on the call whether a subpanel solves it or the service itself needs to grow.` },
  { question: `Is a panel upgrade done by the same licensed electrician?`, answer: `Yes. A service or panel upgrade in ${stateFull} is licensed electrical work — Oregon CCB plus a BCD electrical license — pulled on a permit and inspected, often with utility coordination for a service change. We sequence the upgrade and the EV circuit as one job so the charger lands on capacity it actually has, not a panel pushed over its limit.` },
];

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'EV Panel Upgrade', href: ROUTE },
];
const crumbsForSchema = crumbs.map((c, i) => ({ name: c.label, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

export default function Page() {
  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema, mentionsEntities: ['Electrical wiring', 'Distribution board', 'Electric vehicle', 'Charging station'] })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Service"
        h1={<>EV Panel &amp;<br />Service Upgrade</>}
        subhead={`When the load calc says the panel is full — upgrade or subpanel first, then the EV circuit, across ${city} and ${county}.`}
        backgroundImage="/images/service-panel-upgrade.jpg"
      />

      <article className="prose-article mx-auto max-w-3xl px-6 py-12">
        <p className="tldr">
          An EV panel upgrade is the honest first step when a load calculation shows the existing
          service cannot carry a Level 2 circuit. We upgrade the service or add a subpanel, then run
          the charger circuit onto capacity it actually has — rather than squeezing a 48-amp circuit
          onto a maxed-out {city} panel and living with nuisance trips and a hot panel.
        </p>

        <h2 id="why-it-comes-first">Why the panel sometimes comes first</h2>
        <p className="geo-answer">
          A Level 2 charger is a continuous load, and the panel has to have real headroom to carry it.
          When the load calc shows the service is already near its limit — a full 100-amp panel with a
          range, dryer, and AC, or no open breaker spaces — the right sequence is to upgrade the
          service or add a subpanel first, then land the EV circuit. Skipping that is how an
          undersized panel ends up tripping breakers or running hot once the car is charging nightly.
        </p>

        <h2 id="upgrade-or-subpanel">Upgrade the service or add a subpanel?</h2>
        <p className="geo-answer">
          If the main service itself is undersized, the fix is a service upgrade — often to 200 amps —
          coordinated with the utility, permitted, and inspected. If the service has capacity but no
          open slots, or you are wiring more than one EV or an ADU, a subpanel adds circuit spaces
          more simply and cheaply. The load calc tells us which one your house needs; we will not sell
          a full service change when a subpanel solves it.
        </p>
        <ul>
          <li><strong>Load calc.</strong> Existing connected load against the service rating — the deciding number.</li>
          <li><strong>Service upgrade.</strong> When the main is undersized; utility-coordinated, permitted, inspected.</li>
          <li><strong>Subpanel.</strong> When you need spaces or are adding multiple circuits.</li>
          <li><strong>Then the EV circuit.</strong> Sequenced as one job so the charger lands on real capacity.</li>
        </ul>

        <h2 id="one-job">Sequenced as one job</h2>
        <p>
          We plan the upgrade and the <a href="/services/level-2-charger-install/">Level 2 install</a>
          {' '}together so nothing is wasted and nothing trips. If you are wiring for more than one car
          or an ADU, see <a href="/services/multi-unit-ev-charging/">multi-unit charging</a>, and for
          the full picture on whether you even need this step, read{' '}
          <a href="/blog/do-i-need-a-panel-upgrade-for-ev-charger/">do I need a panel upgrade for an EV
          charger</a> and <a href="/blog/what-amperage-ev-charger-do-i-need/">what amperage you need</a>.
        </p>
      </article>

      <CtaBand
        business={BUSINESS}
        eyebrow="Check the panel first"
        headline={<>Free load check.<br />Honest sequence.</>}
        subhead="Tell us your panel and what is on it — five minutes tells you whether the EV circuit fits as-is or the panel needs an upgrade first."
      />

      <div className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </div>
    </>
  );
}
