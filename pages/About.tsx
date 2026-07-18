import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Compass, Database, Gamepad2, Map, BookOpen } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealSection from "../components/RevealSection";
import { useLayout } from "../context/LayoutContext";
import { VerticalSidebarAd } from "../components/AdSense";

const About: React.FC = () => {
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const sections = [
    {
      icon: <Database size={16} />,
      title: "Country Database",
      desc: "Profiles for 195+ countries with capitals, flags, currencies, languages, and population data.",
      tint: "bg-accent-soft text-primary",
    },
    {
      icon: <Gamepad2 size={16} />,
      title: "Geography Games",
      desc: "Quizzes and map challenges covering capitals, flags, regions, languages, and landmarks.",
      tint: "bg-accent-soft text-primary",
    },
    {
      icon: <Map size={16} />,
      title: "Interactive Map",
      desc: "A searchable world map with country details and regional navigation.",
      tint: "bg-accent-soft text-primary",
    },
    {
      icon: <BookOpen size={16} />,
      title: "Blog",
      desc: "Articles on world geography, borders, capitals, and cultural topics.",
      tint: "bg-accent-soft text-primary",
    },
  ];

  return (
    <main
      className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 64px), 64px)" }}
    >
      <SEO
        title="About"
        description="ExploreCapitals is a free geography platform with interactive games, a 195+ country database, a world map, and a blog."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ExploreCapitals",
          url: "https://explorecapitals.com",
          description: "Free interactive geography education platform.",
          foundingDate: "2024",
        }}
      />

      {/* Subtle map texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}png/GAMES/map-dash.png')`,
        }}
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        {/* Hero */}
        <RevealSection className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent-soft border border-border rounded-xl text-[9px] font-semibold uppercase tracking-wide text-primary mb-6">
            <Compass size={12} className="text-primary" />
            <span>About</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text tracking-tight leading-tight mb-6">
            About
          </h1>
          <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed font-medium max-w-2xl">
            <p>
              ExploreCapitals is a free online geography platform. It includes a
              reference database covering 195+ countries — capitals, flags,
              currencies, languages, and population figures — alongside an
              interactive world map, a set of geography games, and a blog with
              articles on world geography.
            </p>
            <p>
              Everything is accessible without an account. Hosting and
              development costs are covered by banner ads and optional
              donations, so there are no paid tiers or gated content.
            </p>
          </div>
        </RevealSection>

        {/* What's Here */}
        <RevealSection className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text tracking-tight mb-6">
            What's here
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s, i) => (
              <div
                key={s.title}
                className="group relative bg-elevated hover:bg-accent-soft/40 border border-border hover:border-primary/20 rounded-xl p-5 shadow-premium transition-all overflow-hidden"
              >
                <span className="absolute top-3 right-4 text-[10px] font-semibold text-muted/40 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`w-10 h-10 rounded-lg ${s.tint} flex items-center justify-center mb-4`}
                >
                  {s.icon}
                </div>
                <h3 className="text-sm font-semibold text-text mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] text-muted font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection>
          <div className="relative bg-elevated border border-border rounded-2xl p-6 sm:p-8 shadow-premium overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-primary tracking-wide mb-3">
                Start here
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-text tracking-tight leading-tight mb-5">
                Explore the site
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover rounded-xl text-sm font-semibold text-white transition-all"
                >
                  <Gamepad2 size={16} />
                  Browse games
                </Link>
                <Link
                  to="/map"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-elevated hover:bg-accent-soft border border-border hover:border-primary/25 rounded-xl text-sm font-semibold text-text transition-all"
                >
                  <Map
                    size={16}
                    className="text-muted group-hover:text-primary transition-colors"
                  />
                  Open the map
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

export default About;
