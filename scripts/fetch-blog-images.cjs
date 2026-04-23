/**
 * Fetches royalty-free blog thumbnails from Pexels and rewrites each post's
 * frontmatter `thumbnail:` to point at the new local image.
 *
 * Setup:
 *   1. Get a free Pexels API key at https://www.pexels.com/api/
 *   2. export PEXELS_API_KEY=your_key_here
 *   3. node scripts/fetch-blog-images.cjs            (all posts, skips done)
 *      node scripts/fetch-blog-images.cjs --force    (re-fetch everything)
 *      node scripts/fetch-blog-images.cjs <slug>     (just one post)
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error('❌ Missing PEXELS_API_KEY. Get one at https://www.pexels.com/api/');
  process.exit(1);
}

const POSTS_DIR = path.join(__dirname, '..', 'blog', 'posts');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'blog-images');
const PUBLIC_PREFIX = '/blog-images';

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const ONLY_SLUG = args.find((a) => !a.startsWith('--'));

// Tags too generic to give good results on their own (the blog is *all* about
// geography, so "geography" itself returns the same top photo for every post).
const GENERIC_TAGS = new Set([
  'education', 'literacy', 'general', 'tips', 'quiz', 'learning',
  'geography', 'world', 'global',
]);

// Only true grammatical stopwords + a few editorial fillers ("youve heard",
// "every lover should know"). Content nouns/verbs ("change", "exist",
// "share") stay in — they make the query unique and Pexels-searchable.
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'is', 'it', 'for', 'on',
  'with', 'why', 'how', 'what', 'are', 'be', 'as', 'at', 'by', 'do', 'this',
  'that', 'youve', 'never', 'heard', 'most', 'case', 'guide', 'beginners',
  'every', 'ever', 'should', 'lover', 'where', 'they', 'their', 'everyone',
]);

/**
 * Build a Pexels search query from a post's metadata.
 * Strategy: SLUG-FIRST — slugs are unique per post, so they produce diverse
 * results. Tags (mostly "geography") are only used as fallback enrichment.
 */
function buildQuery(tags, slug) {
  const slugWords = slug.split('-').filter((w) => !STOPWORDS.has(w) && w.length > 2);

  // Take up to 4 concrete words from the slug — enough signal for Pexels to
  // pick a unique top result, short enough to stay topical.
  if (slugWords.length >= 2) return slugWords.slice(0, 4).join(' ');

  // Slug yielded too few words — supplement with a specific tag.
  const specific = (tags || []).find((t) => !GENERIC_TAGS.has(t));
  if (specific && slugWords.length) return `${specific} ${slugWords[0]}`;
  if (specific) return `${specific} landscape`;
  return slugWords.join(' ') || 'world map';
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`Pexels API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.photos || [];
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processPost(filename) {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);
  const data = parsed.data;
  const slug = data.slug || filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

  if (ONLY_SLUG && slug !== ONLY_SLUG) return { slug, status: 'skipped (filter)' };

  const alreadyMigrated = typeof data.thumbnail === 'string' && data.thumbnail.startsWith(PUBLIC_PREFIX);
  if (alreadyMigrated && !FORCE) return { slug, status: 'skipped (done)' };

  const query = buildQuery(data.tags, slug);
  let photos;
  try {
    photos = await searchPexels(query);
  } catch (err) {
    return { slug, status: `error: ${err.message}` };
  }

  if (!photos.length) {
    // Fallback to a broader query
    try {
      photos = await searchPexels((data.tags && data.tags[0]) || 'world');
    } catch (err) {
      return { slug, status: `error: ${err.message}` };
    }
  }
  if (!photos.length) return { slug, status: 'no results' };

  // Pick randomly from the top 3 — adds variety even when queries collide,
  // and the top 3 are usually all relevant.
  const photo = photos[Math.floor(Math.random() * Math.min(3, photos.length))];
  const imageUrl = photo.src.large; // 940×650 typical, perfect for blog cards
  const imagePath = path.join(IMAGES_DIR, `${slug}.jpg`);

  try {
    await downloadImage(imageUrl, imagePath);
  } catch (err) {
    return { slug, status: `error: ${err.message}` };
  }

  // Rewrite ONLY the `thumbnail:` line — preserves the inline-array YAML style
  // that the SPA's lightweight frontmatter parser (blog/blogData.ts) requires.
  const newThumb = `${PUBLIC_PREFIX}/${slug}.jpg`;
  let newRaw;
  if (/^thumbnail:\s*.+$/m.test(raw)) {
    newRaw = raw.replace(/^thumbnail:\s*.+$/m, `thumbnail: ${newThumb}`);
  } else {
    // Insert after the `image:` line, or before the closing `---` if no image: line.
    newRaw = /^image:\s*.+$/m.test(raw)
      ? raw.replace(/^(image:\s*.+)$/m, `$1\nthumbnail: ${newThumb}`)
      : raw.replace(/^---\s*$([\s\S]*?)^---\s*$/m, (_m, fm) => `---${fm}thumbnail: ${newThumb}\n---`);
  }
  fs.writeFileSync(filePath, newRaw, 'utf-8');

  return { slug, status: `ok (${query} → ${photo.photographer})` };
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).sort();
  console.log(`Found ${files.length} posts. ${FORCE ? '(force re-fetch)' : ''}\n`);

  const results = [];
  for (const f of files) {
    const result = await processPost(f);
    results.push(result);
    const icon = result.status.startsWith('ok') ? '✅' : result.status.startsWith('skip') ? '⏭️ ' : '❌';
    console.log(`${icon} ${result.slug.padEnd(45)} ${result.status}`);
    // Rate-limit politely (Pexels allows 200/hr; this stays well under).
    if (result.status.startsWith('ok')) await sleep(400);
  }

  const ok = results.filter((r) => r.status.startsWith('ok')).length;
  const skipped = results.filter((r) => r.status.startsWith('skip')).length;
  const failed = results.filter((r) => r.status.startsWith('error') || r.status === 'no results').length;
  console.log(`\nDone. ${ok} fetched, ${skipped} skipped, ${failed} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
