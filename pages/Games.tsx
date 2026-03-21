import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Clock, Lock, Shuffle, Crown, Sparkles, X } from 'lucide-react';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import { GAMES } from '../constants';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLayout } from '../context/LayoutContext';
import { BannerAd } from '../components/AdSense';
import { useGameLimit } from '../hooks/useGameLimit';

const Games: React.FC = () => {
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();
  const { isPremium } = useGameLimit();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Lock body scroll when upgrade modal is open
  useEffect(() => {
    if (showUpgradeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showUpgradeModal]);

  // Separate free and premium games
  const freeGames = useMemo(() => GAMES.filter(g => !g.premium), []);
  const premiumGames = useMemo(() => GAMES.filter(g => g.premium), []);

  const getGamePath = (id: string) => {
    switch (id) {
      case '1': return 'capital-quiz';
      case '2': return 'map-dash';
      case '3': return 'flag-frenzy';
      case '4': return 'know-your-neighbor';
      case '5': return 'population-pursuit';
      case '6': return 'global-detective';
      case '7': return 'capital-connection';
      case '8': return 'region-roundup';
      case '9': return 'landmark-legend';
      // Premium games
      case '10': return 'territory-titans';
      case '11': return 'area-ace';
      case '12': return 'currency-craze';
      case '13': return 'language-legend';
      case '14': return 'time-zone-trekker';
      case '15': return 'driving-direction';
      default: return '';
    }
  };

  const playRandomGame = () => {
    // Only select from active free games for random play
    const activeGames = freeGames.filter(g => g.status === 'active');
    const randomGame = activeGames[Math.floor(Math.random() * activeGames.length)];
    if (randomGame) {
      navigate(`/games/${getGamePath(randomGame.id)}`);
    }
  };

  useEffect(() => {
    // Render page immediately — images load progressively via native loading="lazy"
    setPageLoading(false);
  }, [setPageLoading]);

  const renderGameCard = (game: typeof GAMES[0], isPremiumGame: boolean) => {
    const isLocked = isPremiumGame && !isPremium;
    const isActive = game.status === 'active';
    
    return (
      <div
        className={`group bg-white/20 rounded-3xl overflow-hidden border-2 ${isPremiumGame ? 'border-amber-500/30' : 'border-white/50'} shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-700 hover:bg-white/30 relative ${!isActive ? 'opacity-50 grayscale' : ''} h-full flex flex-col`}
      >
        <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
        
        {/* Premium Badge */}
        {isPremiumGame && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1.5 shadow-lg">
            <Crown size={10} /> PREMIUM
          </div>
        )}
        
        <div className="relative h-40 sm:h-44 md:h-48 shrink-0 overflow-hidden border-b border-white/20">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
          
          {/* Locked overlay for premium games when user is not premium */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="px-6 py-3 bg-amber-500/20 backdrop-blur-xl rounded-xl text-amber-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 border border-amber-500/30">
                <Lock size={16} /> Premium Only
              </div>
            </div>
          )}
          
          {/* Coming soon overlay */}
          {!isActive && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 border border-white/20">
                <Lock size={16} /> Coming Soon
              </div>
            </div>
          )}
          
          {/* Time badge - only show for active, unlocked games */}
          {isActive && !isLocked && (
            <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-xl border border-white/50 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
               <Clock size={10} className="inline mr-1.5 relative z-10 text-sky-light" /> <span className="relative z-10">1 Min</span>
            </div>
          )}
        </div>
        
        <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 min-h-0 relative z-10">
          <h3 className={`text-xl sm:text-2xl font-display font-black mb-2 tracking-tighter leading-none uppercase drop-shadow-md ${isPremiumGame ? 'text-amber-400' : 'text-white'}`}>{game.title}</h3>
          <p className="text-white/60 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base leading-relaxed font-bold uppercase tracking-tight line-clamp-2 drop-shadow-sm">{game.description}</p>
          
          <div className="mt-auto">
            {isActive ? (
              isLocked ? (
                <Button
                  variant="premium"
                  className="w-full h-14 sm:h-16 md:h-[4.5rem] text-xl sm:text-2xl whitespace-nowrap"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  <Lock size={24} className="mr-2 shrink-0" /> UNLOCK
                </Button>
              ) : (
                <Link to={`/games/${getGamePath(game.id)}`}>
                  <Button variant="primary" className="w-full h-14 sm:h-16 md:h-[4.5rem] text-xl sm:text-2xl border-2 border-white/30">
                    PLAY <Play size={20} fill="currentColor" />
                  </Button>
                </Link>
              )
            ) : (
              <Button
                variant="secondary"
                className="w-full h-14 sm:h-16 md:h-[4.5rem] opacity-50 text-lg sm:text-xl font-black uppercase tracking-[0.1em]"
                disabled={true}
              >
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="Geography Games"
        description="Play free geography games online. Test your knowledge of world capitals, flags, maps, borders, and populations with fun interactive quizzes and timed challenges."
        keywords="geography games, capital quiz, flag quiz, map game, country quiz, free geography games online, world capitals game, interactive map game"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Geography Games',
          description: 'Play free geography games online. Test your knowledge of world capitals, flags, maps, borders, and populations with fun interactive quizzes and timed challenges.',
          url: 'https://explorecapitals.com/games',
          isPartOf: { '@type': 'WebSite', name: 'ExploreCapitals', url: 'https://explorecapitals.com' },
          about: { '@type': 'Thing', name: 'Geography Education' },
          hasPart: [
            { '@type': 'VideoGame', name: 'Capital Quiz', description: 'Identify world capitals against the clock.', url: 'https://explorecapitals.com/games/capital-quiz', genre: 'Educational', gamePlatform: 'Web Browser' },
            { '@type': 'VideoGame', name: 'Map Dash', description: 'Find nations on the interactive world map.', url: 'https://explorecapitals.com/games/map-dash', genre: 'Educational', gamePlatform: 'Web Browser' },
            { '@type': 'VideoGame', name: 'Flag Frenzy', description: 'Match flags to their countries.', url: 'https://explorecapitals.com/games/flag-frenzy', genre: 'Educational', gamePlatform: 'Web Browser' },
            { '@type': 'VideoGame', name: 'Know Your Neighbor', description: 'Identify every bordering country.', url: 'https://explorecapitals.com/games/know-your-neighbor', genre: 'Educational', gamePlatform: 'Web Browser' },
            { '@type': 'VideoGame', name: 'Population Pursuit', description: 'Compare country populations.', url: 'https://explorecapitals.com/games/population-pursuit', genre: 'Educational', gamePlatform: 'Web Browser' },
            { '@type': 'VideoGame', name: 'Global Detective', description: 'Identify the hidden country from clues.', url: 'https://explorecapitals.com/games/global-detective', genre: 'Educational', gamePlatform: 'Web Browser' },
          ],
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Games' },
        ]} />
        <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-8 md:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky/30 border border-white/40 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
               <Play size={12} className="relative z-10 text-sky-light" fill="currentColor" />
               <span className="relative z-10 drop-shadow-md">GAMES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-3 md:mb-4 tracking-tighter uppercase leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">Games</h1>
            <p className="text-white/70 text-lg font-bold uppercase tracking-wide drop-shadow-md">Earn points and rank up.</p>
          </div>

          <button
            onClick={playRandomGame}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/20 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover:opacity-20 pointer-events-none" />
            <Shuffle size={18} className="text-sky-light transition-transform duration-700 relative z-10" />
            <span className="relative z-10">Random Game</span>
          </button>
        </RevealSection>

        {/* Free Games Section */}
        <RevealSection className="mb-12" delay={0.1}>
          <h2 className="text-lg font-bold text-white/60 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <Play size={16} className="text-sky-light" fill="currentColor" />
            Free Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {freeGames.map((game, i) => (
              <RevealSection key={game.id} delay={0.05 * i} className="h-full">
                {renderGameCard(game, false)}
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        {/* Premium Games Section */}
        <RevealSection className="mb-12" delay={0.1}>
          <h2 className="text-lg font-bold text-amber-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <Crown size={16} className="text-amber-400" />
            Premium Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {premiumGames.map((game, i) => (
              <RevealSection key={game.id} delay={0.05 * i} className="h-full">
                {renderGameCard(game, true)}
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        {/* Strategic Ad Placement - After game grid */}
        <RevealSection className="mt-12 md:mt-16">
          <BannerAd slot="9489406693" />
        </RevealSection>
      </div>

      {/* Upgrade Modal - Portal to body so fixed positioning always works */}
      {showUpgradeModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowUpgradeModal(false)}
          />
          <div className="relative bg-surface-dark border-2 border-amber-500/30 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown size={32} className="text-amber-400" />
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-1.5 uppercase tracking-tight">
                Unlock Premium Games
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Get access to {premiumGames.length} more exclusive games!
              </p>

              <div className="bg-white/5 rounded-xl p-3 mb-4">
                <div className="text-left space-y-2.5">
                  {premiumGames.map(game => (
                    <div key={game.id} className="flex items-start gap-3 text-sm">
                      <Crown size={12} className="text-amber-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <span className="text-white/80 font-medium">{game.title}</span>
                        <p className="text-white/40 text-xs mt-0.5">{game.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="premium"
                  className="w-full h-14"
                  onClick={() => {
                    setShowUpgradeModal(false);
                    navigate('/premium');
                  }}
                >
                  <Sparkles size={18} /> UPGRADE
                </Button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-2 text-white/50 text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:text-white transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Games;
