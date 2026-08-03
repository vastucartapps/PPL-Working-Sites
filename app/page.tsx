/**
 * Hub — Bend EV Charger Pros (Level 2 EV charger install × Bend OR).
 * Considered-purchase funnel: value-led (panel capacity + rebate math) capture +
 * service-led conversion. Quick-path rail routes to the matching service.
 * Per SOP §37 (GEO) + §41 (Local Answer-Layer Stack) + §40A (palette tokens).
 */
import type { Metadata } from 'next';
import {
  Hero, TrustStrip, CategoryIcons, AboutSplit, ServiceCardGrid, WhyUsGrid,
  ProcessSteps, StatsBand, FAQAccordion, CtaBand, BlogLatest, JsonLd,
  KeyTakeaways, WhatIsBlock, PeopleAlsoSearch,
} from '@ppl/shared/components';
import { webPageSchema, articleSchema, faqSchema, speakableSchema, imageObjectSchema, definedTermSchema, itemListSchema } from '@ppl/shared/lib/schema-gen';
import { IMAGE_CREDITS } from '@content/_image-credits';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { BUSINESS } from '@content/business';
import { SERVICES } from '@content/services';
import { SITE_COPY } from '@content/site-copy';

const META = buildPageMeta({ pageType: 'home', ctx: { business: BUSINESS }, pathname: '/' });

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'website' },
};

const city = BUSINESS.location.city;
const state = BUSINESS.location.state;
const stateFull = BUSINESS.location.stateFull;
const county = BUSINESS.location.county;

const PUBLISHED_AT = '2026-05-29';
const MODIFIED_AT = '2026-05-29';
const WORD_COUNT = 1000;

const HOMEPAGE_FAQS = [
  {
    question: `What does it cost to install a Level 2 EV charger in ${city}?`,
    answer: `Cost is driven by the panel capacity, the run distance from the panel to where you park, the target amperage, and whether a panel upgrade is needed — not one flat number. The charger box is often a smaller line than the wiring and labor. We quote on the phone after the panel and parking details, and the Central Electric Co-op rebate can lower the net.`,
  },
  {
    question: `Will my electrical panel in ${city} handle an EV charger?`,
    answer: `It depends on a load calculation — what your panel already carries against its rating, commonly 100A or 200A. A modern 200-amp service with headroom usually takes a 40- or 48-amp circuit; a full or older panel may only support a smaller circuit or need an upgrade first. We open the panel and run the calc before promising any amperage.`,
  },
  {
    question: `How fast will a Level 2 charger charge my car?`,
    answer: `Charge speed scales with the circuit amperage, not the brand of charger. A 40-amp circuit delivers more than a 20-amp one, and the EVSE can only pull what the circuit and panel allow. Buying a 48-amp charger for a panel that can spare 24 amps just leaves capacity unused — the load calc tells us the honest number first.`,
  },
  {
    question: `Is there an EV charger rebate in ${county}?`,
    answer: `Yes. Central Electric Cooperative offers up to a $450 residential Level 2 charger rebate for qualifying members in its ${county} service territory. The exact amount depends on your membership, the equipment, and the program terms, so we tell you whether your address and charger likely qualify rather than promising the full amount to everyone.`,
  },
  {
    question: `Do I need a permit to install an EV charger in ${stateFull}?`,
    answer: `Yes. A Level 2 install in ${stateFull} requires an electrical permit, an inspection, and a licensed electrical contractor — CCB registration plus a BCD electrical license. We pull the permit and route the work to a properly licensed local electrician. An uninspected 240V circuit is a liability and an insurance problem.`,
  },
  {
    question: `Should I hardwire the charger or use a NEMA 14-50 outlet?`,
    answer: `Both are real options. A hardwired unit can run a higher continuous amperage and suits a long run or the fastest charging. A NEMA 14-50 outlet is flexible — you can unplug a portable EVSE and move it, typically up to a 40-amp draw. The run length and your target amperage decide; we walk through it on the call.`,
  },
];

// ─── 2026 ANSWER-LAYER CONSTANTS (visible block + schema share one source) ───
const COST_ANSWER = `The cost to install a Level 2 EV charger in ${city} is driven by panel capacity, the circuit run distance from the panel to where you park, and whether a panel upgrade is needed first. The charger box is often a smaller line than the wiring and labor, and the Central Electric Co-op rebate of up to $450 helps lower the net.`;

const EVSE_DEFINITION = `An EV charging station, or EVSE (electric vehicle supply equipment), is the wall- or pedestal-mounted unit that delivers electricity from a building's wiring to an electric vehicle's onboard charger through a connector such as SAE J1772 or NACS. A Level 2 home unit runs on a dedicated 240V circuit and charges several times faster than a standard 120V outlet.`;

const PAS_ITEMS = [
  { label: 'EV charger install cost in Bend', href: '/blog/ev-charger-install-cost-bend/' },
  { label: 'do I need a panel upgrade', href: '/blog/do-i-need-a-panel-upgrade-for-ev-charger/' },
  { label: 'hardwired vs NEMA 14-50', href: '/blog/hardwired-vs-nema-14-50-ev-charger/' },
  { label: 'Level 1 vs Level 2 charging', href: '/blog/level-1-vs-level-2-ev-charging/' },
  { label: 'Oregon EV charger rebates', href: '/blog/oregon-ev-charger-rebates-guide/' },
  { label: 'what amperage charger do I need', href: '/blog/what-amperage-ev-charger-do-i-need/' },
] as const;

export default function HomePage() {
  const heroImageUrl = `${BUSINESS.siteUrl}/images/hero-ev-charger-bend.jpg`;

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, primaryImageUrl: heroImageUrl, breadcrumbs: [{ name: 'Home', url: `${BUSINESS.siteUrl}/` }], mentionsEntities: ['Charging station', 'Electric vehicle', 'SAE J1772', 'North American Charging Standard', 'Electrical wiring'] })} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: `Level 2 EV Charger Installation in ${city}, ${state}`, description: META.description, url: META.canonical, imageUrl: heroImageUrl, publishedAt: PUBLISHED_AT, modifiedAt: MODIFIED_AT, wordCount: WORD_COUNT, articleSection: 'EV Charger' })} />
      <JsonLd schema={faqSchema(HOMEPAGE_FAQS)} />
      <JsonLd schema={speakableSchema(META.canonical, ['h1', '.tldr', '.geo-answer', '.faq-answer'])} />
      <JsonLd schema={imageObjectSchema({ url: heroImageUrl, caption: `Level 2 EV charger installed in a ${city}, ${stateFull} garage`, width: 1920, height: 1080, locationName: `${city}, ${stateFull}`, geoLat: BUSINESS.location.lat, geoLng: BUSINESS.location.lng, authorName: BUSINESS.author.name, credits: IMAGE_CREDITS })} />
      <JsonLd schema={definedTermSchema({ term: 'EV charging station', definition: EVSE_DEFINITION, url: META.canonical, sameAs: ['https://en.wikipedia.org/wiki/Charging_station', 'https://en.wikipedia.org/wiki/SAE_J1772'] })} />
      <JsonLd schema={itemListSchema('People also search for', PAS_ITEMS.map((it) => ({ name: it.label, url: `${BUSINESS.siteUrl}${it.href}` })))} />

      {/* ─── 1. HERO ────────────────────────────────────────────────────────── */}
      <Hero
        eyebrow={`Local Level 2 EV charger help · ${county}`}
        h1={
          <>
            Level 2 EV charging<br />
            <span className="text-accent">done to code</span><br />
            in {city}.
          </>
        }
        subhead={`Hardwired chargers, NEMA 14-50 outlets, panel upgrades, and multi-car wiring across ${city}, Redmond, Sisters, and Central Oregon. A real panel load check, the right circuit for your house, Central Electric Co-op rebate guidance, and an honest quote on the phone.`}
        image={{
          defaultSrc: '/images/hero-ev-charger-bend.jpg',
          webpSrcSet: '/images/hero-ev-charger-bend-640.webp 640w, /images/hero-ev-charger-bend-1280.webp 1280w, /images/hero-ev-charger-bend-1920.webp 1920w',
          avifSrcSet: '/images/hero-ev-charger-bend-640.avif 640w, /images/hero-ev-charger-bend-1280.avif 1280w, /images/hero-ev-charger-bend-1920.avif 1920w',
          alt: `Level 2 EV charger mounted in a ${city}, ${stateFull} garage`,
          width: 1920,
          height: 1080,
        }}
        ctas={[
          { label: 'Get a Free Quote', href: '#lead-form', variant: 'primary' },
          { label: BUSINESS.phone.display, href: `tel:${BUSINESS.phone.tel}`, variant: 'secondary', icon: 'i-phone' },
        ]}
        trustChips={SITE_COPY.trustChips}
        sideCard={
          <div className="bg-white text-neutral-900 rounded-xl shadow-2xl border-t-4 border-accent overflow-hidden">
            <div className="px-6 py-4 bg-brand text-white">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-accent">
                <span className="w-2 h-2 bg-accent rounded-full" />
                What a real quote needs
              </div>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">1</div>
                <div className="font-bold text-brand">Your panel</div>
                <div className="text-sm text-neutral-600">Service size (100A or 200A) and roughly what is already on it — range, dryer, AC.</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">2</div>
                <div className="font-bold text-brand">Where you park</div>
                <div className="text-sm text-neutral-600">Garage, driveway, or carport — and how far that is from the panel.</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">3</div>
                <div className="font-bold text-brand">The car</div>
                <div className="text-sm text-neutral-600">Which EV you are charging tells us the amperage worth running for it.</div>
              </div>
              <a
                href={`tel:${BUSINESS.phone.tel}`}
                className="mt-3 w-full bg-accent text-accent-fg font-bold uppercase tracking-wider text-sm rounded px-4 py-3 flex items-center justify-center gap-2 hover:bg-accent-dark transition"
              >
                <svg className="w-4 h-4"><use href="#i-phone" /></svg>
                Call {BUSINESS.phone.display}
              </a>
              <div className="text-xs text-neutral-500 text-center">Free quote on the phone · 5 minutes</div>
            </div>
          </div>
        }
      />

      {/* ─── 2. QUICK-PATH RAIL ──────────────────────────────────────────────── */}
      <section aria-label="What does your install need?" className="bg-brand text-white border-t-4 border-accent">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-7">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center sm:justify-start">
            <div className="text-sm font-bold uppercase tracking-wider text-accent">What does your install need?</div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {SITE_COPY.causeChips.map((chip) => (
                <a key={chip.href} href={chip.href} className="inline-flex items-center gap-2 bg-white/10 hover:bg-accent hover:text-accent-fg transition px-4 py-2 rounded-full text-sm font-bold border border-white/20">
                  <svg className="w-4 h-4" aria-hidden="true"><use href={`#${chip.icon}`} /></svg>
                  {chip.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip
        business={BUSINESS}
        overlap={false}
        chips={[
          { value: 'Free', label: 'Quote on the phone' },
          { value: 'Load calc', label: 'Real panel check' },
          { value: 'Local', label: county },
          { value: 'Licensed', label: 'Oregon CCB + BCD electrical' },
        ]}
      />

      {/* ─── 3. CATEGORY ICONS ──────────────────────────────────────────────── */}
      <CategoryIcons
        eyebrow="What we install"
        title="Four EV jobs · one licensed crew"
        items={[
          { icon: 'i-zap', label: 'Level 2 Install', href: '/services/level-2-charger-install/' },
          { icon: 'i-building', label: 'Panel Upgrade', href: '/services/ev-panel-upgrade/' },
          { icon: 'i-property', label: 'NEMA 14-50', href: '/services/nema-14-50-outlet/' },
          { icon: 'i-users', label: 'Multi-Unit', href: '/services/multi-unit-ev-charging/' },
        ]}
      />

      {/* ─── 4. DEFINITIONAL GEO BLOCK ──────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <KeyTakeaways
            answer={COST_ANSWER}
            points={[
              'Charge speed is amperage, not the charger brand — a 40-amp circuit beats a 20-amp one, and the panel decides what it can carry.',
              'A real load calc decides the right circuit; a full or older panel may need an upgrade before the EV circuit.',
              'Central Electric Cooperative offers up to a $450 residential Level 2 rebate for qualifying Deschutes County members.',
            ]}
          />
          <div className="eyebrow mb-3">The honest answer</div>
          <h2 className="display text-3xl md:text-5xl text-brand mb-6">
            What does a Level 2 charger cost in {city}, {state}?
          </h2>
          <p className="geo-answer">
            The cost to install a Level 2 EV charger in {city} is driven by your panel capacity, the
            circuit run distance from the panel to where you park, the target amperage, and whether a
            panel upgrade is needed first. The charger box itself is often a smaller line than the
            wire, conduit, and labor. A short run off a modern 200-amp panel is the simple end; a long
            run to a detached carport, or a full panel that needs an upgrade, moves the number. The{' '}
            Central Electric Co-op rebate of up to $450 helps lower the net for qualifying members.
          </p>
          <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
            We are a local service-connection platform routing {county} EV charger jobs to vetted,
            licensed Oregon electricians (CCB plus BCD electrical license). Phone-first quoting, a real
            panel load check before we promise a 240V circuit, and the right install — hardwired Level
            2, a NEMA 14-50 outlet, a panel upgrade first, or multi-car wiring — for your house. We
            will also tell you honestly when the panel needs an upgrade before the charger, or when a{' '}
            NEMA 14-50 outlet beats a hardwired unit. See the{' '}
            <a href="/about/" className="text-accent font-semibold underline decoration-accent">
              &quot;check the panel first&quot;
            </a>{' '}note on our about page.
          </p>
          <WhatIsBlock
            term="EV charging station"
            answer={EVSE_DEFINITION}
            sourceLabel="Wikipedia"
            sourceHref="https://en.wikipedia.org/wiki/Charging_station"
          />
        </div>
      </section>

      <AboutSplit
        business={BUSINESS}
        imageSrc="/images/about-ev-crew.jpg"
        imageAlt={`Local licensed EV charger electrician in ${city}, ${state}`}
        eyebrow="About the crew"
        title={`Local Level 2 EV charger help across ${county}.`}
        paragraphs={[
          `${BUSINESS.name} routes ${county}-area EV charger jobs to vetted, licensed Oregon electricians. We answer the phone, ask about your panel and where you park, and quote off those details and a real load check — not a guess at an amperage before anyone opens the panel.`,
          `The quote is free. If a Level 2 install is straightforward for your house, you get a verbal range on the call and a written quote after an on-site look. No promised amperage we cannot feed, no charger sold for a panel that is already full.`,
        ]}
        badges={[
          { title: 'Local routing', subtitle: 'Bend-area electricians' },
          { title: 'Service-area business', subtitle: county },
          { title: 'Load-calc first', subtitle: 'Open the panel before promising amps' },
          { title: 'Honest quoting', subtitle: 'We say when the panel needs an upgrade' },
        ]}
        ctaHref={`tel:${BUSINESS.phone.tel}`}
        ctaLabel={`Call ${BUSINESS.phone.display}`}
      />

      {/* ─── 5. SERVICE CARDS ────────────────────────────────────────────────── */}
      <ServiceCardGrid
        eyebrow="Our services"
        title="Four EV services · one licensed crew"
        items={SERVICES.map((s, i) => ({
          imageSrc: ['/images/service-level-2.jpg', '/images/service-panel-upgrade.jpg', '/images/service-nema-outlet.jpg', '/images/service-multi-unit.jpg'][i] ?? '/images/hero-ev-charger-bend.jpg',
          imageAlt: s.name,
          badge: ['Most common', 'When the panel is full', 'Flexible / unpluggable', 'Two cars / ADU'][i] ?? '',
          title: s.name,
          description: s.description,
          ctaHref: s.url.replace(BUSINESS.siteUrl, ''),
          ctaLabel: 'Read more',
        }))}
      />

      {/* ─── 6. WHY US ──────────────────────────────────────────────────────── */}
      <WhyUsGrid
        eyebrow={`Why ${city} picks us`}
        title="Four reasons the load calc outlasts the lowest bid."
        items={[
          { icon: 'i-ruler', title: 'The load calc is the job', description: 'We open the panel and run a real load calculation before promising any amperage. The charge speed your house can actually support comes from the calc, not the box on the shelf.' },
          { icon: 'i-zap', title: 'Sized for a continuous load', description: 'A Level 2 charger is a continuous load, so wire and breaker are sized to 125 percent of the draw. Undersized wire on an EV circuit is a heat problem you live with, not a corner we cut.' },
          { icon: 'i-shield-check', title: 'Permitted and inspected', description: 'Every install is pulled on an electrical permit and inspected, done by a licensed Oregon electrician (CCB plus BCD). An uninspected 240V circuit is a liability, not a saving.' },
          { icon: 'i-users', title: 'Vetted local electricians', description: 'Your job goes to a licensed electrician who works Deschutes County and Central Oregon — not an out-of-region crew driving in.' },
        ]}
      />

      {/* ─── 7. PROCESS ─────────────────────────────────────────────────────── */}
      <ProcessSteps
        eyebrow="How it goes"
        title="From new EV to a full battery by morning."
        steps={[
          { title: 'Panel + parking details', description: 'Tell us your service size, what is already on the panel, where you park, and which car you charge. A 5-minute call tells you whether your panel carries a Level 2 circuit as-is.' },
          { title: 'Load calc + site look', description: 'We run a load calculation and confirm on-site: available capacity, the circuit run, wire gauge and breaker, and the right amperage. A written quote with the spec, not a vague number.' },
          { title: 'Install + permit', description: 'Run the dedicated 240V circuit, land the breaker, mount and connect the hardwired unit or NEMA 14-50 outlet, ground and bond it — all on an electrical permit.' },
          { title: 'Inspection + rebate', description: 'We pass the inspection, show you how it runs, and hand over the paperwork — including what you need for the Central Electric Co-op rebate.' },
        ]}
      />

      <StatsBand
        items={[
          { value: '240V', label: 'Level 2 dedicated circuit' },
          { value: 'Load calc', label: 'Right-size the panel' },
          { value: 'CCB + BCD', label: 'Licensed Oregon electrician' },
          { value: 'Local', label: county },
        ]}
      />

      {/* ─── 8. FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Frequently asked</div>
            <h2 className="display text-3xl md:text-4xl text-brand">The questions we hear most.</h2>
          </div>
          <FAQAccordion items={HOMEPAGE_FAQS} />
          <PeopleAlsoSearch items={PAS_ITEMS.map((it) => ({ label: it.label, href: it.href }))} />
        </div>
      </section>

      <CtaBand
        business={BUSINESS}
        eyebrow="Start with the panel"
        headline={<>Free quote for {city} & Central Oregon.</>}
        subhead="Tell us your panel, where you park, and the car you charge. Five minutes on the phone tells you whether your panel carries a Level 2 circuit as-is — and what the Central Electric Co-op rebate likely covers."
      />

      <BlogLatest
        eyebrow="From the crew"
        title={`${city} EV charging intel`}
        viewAllHref="/blog/"
        items={[
          {
            href: '/blog/ev-charger-install-cost-bend/',
            imageSrc: '/images/blog/ev-cost.jpg',
            imageAlt: `What drives Level 2 EV charger install cost in a ${city} home`,
            badge: 'Cost',
            readTime: '8 min read',
            title: `What Actually Drives EV Charger Install Cost`,
            excerpt: `Circuit run, amperage, panel work, and permits — and where the Central Electric Co-op rebate fits in.`,
          },
          {
            href: '/blog/do-i-need-a-panel-upgrade-for-ev-charger/',
            imageSrc: '/images/blog/panel-upgrade.jpg',
            imageAlt: 'An electrical panel being checked for EV charger capacity',
            badge: 'Panel',
            readTime: '8 min read',
            title: `Do I Need a Panel Upgrade for an EV Charger?`,
            excerpt: `The load calc decides — when a full or older panel needs an upgrade before the EV circuit.`,
          },
          {
            href: '/blog/what-amperage-ev-charger-do-i-need/',
            imageSrc: '/images/blog/amperage.jpg',
            imageAlt: 'Wire gauge and breaker sizing for an EV charger circuit',
            badge: 'Sizing',
            readTime: '8 min read',
            title: `What Amperage EV Charger Do I Need?`,
            excerpt: `Charge speed is amperage. How the car, the panel, and the 125% rule set the circuit.`,
          },
        ]}
      />

      <section id="lead-form" className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="eyebrow mb-2">Get your quote</div>
          <h2 className="display text-3xl md:text-4xl text-brand mb-3">Tell us about the panel.</h2>
          <p className="text-neutral-700 mb-6">
            Phone is fastest — call now and a local electrician can talk you through it. Prefer to type? Send a message and we&apos;ll be in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${BUSINESS.phone.tel}`} className="btn-primary"><svg className="w-4 h-4"><use href="#i-phone" /></svg>{BUSINESS.phone.display}</a>
            <a href="/contact/" className="btn-navy"><svg className="w-4 h-4"><use href="#i-message" /></svg>Send a message</a>
          </div>
        </div>
      </section>
    </>
  );
}
