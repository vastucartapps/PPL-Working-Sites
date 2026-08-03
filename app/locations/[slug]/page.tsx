/**
 * /locations/[slug]/ — per-town page for the EV charger site.
 * One per BUSINESS.location.nearbyCities (Redmond / Sisters / Prineville / La Pine).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero, CtaBand, ServiceCardGrid, ProcessSteps, JsonLd } from '@ppl/shared/components';
import {
  webPageSchema,
  breadcrumbSchema,
  professionalServiceSchema,
  serviceSchema,
  geoServiceAreaSchema,
} from '@ppl/shared/lib/schema-gen';
import { BUSINESS } from '@content/business';

function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const TOWN_DETAIL: Record<string, {
  intro: string;
  whyHere: readonly string[];
  housingNote: string;
  callPattern: string;
}> = {
  redmond: {
    intro: 'Redmond — our nearest neighbor north of Bend, with a deep base of newer subdivision homes on modern 200-amp panels. The common job is a clean Level 2 install where the panel has room and the run to the garage is short.',
    whyHere: [
      'Newer subdivision stock means modern 200-amp panels with headroom, so many Redmond installs are the straightforward end — a dedicated 240V circuit and a hardwired unit or NEMA 14-50 outlet.',
      'Steady EV adoption across Redmond brings a constant flow of new owners ready to stop charging on a wall outlet and wake up to a full battery.',
      'Attached garages close to the panel keep the run short, which keeps the cost down — the kind of install where the load calc confirms what the panel already suggests.',
    ],
    housingNote: 'Redmond housing skews newer single-family and subdivision homes, many with 200-amp service. Most jobs are clean Level 2 installs; the variable is the car and the amperage worth running, not whether the panel can carry it. Standard load-calc, permit, and inspection apply.',
    callPattern: 'Calls cluster after a new-EV delivery and pick up steadily as the area’s EV count grows. Rebate-driven projects come through year-round.',
  },
  sisters: {
    intro: 'Sisters — a smaller town west of Bend with a mix of newer custom homes, older stock, and second homes. The work runs from clean garage installs to longer runs to detached garages and carports.',
    whyHere: [
      'Custom and second homes often park in detached garages or carports, so the run length and outdoor-rated equipment are the real planning work — which is where a site look earns its place over a phone ballpark.',
      'A real Cascades-edge winter means owners want cold-tolerant, outdoor-rated EVSE for any exterior install — the wiring does not care about the cold, but the equipment rating matters.',
      'Short-term rentals and second homes favor simple, reliable setups owners can leave between visits, which a clean hardwired install or a 14-50 outlet handles well.',
    ],
    housingNote: 'Sisters housing ranges from newer custom homes to older in-town stock and second homes. Detached structures and longer runs are more common here than in town, so the run and the equipment rating are the variables. We confirm the route before quoting.',
    callPattern: 'Year-round owners call ahead of buying an EV; second-home owners tend to call in spring and fall, getting a place ready before they arrive or before they close it up.',
  },
  prineville: {
    intro: 'Prineville — the Crook County seat a bit farther out, with a mix of older in-town homes and newer builds on the edges. The older stock is where the load calc decides whether the panel carries a Level 2 circuit.',
    whyHere: [
      'Older in-town homes often have 100-amp panels that may need a right-sized circuit or an upgrade before a Level 2 charger — exactly the case the load calc is for.',
      'Newer builds on the edges of town are usually the straightforward installs on modern panels, so the job mix here is broad.',
      'Owners weighing an EV want a straight answer on whether their panel carries it, which is the load-calc conversation we have on every call here.',
    ],
    housingNote: 'Prineville leans toward older single-family homes in town with some 100-amp panels, plus newer builds on the outskirts. The deciding variable is the panel — we open it and run the calc before promising any amperage. Permit and inspection apply.',
    callPattern: 'Picks up after new-EV purchases and around the time owners realize a wall outlet is not keeping up; rebate questions come through year-round.',
  },
  'la-pine': {
    intro: 'La Pine — a spread-out community south of Bend with a lot of rural and manufactured-home lots, where the run from the panel to where you park is often the biggest cost driver.',
    whyHere: [
      'Rural and large lots mean longer wire pulls and detached structures, so the run is the main planning variable — and the thing a phone-only ballpark gets wrong without a site look.',
      'Manufactured and older homes can have smaller panels, which makes the load calc and a possible upgrade part of the conversation more often here.',
      'Owners who park well away from the panel benefit from a site look that prices the real run rather than a guess, so the quote is the price they pay.',
    ],
    housingNote: 'La Pine housing includes rural single-family, manufactured homes, and large lots. Longer runs and panel checks are common, so the cost driver is usually the run distance and any panel work. We confirm the route and the panel before quoting.',
    callPattern: 'Calls run steady through the year, often after a new-EV delivery, with the run length being the detail we confirm on every quote.',
  },
};

export async function generateStaticParams() {
  return BUSINESS.location.nearbyCities.map((c) => ({ slug: slugify(c.name) }));
}

export const dynamicParams = false;

interface Params { slug: string; }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const town = BUSINESS.location.nearbyCities.find((c) => slugify(c.name) === slug);
  if (!town) return { title: 'Location not found' };
  const title = `EV Charger Installation in ${town.name}, ${town.state} — Level 2 Chargers from ${BUSINESS.location.city}`;
  const description = `Level 2 EV charger installation in ${town.name}, ${town.state} — hardwired chargers, NEMA 14-50 outlets, panel upgrades, and multi-car wiring. About ${town.distanceMi} miles from our ${BUSINESS.location.city} base. Free phone quote, real panel load check, and Central Electric Co-op rebate guidance.`;
  const canonical = `${BUSINESS.siteUrl}/locations/${slug}/`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: 'website' } };
}

export default async function TownPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const town = BUSINESS.location.nearbyCities.find((c) => slugify(c.name) === slug);
  if (!town) notFound();

  const detail = TOWN_DETAIL[slug];
  const homeCity = BUSINESS.location.city;
  const county = BUSINESS.location.county;
  const stateFull = BUSINESS.location.stateFull;

  const otherTowns = BUSINESS.location.nearbyCities.filter((c) => slugify(c.name) !== slug);
  const url = `${BUSINESS.siteUrl}/locations/${slug}/`;
  const crumbs = [
    { name: 'Home', url: `${BUSINESS.siteUrl}/` },
    { name: 'Locations', url: `${BUSINESS.siteUrl}/locations/` },
    { name: `${town.name}, ${town.state}`, url },
  ];

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url, title: `EV Charger Installation in ${town.name}, ${town.state}`, description: `Level 2 EV charger installation in ${town.name}, ${town.state}. About ${town.distanceMi} miles from our ${homeCity} base.`, breadcrumbs: crumbs, mentionsEntities: ['Charging station', 'Electric vehicle', 'SAE J1772', 'Electrical wiring'] })} />
      <JsonLd schema={breadcrumbSchema(crumbs)} />
      <JsonLd schema={professionalServiceSchema(BUSINESS)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={geoServiceAreaSchema(BUSINESS.location, 40)} />

      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations/' },
          { label: `${town.name}, ${town.state}` },
        ]}
        eyebrow={`Central Oregon, ${BUSINESS.location.state}`}
        h1={`EV charger installation in ${town.name}, ${town.state}.`}
        subhead={detail?.intro ?? `We install Level 2 EV chargers in ${town.name} as part of our ${county} service area. Tell us the panel, get a phone quote, and we schedule the install from there.`}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-2">Local context</div>
            <h2 className="display text-3xl md:text-5xl text-brand mb-6">
              Why {town.name} gets EV charger calls
            </h2>
            {detail ? (
              <>
                <ul className="space-y-4 mb-8">
                  {detail.whyHere.map((why, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-700 leading-relaxed">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-brand grid place-items-center font-extrabold text-sm mt-0.5">
                        {i + 1}
                      </span>
                      <span>{why.replace('{city}', homeCity)}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="display text-xl md:text-2xl text-brand mt-8 mb-3 font-extrabold">Homes and install fit</h3>
                <p className="text-neutral-700 leading-relaxed mb-5">{detail.housingNote}</p>
                <h3 className="display text-xl md:text-2xl text-brand mt-8 mb-3 font-extrabold">When the calls cluster</h3>
                <p className="text-neutral-700 leading-relaxed">{detail.callPattern}</p>
              </>
            ) : (
              <p className="text-neutral-700 leading-relaxed">
                {town.name} is covered as part of our standard {county} service area. Tell us about the
                panel and we&apos;ll quote the install over the phone.
              </p>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-brand text-white rounded-lg p-7 sticky top-24">
              <div className="eyebrow mb-2 !text-accent">Get a quote</div>
              <h3 className="display text-2xl font-extrabold mb-3 !text-white">
                {town.name} free phone quote
              </h3>
              <p className="text-sm text-neutral-200 mb-5 leading-relaxed">
                Tell us your panel and where you park, and a few minutes on the phone tells you what the
                install would cost and what Central Electric Co-op rebate likely applies. No cost, no pressure.
              </p>
              <a href={`tel:${BUSINESS.phone.tel}`} className="btn-primary w-full py-3 rounded flex items-center justify-center gap-2 mb-3">
                <svg className="w-4 h-4" aria-hidden="true"><use href="#i-phone" /></svg>
                {BUSINESS.phone.display}
              </a>
              <a href="/#lead-form" className="btn-ghost w-full py-3 rounded text-center block">
                Send a message
              </a>
            </div>
          </aside>
        </div>
      </section>

      <ServiceCardGrid
        eyebrow={`Services available in ${town.name}`}
        title="Four installs. Same panel load check in every town."
        items={[
          {
            imageSrc: '/images/service-level-2.jpg',
            imageAlt: `Level 2 EV charger installation in ${town.name}, ${town.state}`,
            badge: 'Most common',
            title: 'Level 2 Install',
            description: `A dedicated 240V circuit and a hardwired or plug-in EVSE for a ${town.name} home — the core install for fast overnight charging.`,
            ctaHref: '/services/level-2-charger-install/',
            ctaLabel: 'Read more',
          },
          {
            imageSrc: '/images/service-panel-upgrade.jpg',
            imageAlt: `EV panel upgrade in ${town.name}`,
            badge: 'When the panel is full',
            title: 'Panel Upgrade',
            description: 'When the load calc says the panel cannot carry the circuit — upgrade or subpanel first, then the EV circuit.',
            ctaHref: '/services/ev-panel-upgrade/',
            ctaLabel: 'Read more',
          },
          {
            imageSrc: '/images/service-nema-outlet.jpg',
            imageAlt: `NEMA 14-50 outlet install in ${town.name}`,
            badge: 'Flexible',
            title: 'NEMA 14-50 Outlet',
            description: 'A flexible 240V outlet on a dedicated 50-amp circuit for a plug-in charger you can unplug and move.',
            ctaHref: '/services/nema-14-50-outlet/',
            ctaLabel: 'Read more',
          },
          {
            imageSrc: '/images/service-multi-unit.jpg',
            imageAlt: `Multi-unit EV charging wiring in ${town.name}`,
            badge: 'Two cars / ADU',
            title: 'Multi-Unit',
            description: 'EV charging for two cars, an ADU, or a duplex — load management and subpanels planned as one job.',
            ctaHref: '/services/multi-unit-ev-charging/',
            ctaLabel: 'Read more',
          },
        ]}
      />

      <ProcessSteps
        eyebrow="How a job goes"
        title={`From ${town.name} panel to installed charger.`}
        steps={[
          { title: 'Panel + parking details', description: `Tell us the panel in ${town.name} — its size, what is on it, where you park, and the car. We quote the install over the phone, no charge to talk it through.` },
          { title: 'Load calc + site look', description: `We run a load calculation and confirm on-site: available capacity, the circuit run, wire gauge, breaker, and amperage, then a firm number in writing before anything starts.` },
          { title: 'Install + permit', description: `Dedicated 240V circuit run, breaker landed, hardwired unit or NEMA 14-50 outlet mounted, grounded and bonded — all on an Oregon electrical permit.` },
          { title: 'Inspection + rebate', description: `We pass inspection, show you how it runs, and hand over the paperwork — including what you need for the Central Electric Co-op rebate. You sign off only when it's right.` },
        ]}
      />

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Nearby towns we also cover</div>
            <h2 className="display text-3xl md:text-4xl text-brand">Other Central Oregon stops</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherTowns.map((c) => (
              <a
                key={c.name}
                href={`/locations/${slugify(c.name)}/`}
                className="lift bg-white border border-neutral-200 rounded-lg p-5 text-center block hover:border-accent"
              >
                <div className="display text-lg font-extrabold text-brand">{c.name}</div>
                <div className="text-xs uppercase tracking-wider text-neutral-600 font-semibold mt-1">
                  {c.state}
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/locations/" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-fg">
              View full service-area map
              <svg className="w-4 h-4" aria-hidden="true"><use href="#i-arrow-right" /></svg>
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow={`${town.name}, ${stateFull}`}
        headline={<>Tired of charging on a wall outlet in {town.name}?<br />Tell us the panel.</>}
        subhead="Free phone quote from your panel details. A few minutes tells you what a Level 2 install would cost and what rebate applies — and we're honest about whether the panel needs an upgrade first."
      />
    </>
  );
}
