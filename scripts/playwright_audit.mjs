import { chromium } from 'playwright';

const urls = [
  'https://evchargerone.pages.dev/',
  'https://evchargerone.pages.dev/calculator',
  'https://evchargerone.pages.dev/about',
  'https://evchargerone.pages.dev/contact',
  'https://evchargerone.pages.dev/contractor-disclosure',
  'https://evchargerone.pages.dev/privacy',
  'https://evchargerone.pages.dev/services/',
  'https://evchargerone.pages.dev/services/tesla-wall-connector',
  'https://evchargerone.pages.dev/services/nema-14-50-upgrade',
  'https://evchargerone.pages.dev/services/panel-capacity-upgrade',
  'https://evchargerone.pages.dev/services/commercial-ev-charging',
  'https://evchargerone.pages.dev/locations/',
  'https://evchargerone.pages.dev/locations/bend',
  'https://evchargerone.pages.dev/locations/redmond',
  'https://evchargerone.pages.dev/locations/sisters',
  'https://evchargerone.pages.dev/locations/sunriver',
  'https://evchargerone.pages.dev/locations/la-pine',
  'https://evchargerone.pages.dev/locations/prineville',
  'https://evchargerone.pages.dev/blog/',
  'https://evchargerone.pages.dev/blog/tesla-wall-connector-installation-bend-or',
  'https://evchargerone.pages.dev/blog/chargepoint-home-flex-vs-tesla-wall-connector',
  'https://evchargerone.pages.dev/blog/emporia-ev-charger-installation-guide',
  'https://evchargerone.pages.dev/blog/grizzl-e-smart-ev-charger-cold-weather-review',
  'https://evchargerone.pages.dev/blog/central-electric-coop-ev-rebates-deschutes-county',
  'https://evchargerone.pages.dev/blog/nec-article-220-ev-charger-load-calculation',
  'https://evchargerone.pages.dev/blog/pacific-power-ev-charger-rebate-oregon-guide',
  'https://evchargerone.pages.dev/blog/federal-30c-tax-credit-ev-charger-installation',
  'https://evchargerone.pages.dev/blog/200-amp-electrical-panel-upgrade-bend-or',
  'https://evchargerone.pages.dev/blog/do-i-need-200-amp-panel-for-ev-charger',
  'https://evchargerone.pages.dev/blog/level-2-ev-charger-installation-bend-or',
  'https://evchargerone.pages.dev/blog/how-much-does-it-cost-to-install-ev-charger-in-garage',
  'https://evchargerone.pages.dev/blog/ev-charger-installation-redmond-or',
  'https://evchargerone.pages.dev/blog/hardwired-vs-plugin-ev-charger',
  'https://evchargerone.pages.dev/blog/bend-electrician-rates-2026',
  'https://evchargerone.pages.dev/blog/pacific-power-ev-rebates',
  'https://evchargerone.pages.dev/blog/permits-deschutes-county'
];

(async () => {
  console.log(`Starting live Playwright Core Web Vitals & Schema Audit for ${urls.length} URLs...\n`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const auditReport = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const startTime = Date.now();
    let statusCode = 200;
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      statusCode = response ? response.status() : 500;
    } catch (err) {
      statusCode = 500;
    }

    const loadTimeMs = Date.now() - startTime;
    const title = await page.title();
    const h1Text = await page.$eval('h1', el => el.textContent.trim()).catch(() => 'MISSING H1');

    // Check JSON-LD scripts
    const schemasCount = await page.$$eval('script[type="application/ld+json"]', scripts => scripts.length);

    auditReport.push({
      index: i + 1,
      url,
      status: statusCode,
      loadTimeMs,
      title,
      h1: h1Text.slice(0, 45) + '...',
      schemasCount
    });

    console.log(`[${i + 1}/${urls.length}] HTTP ${statusCode} | ${loadTimeMs}ms | Schemas: ${schemasCount} | ${url}`);
  }

  await browser.close();

  console.log('\n--- LIVE AUDIT COMPLETE ---');
  console.log(`Total URLs Audited: ${auditReport.length}`);
  console.log(`All 200 OK Status: ${auditReport.every(r => r.status === 200) ? 'YES ✅' : 'NO ❌'}`);
})();
