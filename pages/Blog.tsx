import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, Shuffle } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealSection from "../components/RevealSection";
import { useLayout } from "../context/LayoutContext";
import { useTranslation } from "../context/LocaleContext";
import { BannerAd } from "../components/AdSense";
import { blogPosts } from "../blog/blogData";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Blog: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const POSTS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const visiblePosts = blogPosts.slice(0, visibleCount);
  const hasMore = visibleCount < blogPosts.length;

  const handleRandomPost = useCallback(() => {
    if (blogPosts.length === 0) return;
    const randomPost = blogPosts[Math.floor(Math.random() * blogPosts.length)];
    navigate(`/blog/${randomPost.slug}`);
  }, [navigate]);

  return (
    <div
      className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 64px), 64px)" }}
    >
      <SEO
        title="Blog"
        description="Articles on geography education, world capitals, maps, flags, and global literacy."
        keywords="geography blog, world capitals articles, map reading guide, flag identification, geography education"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Geography Blog",
          description:
            "Articles on geography education, world capitals, maps, flags, and global literacy.",
          url: "https://explorecapitals.com/blog",
          isPartOf: {
            "@type": "WebSite",
            name: "ExploreCapitals",
            url: "https://explorecapitals.com",
          },
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />

        {/* Header */}
        <RevealSection className="mb-6 md:mb-8">
          <div className="flex flex-col items-start md:flex-row md:items-end justify-between gap-4 md:gap-4 w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text tracking-tight leading-none">
              Blog
            </h1>
            <button
              onClick={handleRandomPost}
              className="flex items-center justify-center gap-3 px-6 py-3.5 bg-elevated border border-border hover:bg-accent-soft hover:border-primary/25 rounded-2xl text-text shadow-premium transition-all duration-300 group shrink-0 md:mb-4"
              title="Random Blog Post"
              aria-label="Read a random blog post"
            >
              <Shuffle
                size={18}
                className="text-primary group-hover:rotate-12 transition-transform"
              />
              <span className="font-semibold uppercase text-[11px] tracking-wide">
                RANDOM BLOG
              </span>
            </button>
          </div>
        </RevealSection>

        {/* Article Grid */}
        <RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {visiblePosts.map((post, i) => (
              <RevealSection
                key={post.slug}
                delay={0.04 * Math.min(i, 8)}
                className="h-full"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group relative flex flex-col h-full bg-elevated border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:-translate-y-1 transition-all duration-500 shadow-premium"
                >
                  {post.thumbnail && (
                    <div className="w-full h-48 sm:h-52 overflow-hidden shrink-0 border-b border-border">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 bg-accent-soft border border-border rounded-xl text-[8px] font-semibold uppercase tracking-wide text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-display font-black text-text mb-2 tracking-tight uppercase leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted text-sm leading-relaxed mb-4 flex-grow line-clamp-3 font-medium">
                      {post.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-muted text-[10px] font-semibold uppercase tracking-wide mt-auto pt-3 border-t border-border">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={10} className="text-primary/50" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={10} className="text-primary/50" />
                        {post.readTime} {t("blog.min")}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-10 md:mt-14">
              <button
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                className="group relative px-8 py-3 bg-elevated border border-border rounded-xl text-[11px] font-semibold uppercase tracking-wide text-muted hover:text-text hover:bg-accent-soft hover:border-primary/25 shadow-premium transition-all duration-300"
              >
                Load More ({blogPosts.length - visibleCount})
              </button>
            </div>
          )}
        </RevealSection>

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-black uppercase tracking-tight text-muted mb-2">
              {t("blog.noArticles")}
            </h2>
            <p className="text-muted text-sm font-medium">
              {t("blog.noArticlesDesc")}
            </p>
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
