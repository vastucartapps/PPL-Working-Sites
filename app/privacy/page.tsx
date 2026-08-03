/**
 * Privacy Policy — EV charger site (Level 2 EV charger × Bend OR).
 * Mirror of site 1; identical legal content, references {BUSINESS.niche.nameSingular}.
 */
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd } from '@ppl/shared/components';
import { webPageSchema, breadcrumbSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { formatLastUpdated, getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';

const META = buildPageMeta({ pageType: 'privacy', ctx: { business: BUSINESS }, pathname: '/privacy/' });
const LAST_UPDATED = formatLastUpdated(getPageDates('/privacy/', DATES).dateModified);

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
};

export default function PrivacyPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Privacy Policy', href: '/privacy/', current: true },
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
        <h1>Privacy Policy</h1>
        <p className="text-sm text-neutral-600">Last updated: {LAST_UPDATED}</p>

        <h2>Who this applies to</h2>
        <p>
          This policy covers everyone who visits {BUSINESS.siteUrl}, contacts {BUSINESS.name} by phone or
          form, or whose information is otherwise processed by us in connection with a request for
          {' '}{BUSINESS.niche.nameSingular} services in our coverage area.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Information you submit voluntarily.</strong> Name, phone number, location (city and ZIP), service-context details, and any free-text notes you include in the contact form or text message.</li>
          <li><strong>Phone call metadata.</strong> When you call, our routing partner records the phone number, time, duration, and routing destination. We may record call audio for quality and training; if so, the recording-disclosure prompt plays before the call connects.</li>
          <li><strong>Server logs.</strong> IP address, user agent, page requested, referrer, and timestamp. Retained for up to 90 days for security and abuse-prevention purposes.</li>
          <li><strong>Cookies and analytics.</strong> We use first-party analytics (currently Google Analytics 4 in IP-anonymized mode) to measure aggregate site usage. No advertising cookies are set on this site.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To connect your call or form submission with a licensed third-party {BUSINESS.niche.nameSingular} installer in your service area.</li>
          <li>To respond to your questions and provide a phone quote.</li>
          <li>To improve the site, debug issues, and prevent abuse.</li>
          <li>To meet our legal obligations and respond to lawful requests from authorities.</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>
          We share submitted contact information with the licensed EV charger installer
          routed to handle your service area. Sharing is limited to what is necessary to fulfill your
          service request. We do not sell your personal information, we do not share it with
          advertising networks, and we do not transfer it outside the United States.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Contact-form submissions are kept for 24 months after your last interaction with us, then
          deleted. Phone-call metadata is kept per our routing partner&apos;s retention schedule (typically
          12 months). Server logs are kept up to 90 days. Aggregate, anonymous analytics may be retained
          indefinitely.
        </p>

        <h2>Your rights</h2>
        <p>
          If you live in California, Virginia, Colorado, Connecticut, Utah, or any other US state with
          a comprehensive consumer-privacy law, you may request access to, correction of, or deletion of
          your personal information. To exercise these rights, email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-brand underline">{BUSINESS.email}</a>{' '}
          from the address tied to your submission, or write us at the postal address provided on request.
          We respond within 45 days.
        </p>

        <h2>Children</h2>
        <p>
          This site is not directed at children under 13, and we do not knowingly collect personal
          information from children.
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy materially we will update the &ldquo;Last updated&rdquo; date above
          and, where appropriate, post a notice on the site.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy: email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-brand underline">{BUSINESS.email}</a>{' '}
          or call <a href={`tel:${BUSINESS.phone.tel}`} className="text-brand underline">{BUSINESS.phone.display}</a>.
        </p>
      </article>
    </>
  );
}
