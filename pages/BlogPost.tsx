import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Play, Newspaper } from 'lucide-react';
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

      {/* Article body styles — matches site sans-serif system */}
      <style>{`
        .article-body h2 {
          font-family: var(--font-display, system-ui, -apple-system, sans-serif);
          font-size: 1.375rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .article-body h3 {
          font-family: var(--font-display, system-ui, -apple-system, sans-serif);
          font-size: 1.125rem;
          font-weight: 800;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }
        .article-body p {
          color: rgba(255,255,255,0.55);
          font-size: 0.9375rem;
          line-height: 1.75;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        .article-body strong {
          color: rgba(255,255,255,0.8);
          font-weight: 700;
        }
        .article-body em {
          color: rgba(255,255,255,0.5);
        }
        .article-body a {
          color: var(--color-sky-light, #00C2FF);
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
          padding-left: 1rem;
          margin-bottom: 1.25rem;
        }
        .article-body li {
          color: rgba(255,255,255,0.55);
          font-size: 0.9375rem;
          line-height: 1.75;
          margin-bottom: 0.375rem;
          position: relative;
          padding-left: 0.75rem;
          font-weight: 500;
        }
        .article-body li::before {
          content: '';
          position: absolute;
          left: -0.25rem;
          top: 0.65rem;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .article-body hr {
          border: none;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 2rem 0;
        }
        .article-body img {
          border-radius: 0.75rem;
          max-width: 100%;
          margin: 1.5rem 0;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .article-body blockquote {
          border-left: 2px solid rgba(255,255,255,0.15);
          padding: 0.25rem 1.25rem;
          margin: 1.5rem 0;
        }
        .article-body blockquote p {
          color: rgba(255,255,255,0.45);
          font-size: 0.9375rem;
        }
      `}</style>

      <div className="max-w-3xl mx-auto relative z-10">

        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]} />

        {/* Header */}
        <RevealSection>
          <header className="mb-8 md:mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <span className="flex items-center gap-1.5">
                <Newspaper size={11} className="text-sky/50" />
                {post.tags[0] || t('blog.article')}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {formatDate(post.date)}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {post.readTime} {t('blog.minRead')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tighter uppercase leading-[1.1] mb-4">
              {post.title}
            </h1>

            <p className="text-base text-white/45 leading-relaxed font-medium mb-4">
              {post.description}
            </p>

            <div className="h-px w-full bg-white/[0.06]" />
          </header>
        </RevealSection>

        {/* Article Body */}
        <RevealSection delay={0.05}>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </RevealSection>

        {/* Prev / Next */}
        {(prevPost || nextPost) && (
          <RevealSection delay={0.1}>
            <div className="mt-12">
              <div className="h-px w-full bg-white/[0.06] mb-6" />
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 mb-4">{t('blog.continueReading')}</div>
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
                  >
                    <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <ArrowLeft size={11} className="text-white/30 group-hover:text-sky-light transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-0.5">{t('blog.previous')}</span>
                      <span className="block text-xs font-black uppercase tracking-tight text-white/60 group-hover:text-sky-light transition-colors line-clamp-1">{prevPost.title}</span>
                    </div>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
                  >
                    <div className="min-w-0 flex-grow">
                      <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-0.5">{t('blog.next')}</span>
                      <span className="block text-xs font-black uppercase tracking-tight text-white/60 group-hover:text-sky-light transition-colors line-clamp-1">{nextPost.title}</span>
                    </div>
                    <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <ArrowRight size={11} className="text-white/30 group-hover:text-sky-light transition-colors" />
                    </div>
                  </Link>
                ) : <div />}
              </nav>
            </div>
          </RevealSection>
        )}

        {/* CTA */}
        <RevealSection delay={0.15}>
          <div className="mt-12 relative overflow-hidden border border-white/[0.12] rounded-2xl p-6 sm:p-8 text-center">
            <img src={`${import.meta.env.BASE_URL}png/GAMES/flag-frenzy.png`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm pointer-events-none select-none" />
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-white mb-2">
                {t('blog.exploreGames')}
              </h3>
              <p className="text-white/60 text-sm font-medium mb-5 max-w-md mx-auto">
                {t('blog.exploreGamesDesc')}
              </p>
              <Link to="/games">
                <Button variant="primary" size="lg" className="text-base uppercase tracking-widest">
                  {t('blog.playNow')} <Play size={16} fill="currentColor" className="ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="mt-10 md:mt-14">
          <BannerAd slot="9489406693" />
        </RevealSection>
      </div>
    </article>
  );
};

export default BlogPost;
