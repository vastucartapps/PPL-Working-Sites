/**
 * Locations — service-area page for the EV charger site (Bend EV Charger Pros × Bend OR).
 * Same schema layers and structure as the portfolio pattern; Deschutes County / Central Oregon voice.
 */
import type { Metadata } from 'next';
import { PageHero, CtaBand, JsonLd } from '@ppl/shared/components';
import {
  webPageSchema,
  breadcrumbSchema,
  itemListSchema,
  geoServiceAreaSchema,
  professionalServiceSchema,
  serviceSchema,
} from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';

const META = buildPageMeta({ pageType: 'locations', ctx: { business: BUSINESS }, pathname: '/locations/' });

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical },
};

interface TownNote {
  readonly name: string;
  readonly state: string;
  readonly distanceMi: number;
  readonly pop: number;
  readonly note: string;
}

const TOWN_NOTES: Record<string, string> = {
  'Redmond': 'Our nearest neighbor on the way north, with a deep base of newer subdivision homes on modern 200-amp panels — often the straightforward Level 2 install where the panel has room and the run to the garage is short. Steady EV adoption across Redmond means we see plenty of new owners ready to stop charging on a wall outlet.',
  'Sisters': 'A smaller town to the west with a mix of newer custom homes and older stock, plus second homes and short-term rentals. The work here runs from clean garage installs on modern panels to longer runs to detached garages and carports. Owners often want outdoor-rated equipment that holds up to a real Cascades-edge winter.',
  'Prineville': 'The Crook County seat a bit farther out, with a mix of older in-town homes and newer builds on the edges. The older stock is where the load calc earns its place — a 100-amp panel may need an upgrade or a right-sized circuit before a Level 2 charger. We tell owners straight whether the panel carries it as-is.',
  'La Pine': 'A spread-out community south of Bend with a lot of rural and manufactured-home lots, where the run from the panel to where you park is often the biggest cost driver. Longer wire pulls and detached structures are common, which is exactly the kind of job a phone ballpark without a site look gets wrong — so we confirm the run before quoting.',
};

const TOWNS: readonly TownNote[] = BUSINESS.location.nearbyCities.map((c) => ({
  name: c.name,
  state: c.state,
  distanceMi: c.distanceMi,
  pop: c.pop,
  note: TOWN_NOTES[c.name] ?? `Covered as part of the standard ${BUSINESS.location.county} service area; about ${c.distanceMi} miles from ${BUSINESS.location.city}.`,
}));

export default function LocationsPage() {
  const city = BUSINESS.location.city;
  const state = BUSINESS.location.state;
  const county = BUSINESS.location.county;
  const crumbsForSchema = [
    { name: 'Home', url: `${BUSINESS.siteUrl}/` },
    { name: 'Locations', url: `${BUSINESS.siteUrl}/locations/` },
  ];

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'CollectionPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={professionalServiceSchema(BUSINESS)} />
      <JsonLd schema={serviceSchema(BUSINESS)} />
      <JsonLd schema={geoServiceAreaSchema(BUSINESS.location, 40)} />
      <JsonLd schema={itemListSchema(
        `Towns Served by ${BUSINESS.name}`,
        [
          { name: `${city}, ${state}`, url: `${BUSINESS.siteUrl}/`, description: `Primary service base, population ${BUSINESS.location.population.toLocaleString()}` },
          ...TOWNS.map((t) => {
            const slug = t.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return { name: `${t.name}, ${t.state}`, url: `${BUSINESS.siteUrl}/locations/${slug}/`, description: `About ${t.distanceMi} miles from ${city}, population ${t.pop.toLocaleString()}` };
          }),
        ],
      )} />

      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Locations' }]}
        eyebrow="Service area"
        h1={`Towns we serve across ${county} and Central Oregon`}
        subhead={`Based in ${city}. Our standard install radius covers ${county} and Central Oregon — Redmond, Sisters, Prineville, and La Pine, plus the communities in between.`}
      />

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Coverage map</div>
            <h2 className="display text-3xl md:text-5xl text-brand">Where we serve</h2>
            <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
              Based in {city}, installing Level 2 EV chargers across {county} and Central Oregon.
              Outside the area on the map? Call anyway — we&apos;ll tell you honestly whether the drive
              pencils out for your project.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl border border-neutral-200">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${city}, ${BUSINESS.location.stateFull}`)}&output=embed&z=9`}
              loading="lazy"
              width="100%"
              height="500"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={`${city}, ${BUSINESS.location.stateFull} service area`}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <div className="eyebrow mb-2">Primary base</div>
            <h2 className="display text-3xl md:text-4xl text-brand">
              {city}, {state} &mdash; where we operate from
            </h2>
          </div>
          <div className="space-y-4 text-neutral-700 leading-relaxed text-lg">
            <p>
              We are based in {city} itself, the {county} seat and the hub of Central Oregon. Most of
              our installs are within town — newer subdivision homes on modern 200-amp panels, older
              Craftsman houses near downtown that may need a panel check, and a growing number of ADUs
              and townhomes.
            </p>
            <p>
              Common {city} property types we work on: 1990s-to-recent single-family homes with room on
              the panel, older homes where the load calc decides whether the panel carries a Level 2
              circuit, and detached garages or carports where the run is the main cost driver. Each one
              changes the install — a hardwired unit or a NEMA 14-50 outlet, the right amperage, and
              sometimes a panel upgrade first. We run the load calc before we ever promise an amperage.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Towns we cover</div>
            <h2 className="display text-3xl md:text-5xl text-brand">Regular install routes</h2>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand text-white">
                  <tr>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-wider text-xs">Town</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-wider text-xs">Region</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-wider text-xs">Page</th>
                  </tr>
                </thead>
                <tbody>
                  {TOWNS.map((t, i) => {
                    const slug = t.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    return (
                      <tr key={t.name} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-5 py-4 font-bold">
                          <a href={`/locations/${slug}/`} className="text-brand hover:text-accent underline decoration-accent underline-offset-4">
                            {t.name}, {t.state}
                          </a>
                        </td>
                        <td className="px-5 py-4 text-neutral-700">Central Oregon</td>
                        <td className="px-5 py-4">
                          <a href={`/locations/${slug}/`} className="text-accent hover:text-accent-fg font-bold inline-flex items-center gap-1">
                            See page
                            <svg className="w-3 h-3" aria-hidden="true"><use href="#i-arrow-right" /></svg>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-4 text-center">
            Install scheduling depends on the size of the project and how far out the address is. We
            confirm the timeline on the phone after we talk through the panel.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Field notes</div>
            <h2 className="display text-3xl md:text-5xl text-brand">What each town teaches us</h2>
            <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
              Local context — the age of the housing stock, the panels, where people park — changes the
              install and the cost. Knowing yours is half the job.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {TOWNS.map((t) => {
              const slug = t.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              return (
                <a
                  key={`note-${t.name}`}
                  href={`/locations/${slug}/`}
                  className="bg-neutral-50 rounded-lg border border-neutral-200 p-7 lift block group hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="display text-xl text-brand font-extrabold group-hover:text-accent transition">
                      {t.name}, {t.state}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-4">{t.note}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:text-accent-fg">
                    See full {t.name} page
                    <svg className="w-3.5 h-3.5" aria-hidden="true"><use href="#i-arrow-right" /></svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8">
          <article className="bg-white p-8 rounded-lg border border-neutral-200">
            <div className="eyebrow mb-2">Outside the radius?</div>
            <h3 className="display text-2xl text-brand font-extrabold mb-3">Call anyway</h3>
            <p className="text-neutral-700 leading-relaxed">
              For homes farther out into the smaller Central Oregon communities, we still take some of
              those jobs. Whether the drive makes sense depends on the size of the project and whether
              we already have a crew working that direction. Call and describe the panel and where you
              park — we&apos;ll either come out or point you to a local electrician we trust. No
              commission either way.
            </p>
          </article>
          <article className="bg-white p-8 rounded-lg border border-neutral-200">
            <div className="eyebrow mb-2">Property managers &amp; landlords</div>
            <h3 className="display text-2xl text-brand font-extrabold mb-3">Multi-property coverage</h3>
            <p className="text-neutral-700 leading-relaxed">
              If you manage rentals or a portfolio across {city} or {county}, the cleanest setup is one
              spec we install to on every unit — same equipment class, same install standard,
              predictable load management, and the Central Electric Co-op rebate handled the same way
              each time. Mention it on the call and we&apos;ll put together a proposal.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow="Anywhere in this region"
        headline={`Ready to stop charging on a wall outlet in ${county}?`}
        subhead="Tell us the panel and where you park — the phone quote is free. We'll tell you what the install needs and whether your panel carries it before anyone drives out."
      />
    </>
  );
}
