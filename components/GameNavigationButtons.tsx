import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shuffle, LayoutGrid } from 'lucide-react';
import { GAMES } from '../constants';
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

const GameNavigationButtons: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const playRandomGame = () => {
    const currentSlug = location.pathname.split('/games/')[1] || '';
    const activeGames = GAMES.filter(g => g.status === 'active');
    const candidates = activeGames.filter(g => GAME_PATHS[g.id] !== currentSlug);
    const pool = candidates.length > 0 ? candidates : activeGames;
    const randomGame = pool[Math.floor(Math.random() * pool.length)];
    if (randomGame) {
      navigate(`/games/${GAME_PATHS[randomGame.id] || 'capital-quiz'}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
      <button
        onClick={() => navigate('/games/all')}
        className="flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl text-white/70 hover:text-white transition-all duration-300 group shadow-lg"
      >
        <LayoutGrid size={16} className="group-hover:scale-110 transition-transform" />
        <span className="font-black uppercase text-[10px] sm:text-[11px] tracking-widest whitespace-nowrap">ALL GAMES</span>
      </button>
      
      <button
        onClick={playRandomGame}
        className="flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl text-white/70 hover:text-white transition-all duration-300 group shadow-lg"
      >
        <Shuffle size={16} className="group-hover:rotate-12 transition-transform" />
        <span className="font-black uppercase text-[10px] sm:text-[11px] tracking-widest whitespace-nowrap">RANDOM</span>
      </button>
    </div>
  );
};

export default GameNavigationButtons;
