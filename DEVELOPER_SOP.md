# 🛡️ PPL DEVELOPER STANDARD OPERATING PROCEDURE (SOP) & HARD GUARDRAILS

This document defines the **mandatory developer standards, speed protocols, and content quality guardrails** for launching new sites using the PPL Master Template.

---

## 🛑 MANDATORY HARD GUARDRAILS (STRICT COMPLIANCE REQUIRED)

### 1. ZERO PLAGIARISM & ZERO COPIED CONTENT
* **Rule:** **No two portfolio sites may EVER share identical body text, hero paragraphs, or promotional copy.**
* **Enforcement:** Every new site instantiated from this template MUST feature 100% original, hyper-localized technical text specific to its target city and niche. Re-using text from existing portfolio sites is strictly prohibited.

### 2. ZERO AI FLUFF & ZERO FACT-CHECK CONTRADICTIONS
* **Rule:** **No word padding, generic conversational AI fluff, or contradictory technical claims.**
* **Enforcement:** All content must present verified, accurate local building code requirements, electrical/structural specifications, permit fees, and utility standards. Fluff and artificial padding that risk keyword cannibalization are forbidden.

### 3. MINIMUM 3 DISTINCT IMAGES PER ARTICLE
* **Rule:** **Every technical article and guide MUST feature a minimum of 3 distinct, high-resolution WebP images.**
* **Image Breakdown Required:**
  1. `Hero Image` (WebP 1440w / 960w / 480w)
  2. `Technical Process / Wiring / Diagram Image` (WebP)
  3. `Component Detail / Equipment Image` (WebP)
* **Visual Rule:** Images MUST NEVER be reused across different sites in the network. Every site generates its own custom asset suite.

### 4. 2,500+ WORD TECHNICAL ARTICLES WITH 10+ FAQS
* **Rule:** **Every guide page must be a minimum of 2,500 words of technical depth and contain at least 10 localized FAQs.**
* **Visual Elements Required per Article:**
  * **BLUF Block (Bottom Line Up Front):** Highlighting key cost, time, and permit data.
  * **Atomic Answer Block (40-60 Words):** Explicitly optimized for GSC Featured Snippet placement.
  * **Interactive Equipment Comparison Matrix:** Tabular technical comparison.
  * **SVG Wiring / Process Diagram:** Clean vector graphic illustrating the system.
  * **10 Location-Localized FAQs:** Structured with Schema.org `FAQPage` JSON-LD markup.

### 5. PROPER INTERNAL LINKING ARCHITECTURE
* **Rule:** **Zero orphan pages. Every page must link contextually to adjacent services, calculators, and city hubs.**
* **Linking Standard:**
  * Hero Breadcrumbs on every page (`Home -> Services -> [Service]`).
  * Cross-links between City Location Pages (`/locations/[city]/`) and Service Pages (`/services/[service]/`).
  * Links from technical blog articles directly into the interactive cost calculator (`/calculator/`).

---

## ⚡ 100/100 MOBILE PAGESPEED PROTOCOLS

To maintain a perfect **100/100 Lighthouse / PageSpeed score on Mobile**:

1. **Preload LCP Hero Image at Stream Byte 1:**
   ```html
   <link rel="preload" as="image" href={image} fetchpriority="high" type="image/webp" />
   ```
2. **Zero-Overhead Event Delegation (0 KiB JS):**
   * Do NOT import heavy JS libraries for click tracking. Use passive document delegation in `SEOHead.astro`:
   ```javascript
   document.addEventListener('click', function(e) {
     var link = e.target.closest('a[href^="tel:"]');
     if (link) {
       gtag('event', 'click_to_call', { 'event_category': 'lead_conversion', 'event_label': link.getAttribute('href') });
     }
   }, { passive: true });
   ```
3. **Strict WebP Multi-Resolution Generation:**
   * Run `node scripts/optimize_all_images.cjs` to generate 480w, 960w, and 1440w WebP variants for all assets.

---

## 🚀 NEW SITE LAUNCH CHECKLIST (15-MINUTE SOP)

Follow these exact steps to instantiate a new site from this template:

1. **Copy Template Directory:**
   ```bash
   cp -r PPL_WORKING_SITES/Template PPL_WORKING_SITES/{{NEW_SITE_DIR}}
   ```
2. **Update `src/config/site.ts`:**
   Replace all `{{PLACEHOLDERS}}` with the target brand name, domain, city, state, phone numbers, Web3Forms key, and GA4 ID.
3. **Generate Custom Image Assets:**
   Run `generate_image` tool to create unique hero and feature images for the new site and process them with `optimize_all_images.cjs`.
4. **Run Build & Speed Audit:**
   ```bash
   npm run build
   node scripts/pagespeed_audit.mjs
   ```
5. **Deploy to Cloudflare Pages & Push to GitHub:**
   ```bash
   wrangler pages deploy dist --project-name={{PROJECT_NAME}}
   git add . && git commit -m "feat: Launch {{BRAND_NAME}}" && git push origin main
   ```
