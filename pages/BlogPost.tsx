import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Play, Newspaper } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';
import { BannerAd } from '../components/AdSense';
import { getPostBySlug, blogPosts } from '../blog/blogData';

/** Minimal markdown → HTML converter for blog articles */
function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>');

  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  const blocks = html.split('\n\n');
  html = blocks
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h[1-6]|ul|ol|li|hr|blockquote|div|img|pre|table)/.test(trimmed)) return trimmed;
      if (trimmed.startsWith('<') && trimmed.endsWith('>')) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const htmlContent = useMemo(() => {
    if (!post) return '';
    return markdownToHtml(post.content);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  return (
    <article className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title={post.title}
        description={post.description}
        keywords={post.tags.join(', ')}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { '@type': 'Organization', name: post.author },
          publisher: { '@type': 'Organization', name: 'ExploreCapitals', url: 'https://explorecapitals.com' },
          mainEntityOfPage: `https://explorecapitals.com/blog/${post.slug}`,
        }}
      />

      {/* Scoped article styles — WSJ-inspired editorial typography */}
      <style>{`
        .article-body {
          font-family: Georgia, 'Times New Roman', serif;
        }
        .article-body h2 {
          font-family: var(--font-display, system-ui, -apple-system, sans-serif);
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
          margin-top: 2.75rem;
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .article-body h3 {
          font-family: var(--font-display, system-ui, -apple-system, sans-serif);
          font-size: 1.175rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-top: 2.25rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .article-body p {
          color: rgba(255,255,255,0.72);
          font-size: 1.0625rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          letter-spacing: 0.005em;
        }
        .article-body strong {
          color: rgba(255,255,255,0.9);
          font-weight: 700;
        }
        .article-body em {
          color: rgba(255,255,255,0.65);
          font-style: italic;
        }
        .article-body a {
          color: #00C2FF;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(0,194,255,0.3);
          transition: text-decoration-color 0.2s;
        }
        .article-body a:hover {
          text-decoration-color: rgba(0,194,255,0.7);
        }
        .article-body ul {
          list-style: none;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .article-body li {
          color: rgba(255,255,255,0.72);
          font-size: 1.0625rem;
          line-height: 1.8;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 0.875rem;
        }
        .article-body li::before {
          content: '';
          position: absolute;
          left: -0.25rem;
          top: 0.7rem;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }
        .article-body hr {
          border: none;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 2.5rem 0;
        }
        .article-body img {
          border-radius: 0.75rem;
          max-width: 100%;
          margin: 2rem 0;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .article-body blockquote {
          border-left: 3px solid rgba(255,255,255,0.2);
          padding: 0.5rem 1.5rem;
          margin: 2rem 0;
        }
        .article-body blockquote p {
          font-style: italic;
          color: rgba(255,255,255,0.6);
          font-size: 1.125rem;
        }
        .article-body > p:first-child::first-letter {
          float: left;
          font-family: var(--font-display, system-ui, -apple-system, sans-serif);
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 0.85;
          padding-right: 0.5rem;
          padding-top: 0.25rem;
          color: white;
        }
        @media (min-width: 640px) {
          .article-body h2 { font-size: 1.625rem; }
          .article-body p, .article-body li { font-size: 1.125rem; }
          .article-body blockquote p { font-size: 1.1875rem; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* ── Breadcrumbs ── */}
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]} />

        {/* ── Article Header ── */}
        <RevealSection>
          <header className="mb-10 md:mb-12">
            {/* Category + Meta line */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              <span className="flex items-center gap-1.5">
                <Newspaper size={11} className="text-sky/60" />
                {post.tags[0] || t('blog.article')}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Calendar size={11} className="text-white/25" />
                {formatDate(post.date)}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="text-white/25" />
                {post.readTime} {t('blog.minRead')}
              </span>
            </div>

            {/* Title — sentence case, tight leading, editorial weight */}
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-black text-white tracking-tight leading-[1.12] mb-4">
              {post.title}
            </h1>

            {/* Description / Deck */}
            <p className="text-lg md:text-xl text-white/55 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              {post.description}
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-white/40">
              <User size={13} className="text-white/25" />
              <span>By {post.author}</span>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-white/10 mt-6" />
          </header>
        </RevealSection>

        {/* ── Hero Thumbnail ── */}
        {post.thumbnail && (
          <RevealSection delay={0.05} className="mb-10 md:mb-12">
            <div className="relative rounded-xl overflow-hidden border border-white/8">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
                loading="eager"
              />
            </div>
          </RevealSection>
        )}

        {/* ── Article Body ── */}
        <RevealSection delay={post.thumbnail ? 0.1 : 0.05}>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </RevealSection>

        {/* ── Prev / Next Navigation ── */}
        {(prevPost || nextPost) && (
          <RevealSection delay={0.1}>
            <div className="mt-14">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-sky/20 to-transparent mb-8" />
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">{t('blog.continueReading')}</div>
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-sky/20 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-glossy-gradient opacity-[0.06] pointer-events-none rounded-2xl" />
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center relative z-10 group-hover:border-sky/30 transition-colors duration-300">
                      <ArrowLeft size={12} className="text-white/40 group-hover:text-sky-light transition-colors" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/25 mb-0.5">{t('blog.previous')}</span>
                      <span className="block text-xs font-black uppercase tracking-tight text-white/80 group-hover:text-sky-light transition-colors leading-snug line-clamp-1">{prevPost.title}</span>
                    </div>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-sky/20 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-glossy-gradient opacity-[0.06] pointer-events-none rounded-2xl" />
                    <div className="relative z-10 min-w-0 flex-grow">
                      <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/25 mb-0.5 ">{t('blog.next')}</span>
                      <span className="block text-xs font-black uppercase tracking-tight text-white/80 group-hover:text-sky-light transition-colors leading-snug line-clamp-1">{nextPost.title}</span>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center relative z-10 group-hover:border-sky/30 transition-colors duration-300">
                      <ArrowRight size={12} className="text-white/40 group-hover:text-sky-light transition-colors" />
                    </div>
                  </Link>
                ) : <div />}
              </nav>
            </div>
          </RevealSection>
        )}

        {/* ── CTA ── */}
        <RevealSection delay={0.15}>
          <div className="mt-14 relative bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-glossy-gradient opacity-[0.06] pointer-events-none rounded-3xl" />
            {/* Ambient glow */}
            <div className="absolute top-[-30%] left-[20%] w-[60%] h-[60%] rounded-full bg-sky/[0.06] blur-3xl pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white mb-3 relative z-10 drop-shadow-md">
              {t('blog.exploreGames')}
            </h3>
            <p className="text-white/50 text-sm sm:text-base font-medium mb-6 max-w-md mx-auto relative z-10">
              {t('blog.exploreGamesDesc')}
            </p>
            <div className="relative z-10">
              <Link to="/games">
                <Button variant="primary" size="lg" className="text-lg uppercase tracking-widest">
                  {t('blog.playNow')} <Play size={18} fill="currentColor" className="ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </RevealSection>

        {/* Ad slot */}
        <RevealSection className="mt-12 md:mt-16">
          <BannerAd slot="9489406693" />
        </RevealSection>
      </div>
    </article>
  );
};

export default BlogPost;
