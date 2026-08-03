/**
 * EV Charger Glossary — Bend EV Charger Pros.
 * Entity hub with DefinedTermSet schema for AEO/semantic coverage.
 */
import type { Metadata } from 'next';
import { PageHero, CtaBand, JsonLd } from '@ppl/shared/components';
import {
  webPageSchema, breadcrumbSchema, articleSchema, speakableSchema, professionalServiceSchema,
} from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';

interface GlossaryTerm {
  term: string;
  definition: string;
  sameAs?: string;
  related?: string[];
}

const TERMS: GlossaryTerm[] = [
  { term: 'EV charging station (EVSE)', definition: 'Electric vehicle supply equipment — the wall- or pedestal-mounted unit that delivers electricity from a building’s wiring to an electric vehicle’s onboard charger through a connector. Despite the name, the EVSE does not convert power itself; it safely supplies AC to the car, which converts it. A home Level 2 unit runs on a dedicated 240V circuit.', sameAs: 'https://en.wikipedia.org/wiki/Charging_station', related: ['Level 2 charging', 'SAE J1772', 'Onboard charger'] },
  { term: 'Level 1 charging', definition: 'Charging from a standard 120V household outlet using the cordset that comes with the car. Level 1 adds only a few miles of range per hour, which can suit a plug-in hybrid or a low-mileage driver but is slow for most full electric vehicles.', related: ['Level 2 charging', 'Onboard charger'] },
  { term: 'Level 2 charging', definition: 'Charging from a dedicated 240V circuit and a Level 2 EVSE, the standard for home charging. Level 2 charges several times faster than Level 1, with speed set by the circuit amperage, and is the level most full-EV owners install at home.', sameAs: 'https://en.wikipedia.org/wiki/Charging_station', related: ['EV charging station (EVSE)', 'Dedicated circuit', 'Continuous load'] },
  { term: 'Level 3 / DC fast charging', definition: 'High-power direct-current charging that bypasses the car’s onboard charger to deliver DC straight to the battery, charging far faster than Level 2. It requires commercial-grade equipment and service and is found at public charging stations, not in homes.', related: ['Level 2 charging', 'Onboard charger'] },
  { term: 'SAE J1772', definition: 'The standard connector — the "J-plug" — used for Level 1 and Level 2 AC charging on most non-Tesla electric vehicles in North America. A home EVSE typically uses a J1772 connector, and adapters bridge J1772 and the NACS connector.', sameAs: 'https://en.wikipedia.org/wiki/SAE_J1772', related: ['North American Charging Standard (NACS)', 'EV charging station (EVSE)'] },
  { term: 'North American Charging Standard (NACS)', definition: 'The connector standard developed by Tesla and now being adopted by many automakers across North America. NACS handles both AC and DC charging on one connector. Adapters allow J1772 and NACS equipment and vehicles to work together during the transition.', sameAs: 'https://en.wikipedia.org/wiki/North_American_Charging_Standard', related: ['SAE J1772', 'EV charging station (EVSE)'] },
  { term: 'NEMA 14-50 outlet', definition: 'A 240V receptacle — the same one used for electric ranges and RVs — installed on a dedicated 50-amp circuit, commonly used for plug-in Level 2 chargers. Because EV charging is a continuous load, a 14-50 typically supports up to a 40-amp charging draw. It lets a portable EVSE be unplugged and moved.', sameAs: 'https://en.wikipedia.org/wiki/NEMA_connector', related: ['Hardwired install', 'Continuous load', 'Dedicated circuit'] },
  { term: 'Hardwired install', definition: 'An EVSE wired directly to the branch circuit rather than plugged into an outlet. Hardwiring can run a higher continuous amperage than a NEMA 14-50 outlet allows and is favored for the fastest home charging, a long run, or a clean permanent install.', related: ['NEMA 14-50 outlet', 'Dedicated circuit', 'Continuous load'] },
  { term: 'Dedicated circuit', definition: 'A branch circuit that serves only the EV charger, with its own breaker and conductors sized for the load. A Level 2 charger requires a dedicated 240V circuit; sharing it with other loads is not permitted and would trip or overheat.', related: ['Level 2 charging', 'Double-pole breaker', 'Continuous load'] },
  { term: 'Continuous load', definition: 'An electrical load expected to draw at its maximum for three hours or more, which an EV charger does. The National Electrical Code requires circuits for continuous loads to be sized to 125 percent of the load, which is why a 48-amp charger needs a 60-amp circuit.', related: ['125 percent rule', 'Ampacity', 'Dedicated circuit'] },
  { term: '125 percent rule', definition: 'The code requirement that a circuit serving a continuous load be sized to 125 percent of that load. For EV chargers this sets the breaker and wire: a 40-amp charger needs a 50-amp circuit, a 48-amp charger needs a 60-amp circuit. It keeps conductors from overheating under a long continuous draw.', related: ['Continuous load', 'Ampacity', 'Double-pole breaker'] },
  { term: 'Ampacity', definition: 'The maximum current, in amperes, that a conductor can carry continuously without exceeding its temperature rating. Wire gauge is chosen so its ampacity meets or exceeds the circuit’s sized load. Undersized wire on a continuous EV load runs hot — a real safety issue, not a detail to economize on.', sameAs: 'https://en.wikipedia.org/wiki/Ampacity', related: ['Wire gauge (AWG)', '125 percent rule', 'Continuous load'] },
  { term: 'Wire gauge (AWG)', definition: 'The American Wire Gauge system that sizes conductors; a smaller AWG number means thicker wire and higher ampacity. The gauge for an EV circuit is chosen for the sized amperage and the run length — a longer run at higher amperage may need a heavier gauge to limit voltage drop.', sameAs: 'https://en.wikipedia.org/wiki/American_wire_gauge', related: ['Ampacity', 'Voltage drop', 'Dedicated circuit'] },
  { term: 'Voltage drop', definition: 'The loss of voltage along a conductor over distance, which grows with length and current. On a long EV-circuit run, conductors may be upsized beyond the minimum ampacity to keep voltage drop within acceptable limits so the charger gets the voltage it needs.', sameAs: 'https://en.wikipedia.org/wiki/Voltage_drop', related: ['Wire gauge (AWG)', 'Ampacity'] },
  { term: 'Double-pole breaker', definition: 'A circuit breaker that occupies two panel spaces and connects to both legs of a split-phase service to provide 240V. A Level 2 EV circuit lands on a double-pole breaker sized to the circuit (for example a 50-amp breaker for a 40-amp charger).', related: ['Dedicated circuit', 'Electrical panel', '125 percent rule'] },
  { term: 'Electrical panel (load center)', definition: 'The distribution board where the utility service feeds the home’s branch circuits through breakers. Its rating — commonly 100A or 200A — and its available capacity and open spaces determine whether it can take an EV circuit as-is.', sameAs: 'https://en.wikipedia.org/wiki/Distribution_board', related: ['Service rating', 'Load calculation', 'Subpanel'] },
  { term: 'Service rating', definition: 'The maximum current the electrical service and main panel are rated to carry, typically 100A or 200A for a home. The rating is a ceiling, not a measure of free capacity — a 200-amp panel can still be effectively full depending on its existing loads.', related: ['Electrical panel (load center)', 'Load calculation', 'Service upgrade'] },
  { term: 'Load calculation', definition: 'The process of totaling a home’s connected electrical load and comparing it to the service rating to determine available capacity. It is what decides whether a panel can add an EV circuit, at what amperage, or whether an upgrade is needed first. The deciding number, not the panel rating on the door.', related: ['Service rating', 'Service upgrade', 'Continuous load'] },
  { term: 'Service upgrade', definition: 'Increasing a home’s electrical service capacity — for example from 100A to 200A — when a load calculation shows the existing service cannot carry a new load such as an EV circuit. It is utility-coordinated, permitted, and inspected, and is licensed electrical work.', related: ['Load calculation', 'Subpanel', 'Electrical permit'] },
  { term: 'Subpanel', definition: 'A secondary panel fed from the main service that adds breaker spaces. When a service has capacity but no open slots, or when multiple circuits are being added, a subpanel can be a simpler, cheaper solution than a full service upgrade.', related: ['Electrical panel (load center)', 'Service upgrade', 'Load management'] },
  { term: 'Load management (load sharing)', definition: 'Equipment that limits or shares circuit capacity dynamically, so an EV charger backs off when the rest of the home is drawing heavily, or two chargers split a circuit. It can fit charging onto a panel that could not otherwise carry a full-amperage circuit, and is common for multiple EVs.', related: ['Subpanel', 'Service upgrade', 'Multi-unit charging'] },
  { term: 'Onboard charger', definition: 'The component inside the electric vehicle that converts the AC supplied by a Level 1 or Level 2 EVSE into DC to charge the battery. Its rating caps how many amps the car can accept on AC charging, so a circuit sized above that ceiling does not charge faster.', related: ['Level 2 charging', 'EV charging station (EVSE)', 'Battery electric vehicle (BEV)'] },
  { term: 'Battery electric vehicle (BEV)', definition: 'A vehicle powered solely by a battery and electric motor, with no internal combustion engine, which relies entirely on charging. BEVs typically benefit most from Level 2 home charging because their daily range demand outpaces what Level 1 can replace overnight.', sameAs: 'https://en.wikipedia.org/wiki/Electric_vehicle', related: ['Plug-in hybrid (PHEV)', 'Level 2 charging'] },
  { term: 'Plug-in hybrid (PHEV)', definition: 'A vehicle with both a battery that can be charged from the grid and a gasoline engine. Because PHEV batteries are smaller, Level 1 charging is often enough, though some owners still add Level 2 for convenience.', sameAs: 'https://en.wikipedia.org/wiki/Plug-in_hybrid', related: ['Battery electric vehicle (BEV)', 'Level 1 charging'] },
  { term: 'kW (kilowatt)', definition: 'A unit of power equal to 1,000 watts, used to describe charging rate. Level 2 charging power is roughly the circuit voltage times the amperage, so higher amperage means more kW and faster charging — up to the limit of the car’s onboard charger.', sameAs: 'https://en.wikipedia.org/wiki/Watt', related: ['Level 2 charging', 'Onboard charger', 'Ampacity'] },
  { term: 'Grounding and bonding', definition: 'The safety practice of connecting non-current-carrying metal parts to ground and bonding the system so a fault has a safe path and breakers trip. Every EV circuit must be properly grounded and bonded — part of a code-compliant, inspected install.', sameAs: 'https://en.wikipedia.org/wiki/Ground_(electricity)', related: ['Dedicated circuit', 'Electrical permit', 'GFCI protection'] },
  { term: 'GFCI protection', definition: 'Ground-fault circuit-interrupter protection that opens a circuit when it detects current leaking to ground, guarding against shock. EV-circuit GFCI requirements depend on the install type and code edition; hardwired and outlet installs handle it differently, which a licensed electrician sorts.', sameAs: 'https://en.wikipedia.org/wiki/Residual-current_device', related: ['Grounding and bonding', 'Dedicated circuit'] },
  { term: 'Electrical permit', definition: 'The authorization from the local building department to perform electrical work, followed by an inspection. An EV charger install in Oregon requires an electrical permit and inspection, which protect the homeowner and are often expected for rebate eligibility.', related: ['Oregon CCB', 'BCD electrical license', 'Service upgrade'] },
  { term: 'Oregon CCB', definition: 'The Oregon Construction Contractors Board, with which contractors must register to perform construction work in the state. An EV charger installer should hold valid CCB registration in addition to the electrical-specific license.', related: ['BCD electrical license', 'Electrical permit'] },
  { term: 'BCD electrical license', definition: 'The electrical contractor license issued under Oregon’s Building Codes Division, required to perform electrical work such as an EV charger circuit. Together with CCB registration, it is the licensing baseline for a Level 2 install in Oregon.', related: ['Oregon CCB', 'Electrical permit'] },
  { term: 'Central Electric Cooperative (CEC)', definition: 'A member-owned electric utility serving much of Deschutes County and Central Oregon. CEC offers up to a $450 residential Level 2 charger rebate for qualifying members; not every address in the area is in CEC territory, so eligibility should be confirmed.', related: ['Electrical permit', 'Level 2 charging'] },
  { term: 'Multi-unit charging', definition: 'EV charging wiring for more than one vehicle or unit — a second car, an ADU, a duplex, or a small multi-family property — planned as one job with subpanels and load management so the service is not overrun.', related: ['Load management (load sharing)', 'Subpanel', 'Service upgrade'] },
];

const META = buildPageMeta({
  pageType: 'blog',
  ctx: { business: BUSINESS },
  pathname: '/glossary/',
  customTitle: `EV Charger Glossary — Level 2 Charging & Electrical Terms Explained`,
  customDescription: `${TERMS.length}-entry Level 2 EV charger terminology reference. EVSE, J1772/NACS, NEMA 14-50, ampacity, continuous load, the 125 percent rule, panel and service upgrades, and the Central Electric Co-op rebate. From local licensed electricians in ${BUSINESS.location.city}, ${BUSINESS.location.state}.`,
});
const { datePublished, dateModified } = getPageDates('/glossary/', DATES);

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'article' },
};

function slugifyAnchor(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const ALPHABET_BUCKETS: Record<string, GlossaryTerm[]> = TERMS.reduce<Record<string, GlossaryTerm[]>>((acc, t) => {
  const firstChar = (t.term[0] ?? '#').toUpperCase();
  const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';
  (acc[letter] ||= []).push(t);
  return acc;
}, {});
const LETTERS_PRESENT = Object.keys(ALPHABET_BUCKETS).sort();

export default function GlossaryPage() {
  const crumbsForSchema = [
    { name: 'Home', url: `${BUSINESS.siteUrl}/` },
    { name: 'Glossary', url: `${BUSINESS.siteUrl}/glossary/` },
  ];

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BUSINESS.siteUrl}/glossary/#termset`,
    name: 'EV Charger Glossary',
    description: 'Terms, ratings, connector standards, and regulatory references for Level 2 EV charger installation.',
    hasDefinedTerm: TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${BUSINESS.siteUrl}/glossary/#${slugifyAnchor(t.term)}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${BUSINESS.siteUrl}/glossary/#termset`,
      ...(t.sameAs ? { sameAs: t.sameAs } : {}),
    })),
  };

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: `${BUSINESS.siteUrl}/images/hero-ev-charger-bend.jpg`, publishedAt: datePublished, modifiedAt: dateModified, wordCount: 2800, articleSection: 'EV Charger Reference' })} />
      <JsonLd schema={professionalServiceSchema(BUSINESS)} />
      <JsonLd schema={definedTermSet} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', 'dt', 'dd'])} />

      <PageHero
        size="standard"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]}
        eyebrow="Reference"
        h1="EV charger glossary"
        subhead="Plain-English definitions for the terms that show up in EV charger quotes, spec sheets, and electrical scopes."
      />

      <section className="bg-white pt-12 pb-6">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-neutral-600 italic">
            {TERMS.length} entries with cross-references and entity links.
          </p>
          <p className="tldr text-lg text-neutral-800 leading-relaxed font-medium border-l-4 border-accent pl-5 my-6 italic max-w-3xl">
            Reference glossary for Level 2 EV charger and home-charging terminology &mdash; charging
            levels, connector standards like J1772 and NACS, the NEMA 14-50 outlet, electrical terms
            like ampacity, continuous load, and the 125 percent rule, panel and service upgrades, plus
            Oregon licensing and the Central Electric Co-op rebate, with links to authoritative sources
            where applicable. Useful when comparing EV charger quotes that use unfamiliar technical
            language, or when reading a spec sheet before you sign.
          </p>

          <nav aria-label="Alphabet index" className="flex flex-wrap gap-1.5 mt-6">
            {LETTERS_PRESENT.map((l) => (
              <a key={l} href={`#letter-${l}`} className="inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-md border border-neutral-300 bg-white text-brand font-bold text-sm hover:bg-brand hover:text-white hover:border-brand transition">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4">
          {LETTERS_PRESENT.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-24 mt-10 first:mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 grid place-items-center rounded-md bg-brand text-white font-extrabold text-lg">
                  {letter}
                </div>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {(ALPHABET_BUCKETS[letter] ?? []).map((t) => (
                  <div key={t.term} id={slugifyAnchor(t.term)} className="border-b border-neutral-200 pb-5 scroll-mt-24">
                    <dt className="font-bold text-base text-brand">{t.term}</dt>
                    <dd className="mt-2 text-sm text-neutral-700 leading-relaxed">{t.definition}</dd>
                    {t.sameAs && (
                      <p className="mt-2 text-xs">
                        <em className="text-neutral-500">Reference: </em>
                        <a href={t.sameAs} rel="noopener external" target="_blank" className="text-brand underline underline-offset-2 hover:text-accent">
                          {t.sameAs.replace(/^https?:\/\//, '').split('/')[0]}
                        </a>
                      </p>
                    )}
                    {t.related && t.related.length > 0 && (
                      <p className="mt-2 text-xs text-neutral-600">
                        <em>See also: </em>
                        {t.related.map((r, i) => (
                          <span key={r}>
                            <a href={`#${slugifyAnchor(r)}`} className="text-brand hover:underline">{r}</a>
                            {i < t.related!.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow="Missing a term?"
        headline="Need a term explained that isn&rsquo;t here?"
        subhead="Ask on the free phone quote. We&rsquo;ll add it to the glossary in the next update."
      />
    </>
  );
}
