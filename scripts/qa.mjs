#!/usr/bin/env node
// Post-build QA gate. Run after `astro build`, against dist/.
// Exists so the regressions fixed in this session (fake phone number,
// fabricated Product schema, meta length overflow, broken trailing slashes)
// can't silently ship again.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found -- run `npm run build` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const REAL_PHONE_CLEAN = '18882174060';
const htmlFiles = walk(distDir);
const errors = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(distDir, file);

  // Phone consistency: every tel: href must match the real SSOT number.
  const telMatches = [...html.matchAll(/href="tel:([0-9]+)"/g)].map((m) => m[1]);
  for (const tel of telMatches) {
    if (tel !== REAL_PHONE_CLEAN && tel !== REAL_PHONE_CLEAN.slice(1)) {
      errors.push(`${rel}: tel: link "${tel}" does not match SSOT phone`);
    }
  }

  // No fabricated commercial schema.
  if (/"@type"\s*:\s*"Product"/.test(html)) {
    errors.push(`${rel}: Product schema present (should not exist)`);
  }
  if (/"@type"\s*:\s*"AggregateRating"/.test(html)) {
    errors.push(`${rel}: AggregateRating schema present (should not exist)`);
  }

  // Meta length band.
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  if (titleMatch) {
    const t = decode(titleMatch[1]);
    if (t.length > 60) errors.push(`${rel}: title ${t.length} chars (>60): "${t}"`);
  }
  if (descMatch) {
    const d = decode(descMatch[1]);
    if (d.length > 160) errors.push(`${rel}: description ${d.length} chars (>160): "${d}"`);
  }

  // H1 present and non-empty.
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1Matches.length === 0) {
    errors.push(`${rel}: no <h1> found`);
  } else {
    const h1Text = h1Matches[0][1].replace(/<[^>]*>/g, '').trim();
    if (!h1Text) errors.push(`${rel}: <h1> is empty`);
  }

  // Internal links must carry a trailing slash (matches trailingSlash config).
  const hrefs = [...html.matchAll(/href="(\/[a-zA-Z0-9][^"#]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const isFile = /\.[a-z0-9]{2,4}$/i.test(href);
    if (!isFile && !href.endsWith('/')) {
      errors.push(`${rel}: internal link missing trailing slash: ${href}`);
    }
  }
}

console.log(`Checked ${htmlFiles.length} built pages.`);
if (errors.length > 0) {
  console.error(`\n${errors.length} QA error(s):\n`);
  for (const e of errors.slice(0, 100)) console.error(' -', e);
  if (errors.length > 100) console.error(`  ...and ${errors.length - 100} more`);
  process.exit(1);
}
console.log('QA gate passed clean.');
