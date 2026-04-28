import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Compass, Play } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';
import { VerticalSidebarAd } from '../components/AdSense';

const Home: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();

  useEffect(() => {
    setPageLoading(false);
    // Dismiss the HTML splash-screen loader (prevents double-spinner)
    (window as any).__dismissLoader?.();
  }, [setPageLoading]);

  return (
    <main className="relative flex-grow bg-transparent w-full home-glow overflow-x-hidden">
      <style>{`
        .home-glow h1, .home-glow h2 {
          text-shadow: 0 0 40px rgba(0,194,255,0.15), 0 0 80px rgba(0,194,255,0.08);
        }
        .home-glow .glow-badge {
          box-shadow: 0 0 15px rgba(0,194,255,0.15), 0 0 40px rgba(0,194,255,0.06);
        }
        .home-glow .glow-bubble {
          box-shadow: 0 0 20px rgba(0,194,255,0.2), 0 0 50px rgba(0,194,255,0.08), inset -4px -4px 12px rgba(255,255,255,0.25), inset 4px 4px 8px rgba(255,255,255,0.1);
        }
        @keyframes aurora-drift {
          0%, 100% { transform: translate(-5%, -5%) rotate(0deg) scale(1); }
          33%      { transform: translate(5%, 2%) rotate(120deg) scale(1.12); }
          66%      { transform: translate(-2%, 5%) rotate(240deg) scale(0.95); }
        }
        .home-aurora { animation: aurora-drift 40s ease-in-out infinite; }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.9; }
        }
        .home-stars { animation: star-twinkle 6s ease-in-out infinite; }
        @keyframes gutter-breathe-l {
          0%, 100% { opacity: 0.55; transform: translateY(-50%) scale(1); }
          50%      { opacity: 0.85; transform: translateY(-50%) scale(1.08); }
        }
        @keyframes gutter-breathe-r {
          0%, 100% { opacity: 0.55; transform: translateY(-50%) scale(1.05); }
          50%      { opacity: 0.85; transform: translateY(-50%) scale(1); }
        }
        .home-gutter-l { animation: gutter-breathe-l 9s ease-in-out infinite; }
        .home-gutter-r { animation: gutter-breathe-r 11s ease-in-out infinite; }
      `}</style>
      <SEO
        title="ExploreCapitals | Free Geography Games, World Capitals Quiz & Interactive Map"
        description="Master world capitals, flags, and maps through fun geography games. A free educational platform with quizzes, an interactive atlas, and a country database for 195+ nations."
        isHomePage={true}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              name: 'ExploreCapitals',
              url: 'https://explorecapitals.com',
              description: 'Master world capitals, flags, and maps through fun geography games. A free educational platform with quizzes, an interactive atlas, and a country database for 195+ nations.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://explorecapitals.com/database?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@type': 'Organization',
              name: 'ExploreCapitals',
              url: 'https://explorecapitals.com',
              logo: 'https://explorecapitals.com/png/STYLE/explorecapitals-globe-favicon-new.png',
              sameAs: ['https://twitter.com/explorecapitals'],
            },
            {
              '@type': 'EducationalOrganization',
              name: 'ExploreCapitals',
              url: 'https://explorecapitals.com',
              description: 'Free interactive geography education platform featuring quizzes, games, maps, and a comprehensive country database.',
              knowsAbout: ['Geography', 'World Capitals', 'Country Flags', 'World Maps', 'Nations'],
            },
          ],
        }}
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden isolate w-full min-h-screen flex items-center md:items-start">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Star field */}
          <div
            className="absolute inset-0 home-stars"
            style={{
              backgroundImage:
                'radial-gradient(1px 1px at 13% 22%, rgba(255,255,255,0.55), transparent 60%),' +
                'radial-gradient(1px 1px at 27% 68%, rgba(0,194,255,0.65), transparent 60%),' +
                'radial-gradient(1.5px 1.5px at 42% 14%, rgba(255,255,255,0.7), transparent 60%),' +
                'radial-gradient(1px 1px at 56% 83%, rgba(255,255,255,0.4), transparent 60%),' +
                'radial-gradient(1px 1px at 71% 37%, rgba(139,200,255,0.55), transparent 60%),' +
                'radial-gradient(1.5px 1.5px at 83% 61%, rgba(255,255,255,0.55), transparent 60%),' +
                'radial-gradient(1px 1px at 91% 19%, rgba(0,194,255,0.5), transparent 60%),' +
                'radial-gradient(1px 1px at 8% 82%, rgba(255,255,255,0.5), transparent 60%)',
              backgroundSize: '100% 100%',
              willChange: 'opacity',
              transform: 'translateZ(0)'
            }}
          />

          {/* Removed circular gutter glow pockets and aurora to let global lava lamp shine through */}

          {/* Original top atmospherics (kept) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,194,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_-10%,rgba(52,199,89,0.05)_0%,transparent_40%)]" />
          <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-[#0F172A] to-transparent" />
        </div>
        <div
          className="relative z-10 w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8"
          style={{ paddingLeft: 'max(env(safe-area-inset-left, 16px), 16px)', paddingRight: 'max(env(safe-area-inset-right, 16px), 16px)' }}
        >
          <div className="w-full min-w-0 max-w-7xl mx-auto flex flex-col items-center justify-center pt-20 md:pt-[15vh] pb-12 md:pb-12">
            {/* Wordmark */}
            <h1 className="font-display font-black text-[clamp(1.6rem,8.5vw,3rem)] sm:text-5xl tracking-tighter uppercase text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] text-center mb-8 md:mb-8 max-w-full whitespace-nowrap">
              Explore<span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
            </h1>

            {/* Globe */}
            <div className="relative flex justify-center items-center mb-10 md:mb-12 w-full">
              {/* Glow rings removed to prevent perfect circle look */}


              <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex-shrink-0 pointer-events-none">
                <div className="w-full h-full animate-breathe" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                  <Link to="/map" className="relative w-full h-full bg-sky/10 rounded-full border-2 border-sky/30 flex items-center justify-center overflow-visible group cursor-pointer pointer-events-auto shadow-[inset_-6px_-6px_20px_rgba(255,255,255,0.25),inset_6px_6px_14px_rgba(255,255,255,0.1),inset_0_0_60px_rgba(0,194,255,0.15)]" style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                    {/* Performance Halo for Safari */}
                    <div className="absolute inset-[-15%] rounded-full bg-white/10 blur-3xl animate-pulse-slow pointer-events-none" style={{ willChange: 'opacity', transform: 'translateZ(0)' }} />
                    <img
                      src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon-new.png`}
                      alt="Globe - Click to explore the map"
                      className="w-[82%] h-[82%] object-contain animate-globe-glow relative z-10"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 80px rgba(0,194,255,0.12), inset 0 0 30px rgba(255,255,255,0.08)' }} />
                  </Link>
                </div>

                {/* Decorative floating bubbles */}
                <div className="absolute -top-1 -right-1 md:top-2 md:right-2 z-10 pointer-events-none animate-float-gentle">
                  <div className="w-20 h-20 md:w-24 md:h-24 aspect-square bg-sky/15 border border-sky/30 rounded-full flex items-center justify-center pointer-events-none glow-bubble">
                    <Trophy className="text-sky w-10 h-10 md:w-12 md:h-12" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -left-2 md:bottom-2 md:-left-8 z-10 pointer-events-none animate-float-gentle-delayed">
                  <div className="w-24 h-24 md:w-28 md:h-28 aspect-square bg-sky/15 border border-sky/30 rounded-full flex items-center justify-center pointer-events-none glow-bubble">
                    <Compass className="text-sky w-12 h-12 md:w-14 md:h-14" />
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="text-center w-full">
              <Link to="/games">
                <Button variant="primary" className="w-[80vw] max-w-[384px] aspect-[4.8] text-[min(6.25vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center">
                  {t('home.hero.play')} <Play className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]" fill="currentColor" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
