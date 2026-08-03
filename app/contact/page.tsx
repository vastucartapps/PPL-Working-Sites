/**
 * Contact — Bend EV Charger Pros (Level 2 EV charger install × Bend OR).
 */
import type { Metadata } from 'next';
import { PageHero, LeadForm, ServiceAreaMap, CtaBand, JsonLd } from '@ppl/shared/components';
import {
  webPageSchema,
  breadcrumbSchema,
  organizationSchema,
  professionalServiceSchema,
  geoServiceAreaSchema,
  serviceSchema,
} from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const META = buildPageMeta({ pageType: 'contact', ctx: { business: BUSINESS }, pathname: '/contact/' });

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical },
};

export default function ContactPage() {
  const city = BUSINESS.location.city;
  const stateFull = BUSINESS.location.stateFull;
  const county = BUSINESS.location.county;

  const crumbsForSchema = [
    { name: 'Home', url: `${BUSINESS.siteUrl}/` },
    { name: 'Contact', url: `${BUSINESS.siteUrl}/contact/` },
  ];

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'ContactPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={organizationSchema(BUSINESS)} />
      <JsonLd schema={professionalServiceSchema(BUSINESS)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={geoServiceAreaSchema(BUSINESS.location, 40)} />

      <PageHero
        size="standard"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Contact"
        h1="Get in touch"
        subhead="Phone first — it's the fastest way to get a real EV charger number off your panel details and where you park. Prefer to type? Use the form and we'll respond."
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-1 shadow-sm">
                <LeadForm
                  business={BUSINESS}
                  web3FormsAccessKey="ef4bd7cc-691e-4c20-b08e-5e5e4ca79e77"
                  source="contact"
                  problemOptions={[
                    'Level 2 charger install',
                    'Not sure my panel can handle it',
                    'NEMA 14-50 outlet',
                    'Hardwired charger',
                    'Two cars / ADU / multi-unit',
                    'Central Electric Co-op rebate question',
                    'General question — not urgent',
                  ]}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-brand text-white p-6 sm:p-8 shadow-lg">
                <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-wider font-bold mb-2">
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-phone" /></svg>
                  Phone (preferred)
                </div>
                <a href={`tel:${BUSINESS.phone.tel}`} className="block mt-1 text-3xl sm:text-4xl font-extrabold hover:text-accent transition">
                  {BUSINESS.phone.display}
                </a>
                <p className="mt-3 text-sm text-neutral-200 leading-relaxed">
                  The call is free, takes about five minutes, and ends with either a real ballpark off
                  your panel details or an honest &quot;you'll need a panel upgrade first&quot; —
                  whichever fits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider font-bold mb-2">
                    <svg className="w-4 h-4" aria-hidden="true"><use href="#i-mail" /></svg>
                    Email
                  </div>
                  <a href={`mailto:${BUSINESS.email}`} className="block text-sm font-semibold text-neutral-900 hover:text-brand transition break-all">
                    {BUSINESS.email}
                  </a>
                  <p className="mt-2 text-xs text-neutral-600">For non-urgent questions — for a quote, call.</p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider font-bold mb-2">
                    <svg className="w-4 h-4" aria-hidden="true"><use href="#i-map-pin" /></svg>
                    Based in
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">{city}, {BUSINESS.location.state}</p>
                  <p className="mt-2 text-xs text-neutral-600">{county} &middot; service-area business</p>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider font-bold mb-3">
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-clock" /></svg>
                  Hours
                </div>
                <ul className="text-sm text-neutral-700 space-y-1.5">
                  <li className="flex justify-between gap-4">
                    <span className="font-semibold text-neutral-900">Mon&ndash;Fri</span>
                    <span>7 a.m. &ndash; 6 p.m. PT</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="font-semibold text-neutral-900">Sat</span>
                    <span>8 a.m. &ndash; 2 p.m. PT</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="font-semibold text-neutral-900">After hours</span>
                    <span>Voicemail, returned next morning</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                  An EV charger install is a planned project, not an emergency, so we keep normal
                  hours. Leave a voicemail or use the form after hours and a local electrician gets
                  back to you the next morning.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider font-bold mb-2">
                  <svg className="w-4 h-4" aria-hidden="true"><use href="#i-map-pin" /></svg>
                  Where we work
                </div>
                <ServiceAreaMap location={BUSINESS.location} radiusMiles={40} title={`${city}, ${stateFull} service area`} />
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Standard radius covers {county} and Central Oregon. Outside the radius? Call anyway —
                  we&apos;ll quote with travel or refer you to a closer electrician.{' '}
                  <a href="/locations/" className="text-brand font-semibold underline underline-offset-2 hover:text-accent">
                    See all locations
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Before you call</div>
            <h2 className="display text-3xl md:text-4xl font-extrabold text-brand">
              What to have ready
            </h2>
            <p className="mt-3 text-neutral-700 max-w-2xl mx-auto">
              Six things that turn a 5-minute call into a real EV charger number instead of a vague guess.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: 'i-building', title: 'Your panel size', body: 'Whether it is a 100A or 200A service — usually printed on the main breaker — sets the load math.' },
              { icon: 'i-zap', title: 'What is on the panel', body: 'A rough idea of big loads — range, dryer, AC, water heater — anchors the available capacity.' },
              { icon: 'i-property', title: 'Where you park', body: 'Garage, driveway, or carport, and how far that is from the panel, drives the run and labor.' },
              { icon: 'i-ruler', title: 'The car', body: 'Which EV you are charging tells us the amperage worth running for it.' },
              { icon: 'i-shield', title: 'Existing wiring', body: 'If you already have a 240V outlet or a charger, what it is helps us scope the job.' },
              { icon: 'i-phone', title: 'A quiet five minutes', body: 'The call goes faster when you can talk it through without distraction.' },
            ].map((tip) => (
              <li key={tip.title} className="rounded-xl bg-white border border-neutral-200 p-5 hover:border-brand hover:shadow-md transition">
                <div className="w-10 h-10 grid place-items-center rounded-lg bg-blue-100 text-brand mb-3">
                  <svg className="w-5 h-5" aria-hidden="true"><use href={`#${tip.icon}`} /></svg>
                </div>
                <h3 className="font-bold text-neutral-900">{tip.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed">{tip.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow="Skip the form"
        headline="Phone is always faster."
        subhead="Call to get a real number off your panel details and where you park. The form is fine for non-urgent questions — the phone is faster for a quote."
      />
    </>
  );
}
