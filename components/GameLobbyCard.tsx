import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, Shuffle, LayoutGrid } from 'lucide-react';
import { GAMES } from '../constants';
import { useTranslation } from '../context/LocaleContext';
import Button from './Button';
import TimeSelector from './TimeSelector';

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

type Props = {
  title: string;
  description: string;
  image: string;
  gameDuration: number;
  setGameDuration: (val: number) => void;
  startGame: () => void;
};

const GameLobbyCard: React.FC<Props> = ({
  title,
  description,
  image,
  gameDuration,
  setGameDuration,
  startGame,
}) => {
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
    <div className="game-lobby-card w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-6 sm:p-10 text-center border-2 border-white/40 overflow-hidden group relative shadow-2xl">
      <div className="w-24 h-24 rounded-2xl mx-auto mb-8 border-2 border-white/40 shadow-xl relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-display font-black text-white mb-3 uppercase tracking-tighter drop-shadow-lg">
        {title}
      </h1>
      <p className="text-white/70 text-[11px] sm:text-xs mb-8 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
      
      <div className="mb-10 max-w-xs mx-auto">
        <TimeSelector value={gameDuration} onChange={setGameDuration} />
      </div>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Button 
          onClick={startGame} 
          variant="primary"
          className="w-full aspect-[4.8] text-[20px] sm:text-[28px] uppercase tracking-widest font-black p-0 flex items-center justify-center shadow-[0_15px_30px_rgba(0,122,255,0.3)]"
        >
          PLAY <Play className="ml-3 w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />
        </Button>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => navigate('/games/all')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl text-white/70 hover:text-white transition-all duration-300 group shadow-lg"
          >
            <LayoutGrid size={16} className="group-hover:scale-110 transition-transform" />
            <span className="font-black uppercase text-[10px] tracking-widest">ALL GAMES</span>
          </button>
          
          <button
            onClick={playRandomGame}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl text-white/70 hover:text-white transition-all duration-300 group shadow-lg"
          >
            <Shuffle size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="font-black uppercase text-[10px] tracking-widest">RANDOM</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLobbyCard;
