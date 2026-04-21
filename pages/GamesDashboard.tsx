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

      <div className="max-w-4xl mx-auto relative z-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Games' },
        ]} />

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            {t('games.title')}
          </h1>
        </div>

        {/* Random game bar */}
        <button
          onClick={playRandomGame}
          className="w-full mb-8 flex items-center justify-between px-5 sm:px-6 py-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl transition-all group"
        >
          <div className="flex items-center gap-3">
            <Shuffle size={16} className="text-sky-light" />
            <span className="text-[10px] sm:text-xs font-black text-white/60 group-hover:text-white uppercase tracking-[0.2em] transition-colors">
              {t('games.randomGame')}
            </span>
          </div>
          <ArrowRight size={14} className="text-white/30 group-hover:text-sky-light group-hover:translate-x-1 transition-all" />
        </button>

        {/* Table */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 px-5 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-[9px] font-black text-white/25 uppercase tracking-[0.3em]">Game</span>
            <span className="text-[9px] font-black text-white/25 uppercase tracking-[0.3em] w-20 text-center">Time</span>
            <span className="text-[9px] font-black text-white/25 uppercase tracking-[0.3em] w-20 text-right">Action</span>
          </div>

          {/* Active games */}
          {activeGames.map((game, i) => {
            const path = GAME_PATHS[game.id] || '';
            return (
              <Link
                key={game.id}
                to={`/games/${path}`}
                className={`group flex items-center sm:grid sm:grid-cols-[1fr_auto_auto] gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-[18px] hover:bg-white/[0.04] transition-all ${
                  i < activeGames.length - 1 || comingSoonGames.length > 0 ? 'border-b border-white/[0.04]' : ''
                }`}
              >
                {/* Game info */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <span className="text-[10px] font-black text-white/15 w-5 shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-display font-black text-white uppercase tracking-tight leading-none group-hover:text-sky-light transition-colors truncate">
                      {game.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/30 font-bold uppercase tracking-wide mt-1 truncate">
                      {game.description}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="hidden sm:flex items-center gap-1.5 text-white/25 w-20 justify-center">
                  <Clock size={10} />
                  <span className="text-[10px] font-black uppercase tracking-wider">1 min</span>
                </div>

                {/* Play */}
                <div className="flex items-center gap-1.5 w-20 justify-end">
                  <span className="text-[10px] font-black text-sky-light/70 group-hover:text-sky-light uppercase tracking-[0.2em] transition-colors">
                    {t('games.play')}
                  </span>
                  <Play size={10} className="text-sky-light/70 group-hover:text-sky-light transition-colors" fill="currentColor" />
                </div>
              </Link>
            );
          })}

          {/* Coming soon games */}
          {comingSoonGames.map((game, i) => (
            <div
              key={game.id}
              className={`flex items-center sm:grid sm:grid-cols-[1fr_auto_auto] gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-[18px] opacity-35 ${
                i < comingSoonGames.length - 1 ? 'border-b border-white/[0.04]' : ''
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <span className="text-[10px] font-black text-white/15 w-5 shrink-0 tabular-nums">{String(activeGames.length + i + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-display font-black text-white uppercase tracking-tight leading-none truncate">
                    {game.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/30 font-bold uppercase tracking-wide mt-1 truncate">
                    {game.description}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block w-20" />
              <div className="flex items-center gap-1.5 w-20 justify-end">
                <Lock size={10} className="text-white/40" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">Soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesDashboard;
