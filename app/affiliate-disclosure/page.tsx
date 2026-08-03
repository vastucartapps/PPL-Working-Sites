/**
 * Affiliate Disclosure — EV charger site (Level 2 EV charger × Bend OR). FTC 16 CFR Part 255 compliance.
 */
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd } from '@ppl/shared/components';
import { webPageSchema, breadcrumbSchema } from '@ppl/shared/lib/schema-gen';
import { buildPageMeta } from '@ppl/shared/lib/seo';
import { formatLastUpdated, getPageDates } from '@ppl/shared/lib/dates';
import { BUSINESS } from '@content/business';
import { DATES } from '@content/_dates';

const META = buildPageMeta({ pageType: 'affiliate-disclosure', ctx: { business: BUSINESS }, pathname: '/affiliate-disclosure/' });
const LAST_UPDATED = formatLastUpdated(getPageDates('/affiliate-disclosure/', DATES).dateModified);

export const metadata: Metadata = {
  title: META.title, description: META.description, alternates: { canonical: META.canonical },
};

export default function AffiliateDisclosurePage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure/', current: true },
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
        <h1>Affiliate Disclosure</h1>
        <p className="text-sm text-neutral-600">Last updated: {LAST_UPDATED}</p>

        <h2>The short version</h2>
        <p>
          {BUSINESS.name} is a service-connection platform. All EV charger installation work is handled
          by our local licensed electrician partners in {BUSINESS.location.county},{' '}
          {BUSINESS.location.stateFull}. When you call the number on this site, you reach a real local
          electrician operating in your service area.
        </p>
        <p>
          {BUSINESS.name} may receive a referral fee from the partner provider for connecting you.
          That referral fee does not change the price you pay for service. You are under no obligation
          to hire the partner after the free phone quote.
        </p>

        <h2>FTC compliance</h2>
        <p>
          This disclosure complies with the U.S. Federal Trade Commission&apos;s 16 CFR Part 255
          (&ldquo;Guides Concerning the Use of Endorsements and Testimonials in Advertising&rdquo;). Any
          testimonials displayed on this site are paraphrased compositions of real customer feedback
          themes, edited for length and clarity, and kept within plausible ranges. They reflect typical
          rather than exceptional outcomes.
        </p>

        <h2>What this means for you</h2>
        <ul>
          <li>Pricing you receive from the routed provider is set by the provider, not by us. Provider pricing is unaffected by the referral relationship.</li>
          <li>You are under no obligation to hire a routed provider after a free phone quote. The quote is free; the decision is yours.</li>
          <li>If you prefer to choose your own provider, you may. We do not have any exclusive routing or non-compete agreements that would limit your provider choice.</li>
        </ul>

        <h2>How we choose providers</h2>
        <p>
          Providers in our network are required to hold:
        </p>
        <ul>
          <li>A valid Oregon Construction Contractors Board (CCB) registration and a Building Codes Division (BCD) electrical license, as required for EV charger and electrical work in Oregon.</li>
          <li>Adequate general liability insurance for electrical and EV charger installation work.</li>
          <li>A documented track record installing Level 2 EV chargers in our service area, including familiarity with panel load calculations, the 125 percent continuous-load rule, and permitting specific to Deschutes County / Central Oregon homes.</li>
        </ul>
        <p>
          We periodically review provider performance based on customer feedback and may remove providers
          from rotation for documented poor service or compliance failures. We do not warrant or guarantee
          the work of any individual provider &mdash; the service relationship and any guarantee is between
          you and the provider directly.
        </p>

        <h2>Editorial independence</h2>
        <p>
          The educational content on this site (homepage article, blog posts, FAQs, service descriptions)
          reflects the views of the author and is not influenced by referral-fee considerations. We will
          tell you on the phone if a Level 2 install is not the right fit for your specific situation,
          including when a NEMA 14-50 outlet is enough, when your driving doesn&rsquo;t yet justify
          Level 2, or when the panel needs an upgrade first. See our <a href="/about/">about page</a>{' '}
          for the &ldquo;check the panel first&rdquo; policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclosure: email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-brand underline">{BUSINESS.email}</a>{' '}
          or call <a href={`tel:${BUSINESS.phone.tel}`} className="text-brand underline">{BUSINESS.phone.display}</a>.
        </p>
      </article>
    </>
  );
}
