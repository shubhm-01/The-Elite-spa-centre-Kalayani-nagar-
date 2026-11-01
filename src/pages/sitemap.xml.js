import { S } from '../data/catalog.js';

export const prerender = true;

const site = 'https://the-elite-spa-centre.pages.dev';
const staticPaths = [
  '/',
  '/services/',
  '/offers/',
  '/shop/',
  '/gallery/',
  '/about/',
  '/contact/',
  '/booking/',
  '/privacy/',
  '/terms/'
];

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  })[character]);
}

export function GET() {
  const paths = staticPaths.concat(S.map((service) => '/services/' + service.slug + '/'));
  const entries = paths.map((path) => {
    const loc = escapeXml(new URL(path, site).href);
    return '<url><loc>' + loc + '</loc></url>';
  }).join('');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    entries +
    '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
