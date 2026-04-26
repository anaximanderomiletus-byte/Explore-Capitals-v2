import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Lock, Shuffle, Clock, ArrowRight } from 'lucide-react';
import { GAMES } from '../constants';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';

const GAME_PATHS: Record<string, string> = {
  '1': 'capital-quiz',
  '2': 'map-dash',
  '3': 'flag-frenzy',
  '4': 'know-your-neighbor',
  '5': 'population-pursuit',
  '6': 'global-detective',
  '7': 'capital-connection',
  '8': 'region-roundup',
  '9': 'landmark-legend',
  '10': 'territory-titans',
  '11': 'area-ace',
  '12': 'currency-craze',
  '13': 'language-legend',
  '14': 'time-zone-trekker',
  '15': 'driving-direction',
};

const GamesDashboard: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const playRandomGame = () => {
    const activeGames = GAMES.filter(g => g.status === 'active');
    const randomGame = activeGames[Math.floor(Math.random() * activeGames.length)];
    if (randomGame) {
      navigate(`/games/${GAME_PATHS[randomGame.id] || 'capital-quiz'}`);
    }
  };

  const activeGames = GAMES.filter(g => g.status === 'active');
  const comingSoonGames = GAMES.filter(g => g.status !== 'active');

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="All Games"
        description="Browse all geography games on ExploreCapitals."
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Games' },
        ]} />

        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8 md:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            {t('games.title')}
          </h1>
          <button
            onClick={playRandomGame}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 rounded-2xl text-white transition-all duration-300 group shrink-0 mb-1"
          >
            <Shuffle size={18} className="text-sky-light group-hover:rotate-12 transition-transform" />
            <span className="font-bold uppercase text-[11px] tracking-[0.2em]">{t('games.randomGame')}</span>
          </button>
        </div>

        {/* Arcade Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-8">
          {/* Active games */}
          {activeGames.map((game) => {
            const path = GAME_PATHS[game.id] || 'capital-quiz';
            const imgName = path === 'territory-titans' ? 'territory-titan' : path;
            return (
              <Link
                key={game.id}
                to={`/games/${path}`}
                className="group relative flex flex-col h-full bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,194,255,0.06)] hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="w-full aspect-[4/3] overflow-hidden relative border-b border-white/10 shrink-0">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-black/10 to-transparent z-10" />
                   <img src={`${import.meta.env.BASE_URL}png/GAMES/${imgName}.png`} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                   
                   {/* Play overlay icon */}
                   <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-16 h-16 rounded-full bg-sky-light text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.25)]">
                       <Play size={28} fill="currentColor" className="ml-1" />
                     </div>
                   </div>

                   {/* Duration Badge */}
                   <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90">
                     <Clock size={12} className="text-sky-light/80" />
                     <span className="text-[10px] font-black uppercase tracking-wider">1 min</span>
                   </div>
                </div>

                {/* Game info */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-20">
                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight leading-none group-hover:text-sky-light transition-colors mb-2">
                      {game.title}
                    </h3>
                    <p className="text-[13px] text-white/50 font-medium leading-relaxed flex-grow">
                      {game.description}
                    </p>
                </div>
              </Link>
            );
          })}

          {/* Coming soon games */}
          {comingSoonGames.map((game) => {
            const path = GAME_PATHS[game.id] || 'capital-quiz';
            const imgName = path === 'territory-titans' ? 'territory-titan' : path;
            return (
              <div
                key={game.id}
                className="group relative flex flex-col h-full bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden opacity-40 grayscale transition-all duration-500"
              >
                  <div className="w-full aspect-[4/3] overflow-hidden relative border-b border-white/[0.05] flex items-center justify-center bg-[#0F172A] shrink-0">
                     <Lock size={48} className="text-white/20 absolute z-20" />
                     <div className="absolute inset-0 bg-[#0F172A]/60 z-10" />
                     <img src={`${import.meta.env.BASE_URL}png/GAMES/${imgName}.png`} alt={game.title} className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-20">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[8px] font-black uppercase tracking-widest text-white/50">Coming Soon</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-black text-white/70 uppercase tracking-tight leading-none mb-2">
                        {game.title}
                      </h3>
                      <p className="text-[13px] text-white/30 font-medium leading-relaxed flex-grow">
                        {game.description}
                      </p>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamesDashboard;
