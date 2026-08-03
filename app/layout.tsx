/**
 * Root layout — Prototype A sitewide chrome per SOP §23 + §27.
 * EV charger site — Electric Blue + EV Green palette per SOP §40.
 *
 * Auto-injects per page:
 *   - Inter (body) + Barlow Condensed (display) via next/font
 *   - IconSymbols (Lucide SVG library)
 *   - TopUtilityBar / Header / Footer / StickyMobileBar
 *   - Organization, WebSite, SiteNavigation schema
 *   - GSC verification meta (per [[gsc-analytics-auto-inject]])
 *   - GA4 gtag.js (per SOP §35)
 */
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Barlow_Condensed } from 'next/font/google';
import {
  Header,
  Footer,
  StickyMobileBar,
  TopUtilityBar,
  IconSymbols,
  JsonLd,
  GoogleAnalytics,
} from '@ppl/shared/components';
import {
  organizationSchema,
  websiteSchema,
  siteNavigationSchema,
} from '@ppl/shared/lib/schema-gen';
import { getGscVerification } from '@ppl/shared/lib/seo';
import gscVerifications from '@master-config/gsc-verifications.json';
import ga4MeasurementIds from '@master-config/ga4-measurement-ids.json';
import { BUSINESS } from '@content/business';
import { SERVICES } from '@content/services';
import { SITE_COPY } from '@content/site-copy';

const FOOTER_SERVICES = SERVICES.map((s) => ({
  label: s.name.split(/[—&]/)[0]!.trim(),
  href: s.url.replace(BUSINESS.siteUrl, ''),
}));
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-barlow',
});

const GSC_VERIFICATION = getGscVerification(
  BUSINESS.slug,
  (gscVerifications as { verifications?: Record<string, string> }).verifications ?? {},
);

const GA4_MEASUREMENT_ID =
  (ga4MeasurementIds as { measurementIds?: Record<string, string> }).measurementIds?.[BUSINESS.slug];

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.author.name }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: true, email: false, address: false },
  ...(GSC_VERIFICATION && { verification: { google: GSC_VERIFICATION } }),
  openGraph: { type: 'website', locale: 'en_US', siteName: BUSINESS.name },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B3D6B',
};

const NAV_ITEMS = [
  { name: 'Services', url: `${BUSINESS.siteUrl}/services/` },
  { name: 'Blog', url: `${BUSINESS.siteUrl}/blog/` },
  { name: 'About', url: `${BUSINESS.siteUrl}/about/` },
  { name: 'Locations', url: `${BUSINESS.siteUrl}/locations/` },
  { name: 'Contact', url: `${BUSINESS.siteUrl}/contact/` },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${barlow.variable}`}>
      <head>
        <link rel="canonical" href={BUSINESS.siteUrl + '/'} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0B3D6B" />
        <JsonLd schema={organizationSchema(BUSINESS)} />
        <JsonLd schema={websiteSchema(BUSINESS)} />
        <JsonLd schema={siteNavigationSchema(NAV_ITEMS)} />
        <GoogleAnalytics measurementId={GA4_MEASUREMENT_ID} />
      </head>
      <body className="font-sans">
        <IconSymbols />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-brand focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <TopUtilityBar business={BUSINESS} hours={SITE_COPY.hours.weekday} trustNote={SITE_COPY.phoneFirst} />
        <Header business={BUSINESS} />
        <main id="main" className="min-h-screen">{children}</main>
        <Footer business={BUSINESS} hours={SITE_COPY.hours.weekday} services={FOOTER_SERVICES} />
        <StickyMobileBar business={BUSINESS} />
      </body>
    </html>
  );
}
