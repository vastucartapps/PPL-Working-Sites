/**
 * robots.txt — selective bot policy per [[selective-bot-policy]] memory + SOP §9D + §26 + §41.
 * Identical posture to site 1: ALLOW citation/retrieval bots (search + LLMs),
 * BLOCK training-only scrapers.
 */
import type { MetadataRoute } from 'next';
import { BUSINESS } from '@content/business';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },

      // ALLOW — search & AI citation/retrieval
      { userAgent: 'Googlebot',          allow: '/' },
      { userAgent: 'Bingbot',            allow: '/' },
      { userAgent: 'DuckDuckBot',        allow: '/' },
      { userAgent: 'Applebot',           allow: '/' },
      { userAgent: 'Applebot-Extended',  allow: '/' },
      { userAgent: 'PerplexityBot',      allow: '/' },
      { userAgent: 'Perplexity-User',    allow: '/' },
      { userAgent: 'OAI-SearchBot',      allow: '/' },
      { userAgent: 'ChatGPT-User',       allow: '/' },
      { userAgent: 'GPTBot',             allow: '/' },
      { userAgent: 'ClaudeBot',          allow: '/' },
      { userAgent: 'Claude-SearchBot',   allow: '/' },
      { userAgent: 'Claude-User',        allow: '/' },
      { userAgent: 'YouBot',             allow: '/' },

      // Googlebot family — extended access (Gemini retrieval allowed)
      { userAgent: 'Google-Extended',              allow: '/' },
      { userAgent: 'Googlebot-Image',              allow: '/' },
      { userAgent: 'Googlebot-Mobile',             allow: '/' },
      { userAgent: 'Googlebot-News',               allow: '/' },
      { userAgent: 'Googlebot-Video',              allow: '/' },
      { userAgent: 'AdsBot-Google',                allow: '/' },
      { userAgent: 'Mediapartners-Google',         allow: '/' },

      // BLOCK — training-only / scrapers / SEO-competitor crawlers
      { userAgent: 'anthropic-ai',                 disallow: '/' },
      { userAgent: 'claude-web',                   disallow: '/' },
      { userAgent: 'CCBot',                        disallow: '/' },
      { userAgent: 'Bytespider',                   disallow: '/' },
      { userAgent: 'Amazonbot',                    disallow: '/' },
      { userAgent: 'meta-externalagent',           disallow: '/' },
      { userAgent: 'Meta-ExternalAgent',           disallow: '/' },
      { userAgent: 'FacebookBot',                  disallow: '/' },
      { userAgent: 'Omgilibot',                    disallow: '/' },
      { userAgent: 'Diffbot',                      disallow: '/' },
      { userAgent: 'cohere-ai',                    disallow: '/' },
      { userAgent: 'cohere-training-data-crawler', disallow: '/' },
      { userAgent: 'PetalBot',                     disallow: '/' },
      { userAgent: 'Timpibot',                     disallow: '/' },
      { userAgent: 'ImagesiftBot',                 disallow: '/' },
      { userAgent: 'AwarioRssBot',                 disallow: '/' },
      { userAgent: 'AwarioSmartBot',               disallow: '/' },
      { userAgent: 'DataForSeoBot',                disallow: '/' },
      { userAgent: 'SemrushBot',                   disallow: '/' },
      { userAgent: 'AhrefsBot',                    disallow: '/' },
    ],
    sitemap: `${BUSINESS.siteUrl}/sitemap.xml`,
    host: BUSINESS.siteUrl,
  };
}
