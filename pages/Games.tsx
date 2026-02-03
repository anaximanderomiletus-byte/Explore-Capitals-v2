import React, { useEffect, useState } from 'react';
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
  const { canPlay, gamesRemaining, dailyLimit, isPremium } = useGameLimit();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
      default: return '';
    }
  };

  const playRandomGame = () => {
    const activeGames = GAMES.filter(g => g.status === 'active');
    const randomGame = activeGames[Math.floor(Math.random() * activeGames.length)];
    if (randomGame) {
      navigate(`/games/${getGamePath(randomGame.id)}`);
    }
  };

  useEffect(() => {
    // Start Preloading Images
    const imageUrls = GAMES.map(game => game.image);
    
    // Create an array of image load promises
    const loadPromises = imageUrls.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to avoid hanging the UI
      });
    });

    // Wait for all images, then signal that the page is ready
    Promise.all(loadPromises).then(() => {
      setPageLoading(false);
    });
  }, [setPageLoading]);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-surface-dark min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-sky/5 rounded-full blur-[180px] animate-pulse-slow opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-sky/3 rounded-full blur-[150px] animate-pulse-slow opacity-40" />
      </div>

      <SEO 
        title="Geography Games"
        description="Play free geography games online. Test your knowledge of world capitals, flags, maps, borders, and populations with fun interactive quizzes."
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-8 md:mb-12">
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
            className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover:opacity-20 pointer-events-none" />
            <Shuffle size={18} className="text-sky-light transition-transform duration-700 relative z-10" />
            <span className="relative z-10">Random Game</span>
          </button>
        </div>

        {/* Daily Limit Counter (Free users only) */}
        {!isPremium && (
          <div className="mb-8 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14">
                {/* Circular progress indicator */}
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-white/10"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(gamesRemaining / dailyLimit) * 150.8} 150.8`}
                    className={gamesRemaining <= 1 ? 'text-amber-400' : 'text-sky'}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-white">
                  {gamesRemaining}
                </span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">
                  {gamesRemaining === 0 
                    ? 'Daily limit reached!' 
                    : `${gamesRemaining} game${gamesRemaining === 1 ? '' : 's'} remaining today`
                  }
                </p>
                <p className="text-white/50 text-xs">
                  {gamesRemaining === 0 
                    ? 'Upgrade to Premium for unlimited games'
                    : 'Free users get 5 games per day'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/premium')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/30 rounded-xl text-[10px] font-black text-amber-400 uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Crown size={14} />
              GO PREMIUM
            </button>
          </div>
        )}

        {/* Premium Badge (Premium users only) */}
        {isPremium && (
          <div className="mb-8 p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Crown size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 font-bold text-sm">Premium Member</p>
              <p className="text-white/50 text-xs">Unlimited games, no ads</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {GAMES.map((game) => (
            <div 
              key={game.id} 
              className={`group bg-white/20 backdrop-blur-3xl rounded-3xl overflow-hidden border-2 border-white/50 shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-700 hover:bg-white/30 relative ${game.status !== 'active' ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden border-b border-white/20">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                
                {game.status !== 'active' && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 border border-white/20">
                      <Lock size={16} className="text-white/60" /> Locked
                    </div>
                  </div>
                )}
                {game.status === 'active' && (
                  <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-xl border border-white/50 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white relative overflow-hidden">
                     <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                     <Clock size={10} className="inline mr-1.5 relative z-10 text-sky-light" /> <span className="relative z-10">1 Min</span>
                  </div>
                )}
              </div>
              
              <div className="p-5 sm:p-6 md:p-8 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-11rem)] md:h-[calc(100%-12rem)] relative z-10">
                <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-2 tracking-tighter leading-none uppercase drop-shadow-md">{game.title}</h3>
                <p className="text-white/60 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base leading-relaxed font-bold uppercase tracking-tight line-clamp-2 drop-shadow-sm">{game.description}</p>
                
                    <div className="mt-auto">
                      {game.status === 'active' ? (
                        canPlay ? (
                          <Link to={`/games/${getGamePath(game.id)}`}>
                            <Button variant="primary" className="w-full h-12 sm:h-14 text-base sm:text-lg border border-white/30">
                              PLAY <Play size={18} fill="currentColor" />
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            variant="secondary" 
                            className="w-full h-12 sm:h-14 text-base sm:text-lg border border-amber-500/30 text-amber-400"
                            onClick={() => setShowUpgradeModal(true)}
                          >
                            <Crown size={18} /> UPGRADE
                          </Button>
                        )
                      ) : (
                        <Button 
                          variant="secondary" 
                          className="w-full h-12 sm:h-14 opacity-50 text-base sm:text-lg font-black uppercase tracking-[0.1em]"
                          disabled={true}
                        >
                          Locked
                        </Button>
                      )}
                    </div>
              </div>
            </div>
          ))}
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
          <div className="relative bg-surface-dark border-2 border-white/20 rounded-3xl p-6 w-full max-w-md shadow-2xl">
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
                Daily Limit Reached
              </h3>
              <p className="text-white/60 mb-6">
                You've played all 5 free games today. Upgrade to Premium for unlimited access!
              </p>

              <div className="space-y-3">
                <Button 
                  variant="accent" 
                  className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 border-0"
                  onClick={() => {
                    setShowUpgradeModal(false);
                    navigate('/premium');
                  }}
                >
                  <Sparkles size={18} /> GO PREMIUM
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
