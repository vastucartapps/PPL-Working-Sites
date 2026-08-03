/**
 * Terms of Service — EV charger site (Level 2 EV charger × Bend OR).
 */
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd } from '@ppl/shared/components';
import { webPageSchema, breadcrumbSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { formatLastUpdated, getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';

const META = buildPageMeta({ pageType: 'terms', ctx: { business: BUSINESS }, pathname: '/terms/' });
const LAST_UPDATED = formatLastUpdated(getPageDates('/terms/', DATES).dateModified);

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
};

export default function TermsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Terms of Service', href: '/terms/', current: true },
  ];
  const crumbsForSchema = crumbs.map((c, i) => ({
    name: c.name,
    url: i === 0 ? `${BUSINESS.siteUrl}/` : `${BUSINESS.siteUrl}${c.href}`,
  }));

  return (
    <>
      <JsonLd schema={webPageSchema({ type: 'WebPage', b: BUSINESS, url: META.canonical, title: META.title, description: META.description, breadcrumbs: crumbsForSchema })} />
      <JsonLd schema={breadcrumbSchema(crumbsForSchema)} />
      <Breadcrumbs crumbs={crumbs} />
      <article className="prose-article mx-auto max-w-3xl px-6 py-8">
        <h1>Terms of Service</h1>
        <p className="text-sm text-neutral-600">Last updated: {LAST_UPDATED}</p>

        <h2>What this site does</h2>
        <p>
          {BUSINESS.name} ({BUSINESS.siteUrl}) is a service-connection platform that routes calls and
          form submissions to vetted, licensed third-party EV charger installers (Oregon CCB plus a BCD
          electrical license) serving {BUSINESS.location.county}, {BUSINESS.location.stateFull} and the
          surrounding service area. {BUSINESS.name} does not directly perform installation services.
          Calls and forms reach a local provider who is responsible for any subsequent service
          relationship with you.
        </p>

        <h2>Use of the site</h2>
        <p>
          You may use this site for personal, non-commercial purposes to learn about Level 2 EV charger
          installation and request a free phone quote. You may not scrape the site for training of
          large language models or other AI systems &mdash; see our{' '}
          <a href="/llms.txt">llms.txt</a> and robots.txt. You may not use the site to harass our team,
          our routing partners, or our service providers.
        </p>

        <h2>Information you submit</h2>
        <p>
          When you submit a form or place a call, you confirm that the information you provide is your
          own (or that you have authority to submit on behalf of the property in question). Submitted
          information is used as described in our <a href="/privacy/">privacy policy</a>.
        </p>

        <h2>No professional advice</h2>
        <p>
          The content on this site is educational and informational. It is not a substitute for a
          licensed electrician&apos;s on-site panel load calculation and assessment, and it is not
          legal, code-compliance, or financial advice regarding electrical permits, product warranties,
          or rebate eligibility. Confirm equipment ratings and rebate eligibility against the current
          program terms and, where appropriate, consult a licensed professional for advice on your
          specific situation.
        </p>

        <h2>Third-party providers</h2>
        <p>
          Service providers routed by this platform operate independently under their own licenses,
          insurance, and service agreements. Pricing, scope of work, scheduling, guarantees, and dispute
          resolution are governed by the service agreement you sign directly with the provider. We make
          reasonable efforts to vet providers but we do not warrant their work.
        </p>

        <h2>Affiliate disclosure</h2>
        <p>
          {BUSINESS.name} may receive a referral fee for connecting consumers with service providers.
          See the <a href="/affiliate-disclosure/">affiliate disclosure</a> for full details and the
          FTC compliance statement.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {BUSINESS.name}, its operators, and its routing partners
          are not liable for any indirect, incidental, special, or consequential damages arising from
          your use of the site or from any service performed by a third-party provider routed through it.
          Your sole remedy for a service dispute is against the provider directly.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of {BUSINESS.location.stateFull}, without
          regard to conflict-of-law principles. Any dispute that cannot be resolved informally will be
          brought in a court of competent jurisdiction in {BUSINESS.location.county},
          {' '}{BUSINESS.location.stateFull}.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms occasionally. Material changes will be reflected in the
          &ldquo;Last updated&rdquo; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-brand underline">{BUSINESS.email}</a>{' '}
          or call <a href={`tel:${BUSINESS.phone.tel}`} className="text-brand underline">{BUSINESS.phone.display}</a>.
        </p>
      </article>
    </>
  );
}
