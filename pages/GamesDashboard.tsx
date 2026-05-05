import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Lock, Shuffle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, PanInfo, useDragControls } from 'framer-motion';
import { GAMES } from '../constants';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';

/* ── Instagram-style scrolling dot indicator ──────────────────────────── */
const InstagramDots: React.FC<{ total: number; current: number }> = ({ total, current }) => {
  const SLOT = 20;       // fixed width per dot slot
  const VISIBLE = 7;     // how many slots visible at once
  const containerW = VISIBLE * SLOT;
  // Slide so the active dot's slot is always centered
  const translateX = (containerW / 2) - (SLOT / 2) - (current * SLOT);

  return (
    <div
      className="overflow-hidden flex items-center"
      style={{ width: containerW, height: 20 }}
    >
      <div
        className="flex items-center transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const d = Math.abs(i - current);
          const size = d === 0 ? 12 : d === 1 ? 9 : d === 2 ? 6 : 5;
          const opacity = d === 0 ? 1 : d === 1 ? 0.55 : d === 2 ? 0.3 : 0.12;
          return (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center"
              style={{ width: SLOT, height: SLOT }}
            >
              <div
                className="rounded-full bg-white transition-all duration-300"
                style={{ width: size, height: size, opacity }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
  
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');
  const [shuffledGames, setShuffledGames] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const infiniteGames = useMemo(() => {
    if (shuffledGames.length === 0) return [];
    return [...shuffledGames, ...shuffledGames, ...shuffledGames];
  }, [shuffledGames]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(540);
  const x = useMotionValue(0);
  const dragControls = useDragControls();

  useEffect(() => {
    setPageLoading(false);
    
    // Shuffle games on load
    const active = GAMES.filter(g => g.status === 'active');
    const shuffled = [...active].sort(() => Math.random() - 0.5);
    setShuffledGames(shuffled);
    setActiveIndex(shuffled.length); // Start in middle set for carousel
    
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) setCardWidth(w * 0.95);
      else if (w < 1024) setCardWidth(540);
      else setCardWidth(640);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setPageLoading]);

  // Carousel Infinite Jump
  useEffect(() => {
    const n = shuffledGames.length;
    if (n === 0 || viewMode === 'grid') return;
    
    if (activeIndex >= 2 * n) {
      setActiveIndex(activeIndex - n);
      x.set(x.get() + n * cardWidth);
    } else if (activeIndex < n) {
      setActiveIndex(activeIndex + n);
      x.set(x.get() - n * cardWidth);
    }
  }, [activeIndex, shuffledGames.length, cardWidth, x, viewMode]);

  // Carousel Animation
  useEffect(() => {
    if (viewMode === 'carousel' && infiniteGames.length > 0) {
      animate(x, -activeIndex * cardWidth, {
        type: "spring",
        stiffness: 450,
        damping: 45,
        mass: 0.8
      });
    }
  }, [activeIndex, cardWidth, x, viewMode, infiniteGames.length]);

  const playRandomGame = () => {
    const active = GAMES.filter(g => g.status === 'active');
    const randomGame = active[Math.floor(Math.random() * active.length)];
    if (randomGame) {
      navigate(`/games/${GAME_PATHS[randomGame.id] || 'capital-quiz'}`);
    }
  };

  if (shuffledGames.length === 0) return null;

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 pb-16 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="All Games"
        description="Browse all geography games on ExploreCapitals."
      />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-sky/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Games' }]} />

        {/* Header */}
        <div className="flex flex-col items-start md:flex-row md:items-end justify-between gap-4 md:gap-4 mb-6 md:mb-8 relative z-50">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-white tracking-tighter uppercase leading-none drop-shadow-xl">
            {t('games.title')}
          </h1>
          
          <div className="flex flex-row items-center gap-3 md:gap-4 md:mb-4">
            <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md h-[46px] sm:h-[58px]">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex-none px-4 sm:px-6 py-2 h-full rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'}`}
              >
                Grid View
              </button>
              <button 
                onClick={() => setViewMode('carousel')}
                className={`flex-none px-4 sm:px-6 py-2 h-full rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'carousel' ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'}`}
              >
                Carousel
              </button>
            </div>

            <button
              onClick={playRandomGame}
              className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 rounded-2xl text-white transition-all duration-300 group shrink-0"
              title="Random Game"
            >
              <Shuffle size={18} className="text-sky-light group-hover:rotate-12 transition-transform" />
              <span className="font-bold uppercase text-[11px] tracking-[0.2em]">RANDOM GAME</span>
            </button>
          </div>
        </div>

        {viewMode === 'grid' && !isMobile ? (
          /* OG Premium Grid */
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12 pb-12"
          >
            {shuffledGames.map((game) => {
              const path = GAME_PATHS[game.id] || 'capital-quiz';
              const imgName = path === 'territory-titans' ? 'territory-titan' : path;
              return (
                <Link
                  key={game.id}
                  to={`/games/${path}`}
                  className="group relative aspect-[16/10] bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-sky/50 transition-all duration-500 shadow-xl hover:-translate-y-2"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={`${import.meta.env.BASE_URL}png/GAMES/${imgName}.png`} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-50 group-hover:brightness-75" />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                  </div>
                  <div className="relative z-20 p-6 sm:p-8 flex flex-col items-center justify-center w-full h-full text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight leading-none mb-6 drop-shadow-2xl">
                      {game.title}
                    </h3>
                    <div className="w-full flex justify-center">
                      <Button as="div" variant="primary" className="w-full max-w-[280px] py-5 text-xl uppercase tracking-[0.15em] font-black flex items-center justify-center shadow-premium">
                        PLAY <Play className="ml-3 fill-current" />
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        ) : (
          /* Premium Arcade Carousel */
          <>
            {/* Mobile swipe hint */}
            <div className="flex md:hidden items-center justify-center gap-2 -mb-2 animate-[swipe-bounce_3s_ease-in-out_infinite]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M22 12H2" />
                <path d="M6 8l-4 4 4 4" />
              </svg>
              <span className="text-white font-black uppercase text-[10px] tracking-[0.2em]">SWIPE TO CHOOSE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M2 12h20" />
                <path d="M18 8l4 4-4 4" />
              </svg>
            </div>

            <motion.div 
              key="carousel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-visible md:-mt-16"
              style={{ WebkitPerspective: 1200, perspective: 1200 }}
            >
              <motion.div
                className="flex items-center justify-center h-full touch-none"
                drag="x"
                dragControls={dragControls}
                dragListener={false}
                dragElastic={0.15}
                dragMomentum={false}
                style={{ x }}
                onDragEnd={(_: any, info: PanInfo) => {
                  const currentX = x.get();
                  const velocityFactor = info.velocity.x * 0.25;
                  const predictedX = currentX + velocityFactor;
                  const nextIndex = Math.round(-predictedX / cardWidth);
                  setActiveIndex(nextIndex);
                  
                  // Immediate spring animation to the target
                  animate(x, -nextIndex * cardWidth, {
                    type: "spring",
                    stiffness: 450,
                    damping: 45,
                    mass: 0.8
                  });
                }}
              >
                {infiniteGames.map((game, index) => (
                  <CarouselCard 
                    key={`${game.id}-${index}`} 
                    game={game} 
                    index={index} 
                    activeIndex={activeIndex} 
                    scrollX={x} 
                    width={cardWidth} 
                    dragControls={dragControls}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Dots + arrow nav */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-2 md:-mt-12 mb-6 md:mb-12 relative z-50">
              <button 
                onClick={() => setActiveIndex(prev => prev - 1)} 
                className="hidden md:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white transition-all duration-300 hover:bg-white/10"
              >
                <ChevronLeft size={20} />
              </button>

              <InstagramDots total={shuffledGames.length} current={activeIndex % shuffledGames.length} />

              <button 
                onClick={() => setActiveIndex(prev => prev + 1)} 
                className="hidden md:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white transition-all duration-300 hover:bg-white/10"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Carousel Card Component ────────────────────────────────────────── */

const CarouselCard: React.FC<{ 
  game: any; index: number; activeIndex: number; scrollX: any; width: number; dragControls: any; onClick: () => void 
}> = ({ game, index, activeIndex, scrollX, width, dragControls, onClick }) => {
  const targetX = index * width;
  const relativeX = useTransform(scrollX, (val: number) => val + targetX);
  
  const scale = useTransform(relativeX, [-width, 0, width], [0.9, width > 500 ? 1.15 : 1.05, 0.9]);
  const opacity = useTransform(relativeX, [-width, 0, width], [0.6, 1, 0.6]);
  const rotateY = useTransform(relativeX, [-width, 0, width], [15, 0, -15]);
  const zIndex = useTransform(relativeX, [-width, 0, width], [10, 30, 10]);

  const path = GAME_PATHS[game.id] || 'capital-quiz';
  const imgName = path === 'territory-titans' ? 'territory-titan' : path;

  return (
    <motion.div
      style={{
        scale, opacity, x: targetX, zIndex, rotateY,
        WebkitPerspective: 1200, perspective: 1200,
        WebkitTransformStyle: 'preserve-3d', transformStyle: 'preserve-3d',
        width,
      }}
      className={`absolute flex items-center justify-center h-full ${activeIndex === index ? 'z-30' : 'z-10 cursor-pointer'} will-change-transform`}
      onClick={() => activeIndex !== index && onClick()}
    >
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="w-[85%] sm:w-[90%] h-[85%] sm:h-auto sm:aspect-[16/10] max-h-full bg-slate-900 border-2 border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 group relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-0 z-0">
          <img src={`${import.meta.env.BASE_URL}png/GAMES/${imgName}.png`} alt={game.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 md:brightness-50 md:group-hover:brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent md:hidden z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent md:hidden z-10" />
          <div className="absolute inset-0 hidden md:block bg-black/40 z-10" />
        </div>
           
        <div className="relative z-20 flex flex-col items-center justify-between md:justify-center py-8 sm:py-12 px-6 sm:px-8 text-center w-full h-full md:gap-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              {game.title}
            </h3>
            
            <div className="w-full flex justify-center px-4">
              <Link 
                to={`/games/${path}`} 
                className="w-full flex justify-center"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Button as="div" variant="primary" className="w-full max-w-[360px] py-5 text-xl uppercase tracking-[0.15em] font-black flex items-center justify-center shadow-premium active:scale-95 transition-all duration-300 group/btn">
                  PLAY <Play className="ml-3 fill-current group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GamesDashboard;
