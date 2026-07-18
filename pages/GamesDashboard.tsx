import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Shuffle, ArrowDownAZ, List } from 'lucide-react';
import { GAMES } from '../constants';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
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
  const [sortOrder, setSortOrder] = useState<'default' | 'alpha'>('default');

  useEffect(() => {
    setPageLoading(false);
    (window as any).__dismissLoader?.();
  }, [setPageLoading]);

  const displayGames = useMemo(() => {
    const active = GAMES.filter(g => g.status === 'active');
    if (sortOrder === 'alpha') {
      return [...active].sort((a, b) => a.title.localeCompare(b.title));
    }
    return active;
  }, [sortOrder]);

  const playRandom = () => {
    const game = displayGames[Math.floor(Math.random() * displayGames.length)];
    if (game) navigate(`/games/${GAME_PATHS[game.id] || 'capital-quiz'}`);
  };

  return (
    <main className="pt-20 sm:pt-24 md:pt-28 pb-16 px-4 sm:px-6 min-h-screen bg-surface" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="Geography Games"
        description="Play 15 free geography games — capitals, flags, maps, landmarks, and more. Build your atlas skills one round at a time."
      />

      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Games' }]} />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text tracking-tight mb-2">
              {t('games.title')}
            </h1>
            <p className="text-muted text-base sm:text-lg max-w-lg">
              {t('home.games.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSortOrder(s => (s === 'alpha' ? 'default' : 'alpha'))}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                sortOrder === 'alpha'
                  ? 'bg-accent-soft border-primary/25 text-primary'
                  : 'bg-elevated border-border text-muted hover:text-text'
              }`}
            >
              {sortOrder === 'alpha' ? <ArrowDownAZ size={14} /> : <List size={14} />}
              {sortOrder === 'alpha' ? 'A–Z' : 'Default'}
            </button>
            <Button onClick={playRandom} size="sm" className="gap-2">
              <Shuffle size={14} />
              Random
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayGames.map((game) => (
            <Link
              key={game.id}
              to={`/games/${GAME_PATHS[game.id]}`}
              className="group flex flex-col bg-elevated border border-border rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:border-primary/25 transition-all duration-300"
            >
              <div className="aspect-[16/10] bg-accent-soft overflow-hidden relative">
                <img
                  src={game.image.replace('./', '/')}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold">
                    <Play size={12} fill="currentColor" />
                    Play
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-display font-semibold text-lg text-text mb-1.5 group-hover:text-primary transition-colors">
                  {game.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed line-clamp-2 flex-1">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GamesDashboard;
