/**
 * Blog Build Script
 * Reads markdown files from /blog/posts/, generates static HTML pages in /dist/blog/.
 * Run after `vite build` to add blog pages to the dist output.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'blog');
const SITE_URL = 'https://explorecapitals.com';
const SITE_NAME = 'ExploreCapitals';
const ADSENSE_CLIENT = 'ca-pub-8144074549309997';

// Configure marked for safe HTML output
marked.setOptions({
  gfm: true,
  breaks: true,
});

function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      const html = marked.parse(content);
      return {
        slug: data.slug || filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        dateFormatted: data.date
          ? new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : '',
        author: data.author || SITE_NAME,
        tags: data.tags || [],
        image: data.image || '',
        readTime: data.readTime || Math.ceil(content.split(/\s+/).length / 200),
        html,
        filename,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function articlePage(post, allPosts) {
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/og-image.png`;
  const recentPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(post.title)} | ${SITE_NAME} Blog</title>
  <meta name="description" content="${escAttr(post.description)}" />
  <meta name="author" content="${escAttr(post.author)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph -->
  <meta property="og:title" content="${escAttr(post.title)}" />
  <meta property="og:description" content="${escAttr(post.description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="article:published_time" content="${post.date}" />
  ${post.tags.map((t) => `<meta property="article:tag" content="${escAttr(t)}" />`).join('\n  ')}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escAttr(post.title)}" />
  <meta name="twitter:description" content="${escAttr(post.description)}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <!-- Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/png/STYLE/explorecapitals-globe-favicon-new.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  })}
  </script>

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/png/STYLE/explorecapitals-globe-favicon-new.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/png/STYLE/ExploreCapitalsAppIcon.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />

  <meta name="theme-color" content="#0F172A" />
  <style>${getStyles()}</style>
</head>
<body>
  ${navHtml()}

  <main class="blog-main">
    <article class="blog-article">
      <header class="blog-header">
        <div class="blog-meta">
          <time datetime="${post.date}">${post.dateFormatted}</time>
          <span class="blog-sep">&middot;</span>
          <span>${post.readTime} min read</span>
          ${post.tags.length ? `<span class="blog-sep">&middot;</span><span>${post.tags.map((t) => `<a href="/blog?tag=${encodeURIComponent(t)}" class="blog-tag">${escHtml(t)}</a>`).join(' ')}</span>` : ''}
        </div>
        <h1>${escHtml(post.title)}</h1>
        ${post.description ? `<p class="blog-lead">${escHtml(post.description)}</p>` : ''}
      </header>

      <!-- Ad: after intro -->
      ${adSlot('4817293650')}

      <div class="blog-body prose">
        ${post.html}
      </div>

      <!-- Ad: after article -->
      ${adSlot('2512934803')}
    </article>

    ${recentPosts.length ? `
    <aside class="blog-related">
      <h2>More from the Blog</h2>
      <div class="blog-grid">
        ${recentPosts.map((p) => postCard(p)).join('\n')}
      </div>
    </aside>` : ''}

    <div class="blog-cta">
      <div class="blog-cta-glow"></div>
      <div class="blog-cta-globe" aria-hidden="true"></div>
      <div class="blog-cta-inner">
        <div class="blog-cta-badge">
          <span class="blog-cta-dot"></span>
          <span>Free Geography Games</span>
        </div>
        <h2>Ready to test your knowledge?</h2>
        <p>Put what you just read into practice — quizzes, maps, capitals, and more.</p>
        <a href="/games" class="blog-btn">
          <span>Play</span>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>
        </a>
      </div>
    </div>
  </main>

  ${footerHtml()}
  ${adsenseScript()}
</body>
</html>`;
}

function indexPage(posts) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog | ${SITE_NAME} — Geography Education Articles</title>
  <meta name="description" content="Geography education articles, guides, and insights from ExploreCapitals. Learn about world capitals, maps, flags, and global literacy." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${SITE_URL}/blog" />

  <meta property="og:title" content="${SITE_NAME} Blog" />
  <meta property="og:description" content="Geography education articles, guides, and insights." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE_URL}/blog" />
  <meta property="og:image" content="${SITE_URL}/og-image.png" />

  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    description: 'Geography education articles, guides, and insights.',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
    })),
  })}
  </script>

  <link rel="icon" type="image/png" sizes="32x32" href="/png/STYLE/explorecapitals-globe-favicon-new.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
  <meta name="theme-color" content="#0F172A" />
  <style>${getStyles()}</style>
</head>
<body>
  ${navHtml()}

  <main class="blog-main">
    <header class="blog-index-header">
      <h1>Blog</h1>
      <p>Articles on geography education, world capitals, and global literacy.</p>
    </header>

    ${adSlot('4817293650')}

    <div class="blog-grid">
      ${posts.map((p) => postCard(p)).join('\n')}
    </div>

    ${posts.length === 0 ? '<p class="blog-empty">No articles yet. Check back soon.</p>' : ''}

    ${adSlot('2512934803')}
  </main>

  ${footerHtml()}
  ${adsenseScript()}
</body>
</html>`;
}

function rssFeed(posts) {
  const items = posts.slice(0, 20).map((p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Geography education articles from ExploreCapitals.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

// ── Helpers ────────────────────────────────────────────────────────────

function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

function postCard(p) {
  return `<a href="/blog/${p.slug}" class="blog-card">
  <div class="blog-card-body">
    <time datetime="${p.date}">${p.dateFormatted}</time>
    <h3>${escHtml(p.title)}</h3>
    <p>${escHtml(p.description)}</p>
    <span class="blog-read-more">Read article &rarr;</span>
  </div>
</a>`;
}

function adSlot(slot) {
  return `<div class="blog-ad">
  <ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
</div>`;
}

function adsenseScript() {
  return `<script>
  // Only load AdSense if consent was previously given
  try {
    var consent = localStorage.getItem('ec_cookie_consent');
    if (consent) {
      var prefs = localStorage.getItem('ec_cookie_preferences');
      var parsed = prefs ? JSON.parse(prefs) : { advertising: true };
      if (parsed.advertising) {
        var s = document.createElement('script');
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}';
        s.async = true;
        s.crossOrigin = 'anonymous';
        document.head.appendChild(s);
        s.onload = function() {
          document.querySelectorAll('.adsbygoogle').forEach(function() {
            try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
          });
        };
      }
    }
  } catch(e) {}
</script>`;
}

function navHtml() {
  return `<nav class="blog-nav">
  <div class="blog-nav-inner">
    <a href="/" class="blog-logo">
      <img src="/png/STYLE/explorecapitals-globe-favicon-new.png" alt="ExploreCapitals" width="28" height="28" style="filter: drop-shadow(0 0 4px rgba(255,255,255,0.7));" />
      <span>Explore<span class="blog-logo-accent">Capitals</span></span>
    </a>
    <div class="blog-nav-links">
      <a href="/">Home</a>
      <a href="/games">Games</a>
      <a href="/database">Database</a>
      <a href="/map">Map</a>
      <a href="/blog" class="blog-nav-active">Blog</a>
      <a href="/about">About</a>
    </div>
  </div>
</nav>`;
}

function footerHtml() {
  return `<footer class="blog-footer">
  <div class="blog-footer-inner">
    <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. Free geography education for everyone.</p>
    <div class="blog-footer-links">
      <a href="/">Home</a>
      <a href="/games">Games</a>
      <a href="/database">Database</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
      <a href="/terms">Terms</a>
      <a href="/privacy">Privacy</a>
      <a href="/blog/feed.xml">RSS</a>
    </div>
  </div>
</footer>`;
}

function getStyles() {
  return `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0F172A; color: #e2e8f0; line-height: 1.7; -webkit-font-smoothing: antialiased; }
    a { color: #00C2FF; text-decoration: none; }
    a:hover { text-decoration: underline; }
    img { max-width: 100%; height: auto; }

    .blog-nav { position: sticky; top: 0; z-index: 100; background: rgba(15,23,42,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.75rem 1rem; }
    .blog-nav-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .blog-logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 900; font-size: 1.1rem; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: -0.03em; }
    .blog-logo img { width: 28px; height: 28px; }
    .blog-logo-accent { background: linear-gradient(135deg,#00C2FF,#007AFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .blog-nav-links { display: flex; gap: 1.25rem; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; }
    .blog-nav-links a { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.15s; }
    .blog-nav-links a:hover, .blog-nav-active { color: #00C2FF !important; }
    @media (max-width: 640px) { .blog-nav-links { display: none; } }

    .blog-main { max-width: 760px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
    .blog-header { margin-bottom: 2.5rem; }
    .blog-header h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; color: #fff; line-height: 1.15; letter-spacing: -0.03em; text-transform: uppercase; margin-bottom: 0.75rem; }
    .blog-meta { font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
    .blog-sep { opacity: 0.3; }
    .blog-tag { color: #00C2FF; font-weight: 800; }
    .blog-lead { font-size: 1.15rem; color: rgba(255,255,255,0.55); font-weight: 600; line-height: 1.65; }

    .blog-body { color: rgba(255,255,255,0.75); font-size: 1.05rem; line-height: 1.8; }
    .blog-body h2 { font-size: 1.5rem; font-weight: 900; color: #fff; margin: 2.5rem 0 0.75rem; text-transform: uppercase; letter-spacing: -0.02em; }
    .blog-body h3 { font-size: 1.2rem; font-weight: 800; color: #fff; margin: 2rem 0 0.5rem; }
    .blog-body p { margin-bottom: 1.25rem; }
    .blog-body ul, .blog-body ol { margin: 0 0 1.25rem 1.5rem; }
    .blog-body li { margin-bottom: 0.4rem; }
    .blog-body blockquote { border-left: 3px solid #00C2FF; padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: rgba(0,194,255,0.05); border-radius: 0 0.5rem 0.5rem 0; font-style: italic; color: rgba(255,255,255,0.6); }
    .blog-body code { background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.9em; }
    .blog-body pre { background: rgba(0,0,0,0.3); padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid rgba(255,255,255,0.06); }
    .blog-body a { color: #00C2FF; text-decoration: underline; text-underline-offset: 2px; }
    .blog-body img { border-radius: 0.75rem; margin: 1.5rem 0; }
    .blog-body strong { color: #fff; font-weight: 700; }

    .blog-ad { margin: 2rem 0; min-height: 90px; }

    .blog-related { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06); }
    .blog-related h2 { font-size: 1.25rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 1.25rem; }

    .blog-index-header { margin-bottom: 2.5rem; }
    .blog-index-header h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.5rem; }
    .blog-index-header p { color: rgba(255,255,255,0.4); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; }

    .blog-grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
    @media (min-width: 640px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }

    .blog-card { display: block; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem; text-decoration: none; transition: background 0.2s, border-color 0.2s; }
    .blog-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(0,194,255,0.2); text-decoration: none; }
    .blog-card time { font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.15em; }
    .blog-card h3 { font-size: 1.1rem; font-weight: 900; color: #fff; margin: 0.5rem 0; line-height: 1.3; text-transform: uppercase; letter-spacing: -0.02em; }
    .blog-card p { font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 500; line-height: 1.5; margin-bottom: 0.75rem; }
    .blog-read-more { font-size: 0.7rem; font-weight: 800; color: #00C2FF; text-transform: uppercase; letter-spacing: 0.15em; }

    .blog-cta { position: relative; margin-top: 3rem; padding: 3rem 1.5rem; background: linear-gradient(135deg, rgba(0,194,255,0.14) 0%, rgba(0,100,255,0.08) 50%, rgba(15,23,42,0.6) 100%); border: 1px solid rgba(0,194,255,0.22); border-radius: 1.5rem; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.35), inset 0 0 80px rgba(0,194,255,0.06); }
    .blog-cta-glow { position: absolute; top: -30%; left: -10%; width: 60%; height: 160%; background: radial-gradient(ellipse at center, rgba(0,194,255,0.22) 0%, transparent 65%); filter: blur(40px); pointer-events: none; z-index: 0; }
    .blog-cta-globe { position: absolute; top: 50%; right: -60px; width: 320px; height: 320px; transform: translateY(-50%); background-image: url('/png/STYLE/explorecapitals-globe-favicon-new.png'); background-size: contain; background-repeat: no-repeat; background-position: center; opacity: 0.14; pointer-events: none; z-index: 0; filter: drop-shadow(0 0 40px rgba(0,194,255,0.4)); }
    .blog-cta-inner { position: relative; z-index: 1; text-align: center; }
    .blog-cta-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,194,255,0.14); border: 1px solid rgba(0,194,255,0.3); border-radius: 999px; padding: 0.35rem 0.9rem; margin-bottom: 1rem; font-size: 0.65rem; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(139,210,255,0.95); }
    .blog-cta-dot { width: 6px; height: 6px; border-radius: 50%; background: #00C2FF; box-shadow: 0 0 10px #00C2FF; animation: blog-cta-pulse 2s ease-in-out infinite; }
    @keyframes blog-cta-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(0.8); } }
    .blog-cta h2 { font-size: 1.75rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 0.75rem; line-height: 1; text-shadow: 0 2px 20px rgba(0,194,255,0.2); }
    .blog-cta p { color: rgba(255,255,255,0.65); font-weight: 600; margin-bottom: 1.75rem; max-width: 32rem; margin-left: auto; margin-right: auto; }
    .blog-btn { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.95rem 2.75rem; background: linear-gradient(180deg, #BFE6FF 0%, #00C2FF 48%, #007AFF 52%, #00C2FF 100%); border: 2px solid rgba(255,255,255,0.6); color: #fff; font-weight: 900; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.2em; border-radius: 999px; text-decoration: none; transition: transform 0.15s ease-out, filter 0.15s ease-out, box-shadow 0.15s ease-out; box-shadow: 0 10px 30px rgba(0,0,0,0.25), 0 0 40px rgba(0,194,255,0.35); position: relative; }
    .blog-btn:hover { filter: brightness(1.1); transform: translateY(-2px); text-decoration: none; box-shadow: 0 14px 40px rgba(0,0,0,0.3), 0 0 50px rgba(0,194,255,0.5); }
    .blog-btn svg { flex-shrink: 0; }

    .blog-empty { text-align: center; color: rgba(255,255,255,0.3); padding: 4rem 0; font-weight: 600; }

    .blog-footer { margin-top: 4rem; border-top: 1px solid rgba(255,255,255,0.06); padding: 2rem 1.25rem; }
    .blog-footer-inner { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
    .blog-footer p { font-size: 0.75rem; color: rgba(255,255,255,0.25); font-weight: 600; }
    .blog-footer-links { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
    .blog-footer-links a { font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; }
    .blog-footer-links a:hover { color: #00C2FF; }
  `;
}

// ── Main ──────────────────────────────────────────────────────────────

function build() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    console.log('[blog] No posts found in blog/posts/. Skipping blog build.');
    return;
  }

  // Ensure output directory exists
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // Generate RSS feed
  fs.writeFileSync(path.join(DIST_DIR, 'feed.xml'), rssFeed(posts), 'utf-8');
  console.log('[blog] feed.xml');



  // Append blog URLs to sitemap
  const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const blogEntries = posts
      .map((p) => `  <url>\n    <loc>${SITE_URL}/blog/${p.slug}</loc>\n    <lastmod>${p.date.split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
      .join('\n');
    const blogIndex = `  <url>\n    <loc>${SITE_URL}/blog</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    sitemap = sitemap.replace('</urlset>', `${blogIndex}\n${blogEntries}\n</urlset>`);
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
    console.log('[blog] Updated sitemap.xml');
  }

  console.log(`[blog] Done. ${posts.length} article(s) built.`);
}

build();
