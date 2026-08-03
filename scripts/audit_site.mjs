import fs from 'fs';
import path from 'path';

const distDir = '/mnt/c/Users/Prashant Vaishnava/Documents/Codes/PPL/sites/ev-charger-bend-or/dist';

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files to audit.`);

const auditResults = [];

htmlFiles.forEach((filePath) => {
  const relPath = path.relative(distDir, filePath);
  const urlPath = '/' + (relPath === 'index.html' ? '' : relPath.replace(/\/index\.html$/, ''));
  const content = fs.readFileSync(filePath, 'utf-8');

  const issues = [];
  const schemaTypes = [];

  // 1. JSON-LD Schema Audit
  const jsonLdRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdRegex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed['@type']) {
        schemaTypes.push(parsed['@type']);
      }
      // Check required schema fields
      if (parsed['@type'] === 'Electrician') {
        if (!parsed.name) issues.push('Electrician schema missing name');
        if (!parsed.telephone) issues.push('Electrician schema missing telephone');
        if (!parsed.address) issues.push('Electrician schema missing address');
      }
      if (parsed['@type'] === 'FAQPage') {
        if (!parsed.mainEntity || !Array.isArray(parsed.mainEntity) || parsed.mainEntity.length === 0) {
          issues.push('FAQPage schema missing mainEntity questions');
        }
      }
    } catch (e) {
      issues.push(`Invalid JSON-LD syntax: ${e.message}`);
    }
  }

  if (schemaTypes.length === 0) {
    issues.push('No JSON-LD schema found on page');
  }

  // 2. Heading Hierarchy Audit
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    issues.push('Missing <h1> heading');
  } else if (h1Matches.length > 1) {
    issues.push(`Multiple <h1> headings found (${h1Matches.length})`);
  }

  // 3. Meta Description & Title Audit
  if (!content.includes('<title>') || content.includes('<title></title>')) {
    issues.push('Missing or empty <title>');
  }
  if (!content.includes('name="description"')) {
    issues.push('Missing meta description');
  }
  if (!content.includes('name="google-site-verification"')) {
    issues.push('Missing google-site-verification meta tag');
  }

  // 4. Accessibility & Contrast Audits
  // Check for buttons without aria-label or visible text
  const emptyButtons = content.match(/<button[^>]*>\s*<\/button>/gi);
  if (emptyButtons) {
    issues.push(`Found ${emptyButtons.length} empty <button> elements without labels`);
  }

  // Check for images without alt attributes
  const imgNoAlt = content.match(/<img(?![^>]*\balt=)[^>]*>/gi);
  if (imgNoAlt) {
    issues.push(`Found ${imgNoAlt.length} <img> elements missing alt attribute`);
  }

  auditResults.push({
    url: urlPath,
    file: relPath,
    schemas: schemaTypes.join(', '),
    issueCount: issues.length,
    issues: issues
  });
});

console.log('\n--- AUDIT RESULTS SUMMARY ---');
auditResults.forEach((r) => {
  const status = r.issueCount === 0 ? '✅ PASSED (0 Issues)' : `❌ FAILED (${r.issueCount} Issues)`;
  console.log(`${r.url || '/'} -> ${status} | Schemas: [${r.schemas}]`);
  if (r.issues.length > 0) {
    r.issues.forEach((iss) => console.log(`   - ${iss}`));
  }
});
