import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, Newspaper, Globe2, Map, Flag, Landmark, BookMarked } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';
import { BannerAd } from '../components/AdSense';
import { blogPosts, BlogPost } from '../blog/blogData';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

/** Tag → gradient strip color */
const TAG_COLORS: Record<string, string> = {
  education: 'from-sky via-primary to-sky',
  geography: 'from-sky via-accent to-sky',
  capitals: 'from-primary via-sky to-primary',
  memory: 'from-accent via-sky to-accent',
  maps: 'from-sky-light via-sky to-primary',
  cartography: 'from-sky-light via-sky to-primary',
  flags: 'from-warning via-amber-400 to-warning',
  vexillology: 'from-warning via-amber-400 to-warning',
  borders: 'from-accent via-emerald-400 to-accent',
  history: 'from-secondary via-purple-400 to-secondary',
  politics: 'from-secondary via-sky to-secondary',
  countries: 'from-sky via-primary to-sky',
  trade: 'from-accent via-sky to-accent',
  names: 'from-secondary via-primary to-secondary',
  misconceptions: 'from-warning via-sky to-warning',
  default: 'from-sky via-primary to-sky',
};

/** Tag → fallback gradient for cards without thumbnails */
const TAG_BG_GRADIENTS: Record<string, string> = {
  education: 'from-sky/20 via-primary/10 to-accent/5',
  geography: 'from-sky/15 via-accent/10 to-primary/5',
  capitals: 'from-primary/20 via-sky/10 to-sky/5',
  maps: 'from-sky-light/15 via-sky/10 to-primary/10',
  cartography: 'from-sky-light/15 via-sky/10 to-primary/10',
  flags: 'from-warning/15 via-amber-400/10 to-sky/5',
  borders: 'from-accent/15 via-sky/10 to-primary/5',
  history: 'from-secondary/15 via-purple-400/10 to-sky/5',
  politics: 'from-secondary/15 via-sky/10 to-primary/5',
  countries: 'from-sky/15 via-primary/10 to-accent/5',
  default: 'from-sky/15 via-primary/10 to-accent/5',
};

/** Tag → fallback icon for cards without thumbnails */
const TAG_ICONS: Record<string, React.ReactNode> = {
  education: <BookOpen size={28} />,
  geography: <Globe2 size={28} />,
  capitals: <Landmark size={28} />,
  maps: <Map size={28} />,
  cartography: <Map size={28} />,
  flags: <Flag size={28} />,
  borders: <Globe2 size={28} />,
  history: <BookMarked size={28} />,
  countries: <Globe2 size={28} />,
  default: <BookOpen size={28} />,
};

const getTagGradient = (tags: string[]): string => {
  for (const tag of tags) if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  return TAG_COLORS.default;
};
const getTagBgGradient = (tags: string[]): string => {
  for (const tag of tags) if (TAG_BG_GRADIENTS[tag]) return TAG_BG_GRADIENTS[tag];
  return TAG_BG_GRADIENTS.default;
};
const getTagIcon = (tags: string[]): React.ReactNode => {
  for (const tag of tags) if (TAG_ICONS[tag]) return TAG_ICONS[tag];
  return TAG_ICONS.default;
};

/** Thumbnail image with gradient overlay, or CSS gradient fallback with icon */
const CardThumbnail: React.FC<{ post: BlogPost; height?: string }> = ({ post, height = 'h-40 sm:h-44' }) => {
  if (post.thumbnail) {
    return (
      <div className={`relative ${height} shrink-0 overflow-hidden`}>
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/30 to-transparent" />
      </div>
    );
  }

  // CSS gradient fallback
  return (
    <div className={`relative ${height} shrink-0 overflow-hidden bg-gradient-to-br ${getTagBgGradient(post.tags)}`}>
      {/* Decorative glow blobs */}
      <div className="absolute top-[10%] right-[10%] w-[50%] h-[60%] rounded-full bg-sky/[0.06] blur-3xl" />
      <div className="absolute bottom-[10%] left-[15%] w-[40%] h-[50%] rounded-full bg-primary/[0.04] blur-2xl" />
      {/* Centered icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-sky/30 shadow-[inset_-3px_-3px_10px_rgba(255,255,255,0.08),inset_3px_3px_6px_rgba(255,255,255,0.04)]">
          <div className="absolute inset-0 rounded-full bg-glossy-gradient opacity-15" />
          <span className="relative z-10">{getTagIcon(post.tags)}</span>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
    </div>
  );
};

const Blog: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="Blog"
        description="Articles on geography education, world capitals, maps, flags, and global literacy. Learn about the world through engaging stories and guides."
        keywords="geography blog, world capitals articles, map reading guide, flag identification, geography education"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Geography Blog',
          description: 'Articles on geography education, world capitals, maps, flags, and global literacy.',
          url: 'https://explorecapitals.com/blog',
          isPartOf: { '@type': 'WebSite', name: 'ExploreCapitals', url: 'https://explorecapitals.com' },
        }}
      />

      <style>{`
        .blog-glow h1, .blog-glow h2 { text-shadow: 0 0 40px rgba(0,194,255,0.15), 0 0 80px rgba(0,194,255,0.08); }
        .blog-glow-card { box-shadow: 0 0 30px rgba(0,194,255,0.08), 0 0 60px rgba(0,194,255,0.04); }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10 blog-glow">

        {/* ── Hero ── */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

        <RevealSection className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky/30 border border-white/40 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
            <Newspaper size={12} className="relative z-10 text-sky-light" />
            <span className="relative z-10 drop-shadow-md">{t('blog.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-3 md:mb-4 tracking-tighter uppercase leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            {t('blog.title')}<br className="hidden sm:block" />{' '}
            <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">{t('blog.titleAccent')}</span>
          </h1>

          <p className="text-white/70 text-lg font-bold uppercase tracking-wide drop-shadow-md max-w-2xl">
            {t('blog.subtitle')}
          </p>
        </RevealSection>

        {/* ── Featured Article ── */}
        {featured && (
          <RevealSection className="mb-10 md:mb-14" delay={0.05}>
            <Link
              to={`/blog/${featured.slug}`}
              className="group block relative bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:bg-white/[0.06] hover:border-sky/20 transition-all duration-500 blog-glow-card shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]"
            >
              <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-3xl" />

              <div className="grid md:grid-cols-[1.2fr_1fr] min-h-[280px] md:min-h-[320px]">
                {/* Content side */}
                <div className="p-6 sm:p-8 md:p-10 relative z-10 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky/25 border border-sky/40 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-sky-light relative overflow-hidden">
                      <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
                      <span className="relative z-10">{t('blog.featured')}</span>
                    </span>
                    {featured.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-1 bg-white/[0.06] border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-white/40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
                        <span className="relative z-10">{tag}</span>
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 tracking-tighter uppercase leading-[1.1] group-hover:text-sky-light transition-colors duration-300 drop-shadow-md">
                    {featured.title}
                  </h2>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-5 max-w-xl font-medium">
                    {featured.description}
                  </p>

                  <div className="flex items-center gap-5 text-white/30 text-[10px] font-black uppercase tracking-[0.15em] mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-sky/50" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} className="text-sky/50" />
                      {featured.readTime} {t('blog.minRead')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sky-light text-[11px] font-black uppercase tracking-[0.2em] group-hover:gap-3 transition-all duration-300">
                    {t('blog.readArticle')} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Thumbnail side */}
                <div className="relative overflow-hidden order-1 md:order-2 h-48 md:h-auto">
                  {featured.thumbnail ? (
                    <>
                      <img
                        src={featured.thumbnail}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0F172A]/20 to-[#0F172A]/60 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 to-transparent md:hidden" />
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getTagBgGradient(featured.tags)} flex items-center justify-center`}>
                      <div className="absolute top-[10%] right-[5%] w-[70%] h-[70%] rounded-full bg-sky/[0.08] blur-3xl" />
                      <div className="absolute bottom-[15%] left-[10%] w-[50%] h-[50%] rounded-full bg-primary/[0.06] blur-3xl" />
                      <div className="relative w-24 h-24 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.1),inset_4px_4px_8px_rgba(255,255,255,0.05)]">
                        <div className="absolute inset-0 rounded-full bg-glossy-gradient opacity-20" />
                        <BookOpen size={36} className="text-sky/40 relative z-10" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </RevealSection>
        )}

        {/* ── Article Grid ── */}
        {rest.length > 0 && (
          <RevealSection delay={0.1}>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-8">
              {t('blog.allArticles')}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {rest.map((post, i) => (
                <RevealSection key={post.slug} delay={0.04 * i} className="h-full">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group relative flex flex-col h-full bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                  >
                    <div className="absolute inset-0 bg-glossy-gradient opacity-[0.07] pointer-events-none rounded-2xl" />

                    {/* Thumbnail */}
                    <CardThumbnail post={post} />

                    {/* Decorative top gradient strip (sits below thumbnail) */}
                    <div className={`h-[2px] w-full bg-gradient-to-r ${getTagGradient(post.tags)} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />

                    <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-10">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 bg-white/[0.06] border border-white/10 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white/35 relative overflow-hidden">
                            <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
                            <span className="relative z-10">{tag}</span>
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-black text-white mb-2 tracking-tight uppercase leading-tight group-hover:text-sky-light transition-colors duration-300 drop-shadow-sm">
                        {post.title}
                      </h3>

                      <p className="text-white/40 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 font-medium">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between text-white/25 text-[10px] font-black uppercase tracking-[0.15em] mt-auto pt-3 border-t border-white/[0.06]">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={10} className="text-sky/40" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={10} className="text-sky/40" />
                          {post.readTime} {t('blog.min')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        )}

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <BookOpen size={32} className="text-white/20" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white/50 mb-2">{t('blog.noArticles')}</h2>
            <p className="text-white/30 text-sm font-medium">{t('blog.noArticlesDesc')}</p>
          </div>
        )}

        <RevealSection className="mt-12 md:mt-16">
          <BannerAd slot="9489406693" />
        </RevealSection>
      </div>
    </div>
  );
};

export default Blog;
