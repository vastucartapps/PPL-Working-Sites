import fs from 'fs';

const testUrls = [
  'https://evchargerone.pages.dev/',
  'https://evchargerone.pages.dev/calculator/',
  'https://evchargerone.pages.dev/services/tesla-wall-connector/',
  'https://evchargerone.pages.dev/locations/bend/',
  'https://evchargerone.pages.dev/blog/tesla-wall-connector-installation-bend-or/'
];

async function runGooglePageSpeedAPI() {
  console.log(`Querying official Google PageSpeed Insights API (v5) for ${testUrls.length} live URLs...\n`);

  for (let i = 0; i < testUrls.length; i++) {
    const targetUrl = testUrls[i];
    console.log(`[${i + 1}/${testUrls.length}] Requesting Google PageSpeed report for: ${targetUrl}`);

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=MOBILE`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        console.log(`   ❌ API Status: ${res.status} ${res.statusText}`);
        continue;
      }
      const data = await res.json();
      const categories = data.lighthouseResult?.categories;

      if (categories) {
        const perf = Math.round((categories.performance?.score || 0) * 100);
        const access = Math.round((categories.accessibility?.score || 0) * 100);
        const best = Math.round((categories['best-practices']?.score || 0) * 100);
        const seo = Math.round((categories.seo?.score || 0) * 100);

        console.log(`   📊 SCORES -> Performance: ${perf} | Accessibility: ${access} | Best Practices: ${best} | SEO: ${seo}`);

        // Extract any failing audits
        const audits = data.lighthouseResult?.audits;
        const failures = [];
        if (audits) {
          Object.keys(audits).forEach(key => {
            const audit = audits[key];
            if (audit.score !== null && audit.score < 0.9 && audit.details?.type !== 'opportunity') {
              failures.push(`${audit.title}: ${audit.description?.slice(0, 80)}...`);
            }
          });
        }
        if (failures.length > 0) {
          console.log(`   ⚠️ Failing Google Audits (${failures.length}):`);
          failures.slice(0, 5).forEach(f => console.log(`      - ${f}`));
        } else {
          console.log(`   ✨ 100% Passed all Google Lighthouse audit checks!`);
        }
      }
    } catch (err) {
      console.log(`   ❌ Error fetching PageSpeed data: ${err.message}`);
    }
  }
}

runGooglePageSpeedAPI();
