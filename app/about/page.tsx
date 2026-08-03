/**
 * About — Bend EV Charger Pros (Level 2 EV charger install × Bend OR).
 */
import type { Metadata } from 'next';
import { PageHero, AboutSplit, ProcessSteps, CtaBand, JsonLd } from '@ppl/shared/components';
import { webPageSchema, breadcrumbSchema, personSchema, articleSchema, professionalServiceSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';

const META = buildPageMeta({ pageType: 'about', ctx: { business: BUSINESS }, pathname: '/about/' });
const { datePublished: PUBLISHED_AT, dateModified: MODIFIED_AT } = getPageDates('/about/', DATES);
const WORD_COUNT = 540;

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
  openGraph: { title: META.ogTitle, description: META.ogDescription, url: META.canonical, type: 'profile' },
};

export default function AboutPage() {
  const city = BUSINESS.location.city;
  const county = BUSINESS.location.county;
  const stateFull = BUSINESS.location.stateFull;
  const crumbsForSchema = [
    { name: 'Home', url: `${BUSINESS.siteUrl}/` },
    { name: 'About', url: `${BUSINESS.siteUrl}/about/` },
  ];

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'AboutPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <JsonLd schema={personSchema(BUSINESS.author, BUSINESS)} />
      <JsonLd schema={professionalServiceSchema(BUSINESS)} />
      <JsonLd schema={articleSchema({ b: BUSINESS, title: META.title, description: META.description, url: META.canonical, imageUrl: `${BUSINESS.siteUrl}/images/about-ev-crew.jpg`, publishedAt: PUBLISHED_AT, modifiedAt: MODIFIED_AT, wordCount: WORD_COUNT, articleSection: 'About' })} />

      <PageHero
        size="standard"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        eyebrow="About"
        h1={`Honest EV charger quotes in ${city}`}
        subhead="Phone first. A real panel load check. Honest quoting — we open the panel before promising amps."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="eyebrow mb-3">Why this exists</div>
          <h2 className="display text-3xl md:text-4xl font-extrabold text-brand leading-tight mb-6">
            A phone-first way to get an honest Level 2 EV charger quote without a promised amperage nobody opened the panel to confirm.
          </h2>
          <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
            <p>
              {BUSINESS.name} is a locally-operated service-area business covering {city} and the rest
              of {county} and Central Oregon. The model is straightforward: tell us the panel — its
              size, roughly what's already on it, and where you park — talk it through on the phone, and
              get an honest number. No charger sold before anyone checks whether the panel can feed it.
            </p>
            <p>
              Not every install is a quick 48-amp circuit, and we'll tell you so. A full 100-amp panel
              already carrying a range, dryer, and AC may only support a smaller circuit, or need an
              upgrade first. A long run to a detached carport is more wire and labor than a charger on
              the garage wall by the panel. We say that up front rather than quote a number that becomes
              a change order once the panel cover comes off.
            </p>
            <p>
              Where a Level 2 install earns its keep is the new EV charging on a trickle from a wall
              outlet, the household adding a second car, the ADU that needs its own circuit, or the
              owner who wants to wake up to a full battery and qualify for the Central Electric Co-op
              rebate. That's the math we run on the call: your panel and your parking against the
              install, with no thumb on the scale.
            </p>
            <p>
              There's no upsell pressure on this line. If the honest answer is &quot;a NEMA 14-50 outlet
              is enough for you&quot; or &quot;your driving doesn't justify Level 2 yet,&quot; that's
              what you'll hear. If a Level 2 install does make sense, we walk you through the amperage,
              the hardwired-vs-outlet choice, whether the panel needs an upgrade, and the rebate before
              anything gets scheduled — so the quote you get is the quote you pay.
            </p>
            <p>
              The work routes to vetted, licensed Oregon electricians (CCB plus a BCD electrical
              license) who run a real load calc, size wire and breaker to 125 percent of the continuous
              draw, and pull the permit — not a 240V circuit guessed from the driveway. No franchise
              script, no call center, no &ldquo;let me transfer you to scheduling.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <AboutSplit
        business={BUSINESS}
        imageSrc="/images/about-ev-crew.jpg"
        imageAlt={`${BUSINESS.author.name} — local licensed EV charger crew serving ${city}, ${stateFull}`}
        eyebrow="Who picks up the phone"
        title={`${BUSINESS.author.name} — local licensed EV crew for ${county}.`}
        paragraphs={[
          BUSINESS.author.bio,
          `When you call, you reach a local electrician directly. There is no booking script and no "let me check with the manager." Tell us your panel size, what's on it, where you park, and which car you charge, and the call ends with either an honest "you'll need a panel upgrade first" or a real quote you can confirm before anything gets scheduled.`,
        ]}
        badges={[
          { title: 'Locally operated', subtitle: 'No franchise, no national call center' },
          { title: 'Service-area business', subtitle: `${city} + ${county}` },
          { title: 'Licensed Oregon electrician', subtitle: 'CCB + BCD electrical license' },
          { title: 'Honest quoting', subtitle: 'The quote is the price you pay' },
        ]}
        ctaHref={`tel:${BUSINESS.phone.tel}`}
        ctaLabel={`Call ${BUSINESS.phone.display}`}
      />

      <ProcessSteps
        eyebrow="What to expect"
        title="How a call goes"
        steps={[
          { title: 'Panel + parking details', description: 'Tell us your panel size, what is on it, where you park, and which car you charge. That is enough to talk through a ballpark on the phone.' },
          { title: 'Load calc + site look', description: 'A local electrician runs a load calculation and confirms on-site: available capacity, the circuit run, wire gauge, breaker, and the right amperage.' },
          { title: 'Install + permit', description: 'Dedicated 240V circuit run, breaker landed, hardwired unit or NEMA 14-50 outlet mounted, grounded and bonded — all on an electrical permit.' },
          { title: 'Inspection + rebate', description: 'We pass inspection, walk you through how it runs, and hand over the paperwork — including what you need for the Central Electric Co-op rebate.' },
        ]}
      />

      <CtaBand
        business={BUSINESS}
        eyebrow="Talk it through"
        headline="Ready to talk it through?"
        subhead="Tell us your panel and where you park. Honest number. No promised amperage nobody confirmed."
      />
    </>
  );
}
