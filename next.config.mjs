/**
 * Next.js 15 — static export configuration.
 * Per PPL_SOP.md § 1 + § 11: SSG only (output: 'export') so we can deploy
 * to any free static-host (Firebase Hosting primary).
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  transpilePackages: ['@ppl/shared'],
};

export default nextConfig;
