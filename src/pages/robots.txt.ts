import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = async () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_CONFIG.baseUrl}/sitemap.xml
`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
