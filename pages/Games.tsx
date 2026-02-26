import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Clock, Lock, Shuffle, Crown, Sparkles, X } from 'lucide-react';
import Button from '../components/Button';
import { GAMES } from '../constants';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { BannerAd } from '../components/AdSense';
import { useGameLimit } from '../hooks/useGameLimit';

const Games: React.FC = () => {
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();
  const { isPremium } = useGameLimit();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
        key={game.id} 
        className={`group bg-white/20 rounded-3xl overflow-hidden border-2 ${isPremiumGame ? 'border-amber-500/30' : 'border-white/50'} shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-700 hover:bg-white/30 relative ${!isActive ? 'opacity-50 grayscale' : ''}`}
      >
        <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
        
        {/* Premium Badge */}
        {isPremiumGame && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1.5 shadow-lg">
            <Crown size={10} /> PREMIUM
          </div>
        )}
        
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden border-b border-white/20">
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
        
        <div className="p-5 sm:p-6 md:p-8 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-11rem)] md:h-[calc(100%-12rem)] relative z-10">
          <h3 className={`text-xl sm:text-2xl font-display font-black mb-2 tracking-tighter leading-none uppercase drop-shadow-md ${isPremiumGame ? 'text-amber-400' : 'text-white'}`}>{game.title}</h3>
          <p className="text-white/60 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base leading-relaxed font-bold uppercase tracking-tight line-clamp-2 drop-shadow-sm">{game.description}</p>
          
          <div className="mt-auto">
            {isActive ? (
              isLocked ? (
                <Button
                  variant="secondary"
                  className="w-full h-14 sm:h-16 md:h-[4.5rem] text-xs sm:text-sm border-2 border-amber-500/30 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 whitespace-nowrap"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  <Lock size={16} className="mr-2 shrink-0" /> UNLOCK WITH PREMIUM
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
    <div className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 bg-surface-dark min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO 
        title="Geography Games"
        description="Play free geography games online. Test your knowledge of world capitals, flags, maps, borders, and populations with fun interactive quizzes."
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-8 md:mb-12 animate-[fadeIn_0.3s_ease-out_both]"
        >
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
        </div>

        {/* Free Games Section */}
        <div className="mb-12 animate-[fadeIn_0.3s_ease-out_0.1s_both]"
        >
          <h2 className="text-lg font-bold text-white/60 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <Play size={16} className="text-sky-light" fill="currentColor" />
            Free Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {freeGames.map((game) => renderGameCard(game, false))}
          </div>
        </div>

        {/* Premium Games Section */}
        <div className="mb-12 animate-[fadeIn_0.3s_ease-out_0.2s_both]"
        >
          <h2 className="text-lg font-bold text-amber-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <Crown size={16} className="text-amber-400" />
            Premium Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {premiumGames.map((game) => renderGameCard(game, true))}
          </div>
        </div>

        {/* Strategic Ad Placement - After game grid */}
        <div className="mt-12 md:mt-16">
          <BannerAd slot="9489406693" />
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowUpgradeModal(false)}
          />
          <div className="relative bg-surface-dark border-2 border-amber-500/30 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} className="text-white/60" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown size={40} className="text-amber-400" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Unlock Premium Games
              </h3>
              <p className="text-white/60 mb-6">
                Get access to {premiumGames.length} exclusive games including Territory Titans, Area Ace, and more!
              </p>

              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="text-left space-y-3">
                  {premiumGames.map(game => (
                    <div key={game.id} className="flex items-start gap-3 text-sm">
                      <Crown size={12} className="text-amber-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <span className="text-white/80 font-medium">{game.title}</span>
                        <p className="text-white/40 text-xs mt-0.5">{game.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="accent" 
                  className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 border-0"
                  onClick={() => {
                    setShowUpgradeModal(false);
                    navigate('/premium');
                  }}
                >
                  <Sparkles size={18} /> UPGRADE TO PREMIUM
                </Button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-3 text-white/50 text-sm hover:text-white transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
