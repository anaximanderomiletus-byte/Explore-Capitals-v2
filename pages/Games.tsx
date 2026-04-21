import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '../constants';
import { useLayout } from '../context/LayoutContext';

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

const Games: React.FC = () => {
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
    const activeGames = GAMES.filter(g => g.status === 'active');
    const randomGame = activeGames[Math.floor(Math.random() * activeGames.length)];
    if (randomGame) {
      navigate(`/games/${GAME_PATHS[randomGame.id] || 'capital-quiz'}`, { replace: true });
    }
  }, [navigate, setPageLoading]);

  return null;
};

export default Games;
