import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo, animate, useDragControls } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';
import { VerticalSidebarAd } from '../components/AdSense';
import { GAMES, COUNTRIES } from '../constants';
import { toSlug } from '../utils/slug';

/* ── Constants ────────────────────────────────────────────────── */

const GAME_PATHS: Record<string, string> = {
  '1': 'capital-quiz', '2': 'map-dash', '3': 'flag-frenzy',
  '4': 'know-your-neighbor', '5': 'population-pursuit', '6': 'global-detective',
  '7': 'capital-connection', '8': 'region-roundup', '9': 'landmark-legend',
  '10': 'territory-titans', '11': 'area-ace', '12': 'currency-craze',
  '13': 'language-legend', '14': 'time-zone-trekker', '15': 'driving-direction',
};

const getGamePath = (id: string) => GAME_PATHS[id] || 'capital-quiz';
const getGameImageName = (id: string) => {
  const path = getGamePath(id);
  return path === 'territory-titans' ? 'territory-titan' : path;
};

const COUNTRY_HIGHLIGHTS = [
  '86', // Japan
  '24', // Brazil
  '53', // Egypt
  '77', // Iceland
  '9',  // Australia
  '89', // Kenya
  '183', // Peru
  '117', // Morocco
  '200', // Samoa
  '170', // Switzerland
].map(id => COUNTRIES.find(c => c.id === id)).filter(Boolean);


/* ── Main Component ───────────────────────────────────────────── */

const Home: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const [panelWidth, setPanelWidth] = useState(420);
  const dragControls = useDragControls();
  const suppressCarouselClick = useRef(false);
  const suppressCarouselClickTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPanelWidth(w * 0.75);
      else if (w < 1024) setPanelWidth(360);
      else setPanelWidth(420);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Motion values for ultra-smooth tracking and snapping
  const x = useMotionValue(-1 * panelWidth);

  useEffect(() => {
    setPageLoading(false);
    (window as any).__dismissLoader?.();
  }, [setPageLoading]);

  useEffect(() => {
    return () => clearTimeout(suppressCarouselClickTimer.current);
  }, []);

  // Synchronize base motion value with index
  useEffect(() => {
    animate(x, -activeIndex * panelWidth, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 0.8
    });
  }, [activeIndex, panelWidth, x]);

  const onDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 6 || Math.abs(info.velocity.x) > 120) {
      suppressCarouselClick.current = true;
      clearTimeout(suppressCarouselClickTimer.current);
      suppressCarouselClickTimer.current = setTimeout(() => {
        suppressCarouselClick.current = false;
      }, 250);
    }

    const currentX = x.get();
    // Increased velocity factor for more 'aggressive' flick snapping
    const velocityFactor = info.velocity.x * 0.25;
    const predictedX = currentX + velocityFactor;
    
    const closestIndex = Math.round(-predictedX / panelWidth);
    const nextIndex = Math.max(0, Math.min(2, closestIndex));
    
    setActiveIndex(nextIndex);
    
    // Immediate spring animation to the target
    animate(x, -nextIndex * panelWidth, {
      type: "spring",
      stiffness: 450,
      damping: 45,
      mass: 0.8
    });
  };

  const featuredGames = useMemo(() => GAMES.filter(g => g.status === 'active').slice(0, 10), []);

  const handlePlayClick = () => {
    const active = GAMES.filter(g => g.status === 'active');
    const randomGame = active[Math.floor(Math.random() * active.length)];
    if (randomGame) {
      navigate(`/games/${getGamePath(randomGame.id)}`);
    }
  };

  const startCarouselDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragControls.start(e);
  };

  const handleCarouselDragStart = () => {
    suppressCarouselClick.current = false;
    clearTimeout(suppressCarouselClickTimer.current);
  };

  const consumeSuppressedCarouselClick = () => {
    if (!suppressCarouselClick.current) return false;
    suppressCarouselClick.current = false;
    clearTimeout(suppressCarouselClickTimer.current);
    return true;
  };

  const handlePanelSelect = (index: number) => {
    if (consumeSuppressedCarouselClick()) return;
    setActiveIndex(index);
  };

  const handleCarouselLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (consumeSuppressedCarouselClick()) {
      e.preventDefault();
    }
    e.stopPropagation();
  };

  const handleGlobeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const wasSwipe = consumeSuppressedCarouselClick();

    if (activeIndex !== 1 || wasSwipe) {
      e.preventDefault();
    }

    if (activeIndex === 1 || wasSwipe) {
      e.stopPropagation();
    }
  };


  return (
    <main className="relative flex-grow bg-transparent w-full home-glow overflow-x-hidden select-none">
      <style>{`
        .home-glow h1 { text-shadow: 0 0 40px rgba(0,194,255,0.15), 0 0 80px rgba(0,194,255,0.08); }
        @keyframes star-twinkle { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        .home-stars { animation: star-twinkle 8s ease-in-out infinite; }
      `}</style>

      <SEO title="ExploreCapitals | Geography Games" description="Master world geography through fun games." isHomePage={true} />
      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <section className="relative overflow-hidden isolate w-full min-h-screen flex flex-col items-center justify-center pt-12 pb-24 md:pt-24 md:pb-10">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Mobile: Dense Sparkles */}
          <div 
            className="absolute inset-0 home-stars md:hidden" 
            style={{ 
              backgroundImage: [
                "radial-gradient(1.5px 1.5px at 13% 22%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(2px 2px at 42% 14%, rgba(255,255,255,0.9), transparent 60%)",
                "radial-gradient(1px 1px at 65% 33%, rgba(255,255,255,0.7), transparent 60%)",
                "radial-gradient(2px 2px at 80% 12%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(1.5px 1.5px at 15% 65%, rgba(255,255,255,0.6), transparent 60%)",
                "radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(2px 2px at 55% 75%, rgba(255,255,255,0.7), transparent 60%)",
                "radial-gradient(1.5px 1.5px at 75% 55%, rgba(255,255,255,0.9), transparent 60%)",
                "radial-gradient(1px 1px at 88% 85%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(2px 2px at 45% 45%, rgba(255,255,255,0.6), transparent 60%)",
                "radial-gradient(1.5px 1.5px at 5% 40%, rgba(255,255,255,0.7), transparent 60%)",
                "radial-gradient(1px 1px at 95% 30%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(2px 2px at 35% 25%, rgba(255,255,255,0.6), transparent 60%)",
                "radial-gradient(1.5px 1.5px at 10% 8%, rgba(255,255,255,0.7), transparent 60%)",
                "radial-gradient(1px 1px at 25% 90%, rgba(255,255,255,0.9), transparent 60%)",
                "radial-gradient(2px 2px at 50% 10%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(1.5px 1.5px at 85% 65%, rgba(255,255,255,0.6), transparent 60%)",
                "radial-gradient(1px 1px at 70% 95%, rgba(255,255,255,0.7), transparent 60%)",
                "radial-gradient(2px 2px at 20% 50%, rgba(255,255,255,0.8), transparent 60%)",
                "radial-gradient(1.5px 1.5px at 60% 85%, rgba(255,255,255,0.9), transparent 60%)",
                "radial-gradient(1px 1px at 40% 60%, rgba(255,255,255,0.7), transparent 60%)",
                "radial-gradient(2px 2px at 90% 45%, rgba(255,255,255,0.8), transparent 60%)"
              ].join(', '),
              backgroundSize: '100% 100%' 
            }} 
          />
          {/* Desktop: Simple Sparkles */}
          <div className="absolute inset-0 home-stars hidden md:block" style={{ backgroundImage: 'radial-gradient(1px 1px at 13% 22%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(1.5px 1.5px at 42% 14%, rgba(255,255,255,0.7), transparent 60%)', backgroundSize: '100% 100%' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,194,255,0.1)_0%,transparent_50%)]" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
          className="font-display font-black text-[clamp(1.8rem,9vw,3rem)] tracking-tight px-4 uppercase text-white mb-2 z-20 text-center"
        >
          Explore<span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
        </motion.h1>

        {/* THE HERO STACK CAROUSEL */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
          <motion.div
            className="flex items-center justify-center cursor-grab active:cursor-grabbing h-full touch-pan-y"
            drag="x"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ left: -2 * panelWidth, right: 0 }}
            dragMomentum={false}
            dragElastic={0.12}
            style={{ x }}
            onPointerDownCapture={startCarouselDrag}
            onDragStart={handleCarouselDragStart}
            onDragEnd={onDragEnd}
          >
            {/* Panel 0: Games */}
            <Panel index={0} activeIndex={activeIndex} scrollX={x} width={panelWidth} onClick={() => handlePanelSelect(0)}>
              <VerticalContent items={featuredGames} type="games" onLinkClick={handleCarouselLinkClick} />
            </Panel>

            {/* Panel 1: Globe */}
            <Panel index={1} activeIndex={activeIndex} scrollX={x} width={panelWidth} onClick={() => handlePanelSelect(1)}>
              <div className="relative flex justify-center items-center w-full h-full pointer-events-none">
                <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex-shrink-0">
                  <div className="w-full h-full animate-breathe">
                    <Link 
                      to="/map" 
                      onClick={handleGlobeClick}
                      draggable={false}
                      className="relative w-full h-full bg-sky/5 rounded-full border-2 border-white/20 flex items-center justify-center pointer-events-auto shadow-[inset_0_0_60px_rgba(0,194,255,0.15)] group"
                    >
                      <div className="absolute inset-[-15%] rounded-full bg-sky/15 blur-3xl animate-glow-soft pointer-events-none" />
                      <img 
                        src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon-new.png`} alt="Globe" 
                        className="w-[82%] h-[82%] object-contain animate-globe-glow relative z-10 transition-transform duration-700"
                        fetchPriority="high"
                        draggable="false"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Panel 2: Countries */}
            <Panel index={2} activeIndex={activeIndex} scrollX={x} width={panelWidth} onClick={() => handlePanelSelect(2)}>
              <VerticalContent items={COUNTRY_HIGHLIGHTS} type="countries" onLinkClick={handleCarouselLinkClick} />
            </Panel>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex gap-4 mt-6 z-20">
          {[0, 1, 2].map(i => (
            <button 
              key={i} 
              onClick={() => setActiveIndex(i)} 
              className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'bg-sky w-12' : 'bg-white/10 w-6'}`} 
            />
          ))}
        </div>

        {/* Play Button */}
        <div className="mt-6 z-20">
          <Button onClick={handlePlayClick} variant="primary" className="w-[85vw] max-w-[360px] py-5 text-xl uppercase tracking-[0.15em] font-black flex items-center justify-center shadow-premium">
            {t('home.hero.play')} <Play className="ml-3 fill-current" />
          </Button>
        </div>
      </section>
    </main>
  );
};

/* ── Panel Component ─────────────────────────────────────────── */

const Panel: React.FC<{ 
  index: number; activeIndex: number; scrollX: any; width: number; onClick: () => void; children: React.ReactNode 
}> = ({ index, activeIndex, scrollX, width, onClick, children }) => {
  const targetX = index * width;
  const relativeX = useTransform(scrollX, (val: number) => val + targetX);
  
  const scale = useTransform(relativeX, [-width, 0, width], [0.75, 1, 0.75]);
  const opacity = useTransform(relativeX, [-width, 0, width], [0.3, 1, 0.3]);
  const zIndex = useTransform(relativeX, [-width, 0, width], [10, 30, 10]);

  return (
    <motion.div
      style={{ 
        scale, 
        opacity, 
        x: targetX, 
        zIndex,
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
      className={`absolute flex items-center justify-center w-[280px] sm:w-[360px] h-full ${activeIndex === index ? 'z-30' : 'z-10 cursor-pointer'} will-change-transform`}
      onClick={() => activeIndex !== index && onClick()}
    >
      <div className="w-full h-full flex items-center justify-center pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
};

const VerticalContent: React.FC<{ 
  items: any[]; 
  type: 'games' | 'countries';
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = ({ items, type, onLinkClick }) => {
  // Duration proportional to items for consistent speed
  const duration = items.length * 5;

  const content = (
    <div className="flex flex-col gap-6 py-10 px-2">
      {items.map((item, i) => {
        const href = type === 'games'
          ? `/games/${getGamePath(item.id)}`
          : `/country/${toSlug(item.name)}`;
        const label = type === 'games'
          ? `Open ${item.title}`
          : `Open ${item.name} profile`;

        return (
          <Link
            key={i}
            to={href}
            aria-label={label}
            onClick={onLinkClick}
            draggable={false}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-3.5 flex flex-col gap-3 transform-gpu transition-all duration-300 hover:bg-white/10 hover:border-white/25 active:scale-[0.98]"
          >
            {type === 'games' ? (
              <>
                <img 
                  src={`${import.meta.env.BASE_URL}png/GAMES/${getGameImageName(item.id)}.png`} 
                  className="w-full aspect-[16/10] object-cover rounded-2xl shadow-lg" 
                  alt="" 
                  draggable="false"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}png/GAMES/capital-quiz.png`;
                  }}
                />
                <p className="text-[12px] font-black uppercase tracking-widest text-white/90 text-center truncate">{item.title}</p>
              </>
            ) : (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <span className="text-2xl drop-shadow-sm">{item.flag}</span>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[14px] font-black text-white uppercase tracking-tight truncate leading-none mb-1">{item.name}</p>
                    <p className="text-[10px] text-sky font-bold uppercase tracking-widest opacity-80">{item.region}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/30 font-bold tracking-widest mb-0.5">Capital</span>
                    <span className="text-[11px] text-white/90 font-medium truncate">{item.capital}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/30 font-bold tracking-widest mb-0.5">Population</span>
                    <span className="text-[11px] text-white/90 font-medium">{item.population}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/30 font-bold tracking-widest mb-0.5">Area</span>
                    <span className="text-[11px] text-white/90 font-medium">{item.area} km²</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/30 font-bold tracking-widest mb-0.5">Currency</span>
                    <span className="text-[11px] text-white/90 font-medium truncate">{item.currency}</span>
                  </div>
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div 
      className="w-full h-full overflow-hidden relative"
      style={{ 
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <motion.div 
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity
        }}
        className="flex flex-col will-change-transform"
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
};

export default Home;
