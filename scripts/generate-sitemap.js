/**
 * Generates sitemap.xml from the actual country/territory/de-facto data.
 * Run: npx tsx scripts/generate-sitemap.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ── Slug helper (mirrors utils/slug.ts) ──
const toSlug = (name) => name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
// ── Import country data directly ──
// We read the raw TS files and extract names with regex since these are
// plain object arrays — avoids needing the full Vite/React build chain.
function extractNames(filePath) {
    const src = fs.readFileSync(filePath, 'utf-8');
    const names = [];
    // Handle escaped single-quotes inside names (e.g. 'Côte d\'Ivoire')
    const regex = /name:\s*'((?:[^'\\]|\\.)*)'/g;
    let match;
    while ((match = regex.exec(src)) !== null) {
        // Unescape backslash-escaped characters (e.g. \' → ')
        names.push(match[1].replace(/\\(.)/g, '$1'));
    }
    return names;
}
const root = path.resolve(__dirname, '..');
const countries = extractNames(path.join(root, 'constants.ts'));
const territories = extractNames(path.join(root, 'data', 'territories.ts'));
const deFacto = extractNames(path.join(root, 'data', 'deFacto.ts'));
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
// ── Static pages ──
const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/games', changefreq: 'weekly', priority: '0.9' },
    { loc: '/database', changefreq: 'weekly', priority: '0.9' },
    { loc: '/map', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
    { loc: '/about', changefreq: 'monthly', priority: '0.7' },
    { loc: '/premium', changefreq: 'monthly', priority: '0.6' },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
];
// ── Blog posts ──
const postsDir = path.join(root, 'blog', 'posts');
const blogPosts = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
    const src = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const slugMatch = src.match(/slug:\s*([^\n]+)/);
    if (slugMatch)
        return slugMatch[1].trim();
    return file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
});
// ── Game pages ──
const freeGames = [
    'capital-quiz', 'map-dash', 'flag-frenzy', 'know-your-neighbor',
    'population-pursuit', 'global-detective', 'capital-connection',
    'region-roundup', 'landmark-legend',
];
const premiumGames = [
    'territory-titans', 'area-ace', 'currency-craze',
    'language-legend', 'time-zone-trekker', 'driving-direction',
];
// ── Build XML ──
const BASE = 'https://explorecapitals.com';
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- ═══ Main Pages ═══ -->
`;
for (const p of staticPages) {
    xml += `  <url>
    <loc>${BASE}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>\n`;
}
xml += `\n  <!-- ═══ Free Games (${freeGames.length}) ═══ -->\n`;
for (const g of freeGames) {
    xml += `  <url>
    <loc>${BASE}/games/${g}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}
xml += `\n  <!-- ═══ Premium Games (${premiumGames.length}) ═══ -->\n`;
for (const g of premiumGames) {
    xml += `  <url>
    <loc>${BASE}/games/${g}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}
xml += `\n  <!-- ═══ Sovereign Nations (${countries.length}) ═══ -->\n`;
for (const name of countries) {
    xml += `  <url>
    <loc>${BASE}/country/${toSlug(name)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}
xml += `\n  <!-- ═══ Blog Posts (${blogPosts.length}) ═══ -->\n`;
for (const slug of blogPosts) {
    xml += `  <url>
    <loc>${BASE}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}
xml += `\n  <!-- ═══ Territories (${territories.length}) ═══ -->\n`;
for (const name of territories) {
    xml += `  <url>
    <loc>${BASE}/country/${toSlug(name)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
}
xml += `\n  <!-- ═══ De Facto States (${deFacto.length}) ═══ -->\n`;
for (const name of deFacto) {
    xml += `  <url>
    <loc>${BASE}/country/${toSlug(name)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
}
xml += `</urlset>\n`;
// ── Write to public/ (source) and docs/ (build output) ──
const publicPath = path.join(root, 'public', 'sitemap.xml');
const docsPath = path.join(root, 'docs', 'sitemap.xml');
fs.writeFileSync(publicPath, xml, 'utf-8');
fs.writeFileSync(docsPath, xml, 'utf-8');
const totalUrls = staticPages.length + freeGames.length + premiumGames.length
    + countries.length + territories.length + deFacto.length;
console.log(`✅ Sitemap generated with ${totalUrls} URLs`);
console.log(`   ${staticPages.length} static pages`);
console.log(`   ${freeGames.length + premiumGames.length} game pages`);
console.log(`   ${countries.length} sovereign nations`);
console.log(`   ${territories.length} territories`);
console.log(`   ${deFacto.length} de facto states`);
console.log(`\n   Written to:\n   → ${publicPath}\n   → ${docsPath}`);
