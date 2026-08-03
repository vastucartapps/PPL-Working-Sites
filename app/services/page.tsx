/**
 * Services hub — /services/
 * Lists the 4 Level 2 EV charger services as zipper sections per Prototype A.
 */
import type { Metadata } from 'next';
import {
  PageHero,
  CtaBand,
  JsonLd,
  RelatedLinks,
  ResponsiveImage,
} from '@ppl/shared/components';
import { KEYWORD_GRAPH } from '@content/keyword-graph';
import {
  webPageSchema,
  breadcrumbSchema,
  offerCatalogSchema,
  faqSchema,
  speakableSchema,
} from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';
import { SERVICES } from '@content/services';

const ROUTE = '/services/';
const META = buildPageMeta({ pageType: 'services-index', ctx: { business: BUSINESS }, pathname: ROUTE });
const city = BUSINESS.location.city;
const state = BUSINESS.location.state;
const county = BUSINESS.location.county;

const FAQS = [
  { question: `Which EV charger service do I need?`, answer: `It comes down to your panel and where you park. A straightforward Level 2 install puts a dedicated 240V circuit on a panel that has room. If the panel is full or undersized, that is a service or subpanel upgrade first. Want flexibility to unplug and move the unit? That is a NEMA 14-50 outlet. Two cars or an ADU is multi-unit wiring. The phone call sorts it in a few minutes.` },
  { question: `Will my panel in ${city} handle a Level 2 charger?`, answer: `It depends on a load calculation — what the panel already carries against its rating, usually 100A or 200A. A modern 200-amp service with headroom typically takes a 40- or 48-amp circuit; a full or older panel may need an upgrade first or only support a smaller circuit. We open the panel and run the calc before promising any amperage.` },
  { question: `Why does the amperage matter so much?`, answer: `Charge speed on Level 2 is set by the circuit amperage, and a Level 2 charger is a continuous load, so wire and breaker are sized to 125 percent of the draw. Run too much amperage for the panel and you trip breakers or overheat wire; run too little and you charge slowly. Right-sizing the circuit to the car and the panel is the part a rushed installer skips and you live with.` },
];

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: ROUTE },
];
const crumbsForSchema = crumbs.map((c, i) => ({ name: c.label, url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}` }));

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={faqSchema(FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={offerCatalogSchema(BUSINESS, SERVICES)} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our services"
        h1={<>Four EV charger services<br />for {city} &amp; Central Oregon</>}
        subhead="Level 2 charger installs, panel upgrades, NEMA 14-50 outlets, and multi-car wiring — sized off a real panel load calc, not a guess at an amperage. Service-area model: we route your call to a vetted, licensed local Oregon electrician."
        backgroundImage="/images/service-level-2.jpg"
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="geo-answer">
            We do four kinds of EV charging work across {city} and the rest of {county}: Level 2
            charger installs (a dedicated 240V circuit and a hardwired or plug-in EVSE), panel and
            service upgrades (when the load calc says the existing panel cannot carry the circuit),
            NEMA 14-50 outlets (a flexible 240V outlet for a portable charger), and multi-unit wiring
            (two cars, an ADU, or a duplex planned as one job with load management). Every install
            starts with a real load calculation. Phone consultation is free; an on-site look produces
            a written quote before any work begins, and we pull the {state} electrical permit.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          {SERVICES.map((s, i) => {
            const slug = s.url.replace(`${BUSINESS.siteUrl}/services/`, '').replace(/\/$/, '');
            const reverse = i % 2 === 1;
            const SERVICE_IMAGES = ['/images/service-level-2.jpg', '/images/service-panel-upgrade.jpg', '/images/service-nema-outlet.jpg', '/images/service-multi-unit.jpg'];
            return (
              <article key={s.name} id={slug} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className={`aspect-[4/3] rounded-lg overflow-hidden bg-neutral-200 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                  <ResponsiveImage
                    src={SERVICE_IMAGES[i] ?? '/images/service-level-2.jpg'}
                    alt={`${s.name} for ${city}, ${state}`}
                    profile="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Service</div>
                  <h2 className="display text-2xl md:text-3xl lg:text-4xl text-brand font-extrabold mb-3">{s.name}</h2>
                  <p className="text-neutral-700 leading-relaxed mb-5">{s.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <a href={s.url.replace(BUSINESS.siteUrl, '')} className="btn-primary">Read more</a>
                    <a href={`tel:${BUSINESS.phone.tel}`} className="btn-navy">
                      <svg className="w-5 h-5" aria-hidden="true"><use href="#i-phone" /></svg>
                      {BUSINESS.phone.display}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow="Not sure which install you need?"
        headline={<>Call us and we&apos;ll figure it out<br />on the phone.</>}
        subhead="A few minutes on the phone usually tells us whether you want a hardwired Level 2 install, a panel upgrade first, a NEMA 14-50 outlet, or multi-car wiring — and roughly what it runs. Free, no-pressure."
      />

      <div className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <RelatedLinks graph={KEYWORD_GRAPH} currentPath={ROUTE} />
        </div>
      </div>
    </>
  );
}
