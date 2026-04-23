import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Database, Gamepad2, Map, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { VerticalSidebarAd } from '../components/AdSense';

const About: React.FC = () => {
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const sections = [
    { icon: <Database size={16} />, title: 'Country Database', desc: 'Profiles for 195+ countries with capitals, flags, currencies, languages, and population data.', tint: 'bg-sky/10 text-sky-light' },
    { icon: <Gamepad2 size={16} />, title: 'Geography Games', desc: 'Quizzes and map challenges covering capitals, flags, regions, languages, and landmarks.', tint: 'bg-accent/10 text-accent' },
    { icon: <Map size={16} />, title: 'Interactive Map', desc: 'A searchable world map with country details and regional navigation.', tint: 'bg-pink-500/10 text-pink-400' },
    { icon: <BookOpen size={16} />, title: 'Blog', desc: 'Articles on world geography, borders, capitals, and cultural topics.', tint: 'bg-secondary/10 text-secondary' },
  ];

  return (
    <main className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden bg-[#0F172A]" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="About"
        description="ExploreCapitals is a free geography platform with interactive games, a 195+ country database, a world map, and a blog."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'ExploreCapitals',
          url: 'https://explorecapitals.com',
          description: 'Free interactive geography education platform.',
          foundingDate: '2024',
        }}
      />

      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}png/GAMES/map-dash.png')` }}
      />
      {/* Readability overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/55 to-[#0F172A]/95"
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        {/* Hero */}
        <RevealSection className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-6">
            <Compass size={12} className="text-sky-light" />
            <span>About</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tighter uppercase leading-tight mb-6">
            About
          </h1>
          <div className="space-y-4 text-base sm:text-lg text-white/70 leading-relaxed font-medium max-w-2xl">
            <p>
              ExploreCapitals is a free online geography platform. It includes a reference database covering 195+ countries — capitals, flags, currencies, languages, and population figures — alongside an interactive world map, a set of geography games, and a blog with articles on world geography.
            </p>
            <p>
              Everything is accessible without an account. Hosting and development costs are covered by banner ads and optional donations, so there are no paid tiers or gated content.
            </p>
          </div>
        </RevealSection>

        {/* What's Here */}
        <RevealSection className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tighter uppercase leading-none mb-6">
            What's here
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s, i) => (
              <div
                key={s.title}
                className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-xl p-5 transition-all overflow-hidden"
              >
                <span className="absolute top-3 right-4 text-[10px] font-black text-white/15 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div className={`w-10 h-10 rounded-lg ${s.tint} flex items-center justify-center mb-4`}>
                  {s.icon}
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2">{s.title}</h3>
                <p className="text-[13px] text-white/55 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection>
          <div className="relative bg-gradient-to-br from-sky/[0.1] via-white/[0.03] to-accent/[0.08] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-sky/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[10px] font-black text-sky-light uppercase tracking-[0.3em] mb-3">Start here</p>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tighter uppercase leading-tight mb-5">
                Explore the site
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sky/20 hover:bg-sky/30 border border-sky/30 hover:border-sky/50 rounded-xl text-sm font-black text-white uppercase tracking-tight transition-all"
                >
                  <Gamepad2 size={16} className="text-sky-light" />
                  Browse games
                </Link>
                <Link
                  to="/map"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl text-sm font-black text-white uppercase tracking-tight transition-all"
                >
                  <Map size={16} className="text-white/70 group-hover:text-sky-light transition-colors" />
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
