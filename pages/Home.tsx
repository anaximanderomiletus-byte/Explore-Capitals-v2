import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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

/* ── Ember Particle System ────────────────────────────────────── */

interface Ember {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  vx: number;
  vy: number;
  driftPhase: number;
  driftSpeed: number;
  driftAmplitude: number;
  pulsePhase: number;
  pulseSpeed: number;
  life: number;
  maxLife: number;
}

const createEmber = (w: number, h: number): Ember => {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: 1 + Math.random() * 2,
    baseOpacity: 0.3 + Math.random() * 0.6,
    opacity: 0,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -(0.08 + Math.random() * 0.25),
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.3 + Math.random() * 0.6,
    driftAmplitude: 15 + Math.random() * 30,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.8 + Math.random() * 1.5,
    life: Math.random() * 1000,       // start at random phase
    maxLife: 600 + Math.random() * 800, // frames
  };
};

const EmberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const embersRef = useRef<Ember[]>([]);
  const rafRef = useRef<number>(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 35 : 50;

  const drawLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const embers = embersRef.current;

    for (let i = 0; i < embers.length; i++) {
      const e = embers[i];
      e.life++;

      // Lifecycle fade-in / fade-out
      const lifeRatio = e.life / e.maxLife;
      let lifeFade = 1;
      if (lifeRatio < 0.1) lifeFade = lifeRatio / 0.1;
      else if (lifeRatio > 0.85) lifeFade = (1 - lifeRatio) / 0.15;

      // Pulse glow
      const pulse = 0.5 + 0.5 * Math.sin(e.pulsePhase + e.life * 0.02 * e.pulseSpeed);

      e.opacity = e.baseOpacity * lifeFade * (0.4 + 0.6 * pulse);

      // Horizontal drift (sinusoidal sway)
      const drift = Math.sin(e.driftPhase + e.life * 0.006 * e.driftSpeed) * e.driftAmplitude * 0.01;

      e.x += e.vx + drift;
      e.y += e.vy;

      // Respawn if off-screen or expired
      if (e.life > e.maxLife || e.y < -10 || e.x < -10 || e.x > w + 10) {
        const fresh = createEmber(w, h);
        fresh.y = h + 10 + Math.random() * 40; // start from bottom
        fresh.life = 0;
        embers[i] = fresh;
        continue;
      }

      // Draw the ember with a soft glow
      const currentSize = e.size * (0.7 + 0.3 * pulse);

      // Outer glow
      const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, currentSize * 3);
      glow.addColorStop(0, `rgba(255, 255, 255, ${e.opacity * 0.6})`);
      glow.addColorStop(0.3, `rgba(220, 240, 255, ${e.opacity * 0.25})`);
      glow.addColorStop(1, `rgba(200, 230, 255, 0)`);

      ctx.beginPath();
      ctx.arc(e.x, e.y, currentSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core bright point
      ctx.beginPath();
      ctx.arc(e.x, e.y, currentSize * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, e.opacity * 1.3)})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(drawLoop);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();

    // Initialize embers spread across the screen
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    embersRef.current = Array.from({ length: PARTICLE_COUNT }, () => createEmber(w, h));

    rafRef.current = requestAnimationFrame(drawLoop);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [drawLoop, PARTICLE_COUNT]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

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
      `}</style>

      <SEO title="ExploreCapitals | Geography Games" description="Master world geography through fun games." isHomePage={true} />
      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <section className="relative overflow-hidden isolate w-full min-h-screen flex flex-col items-center justify-center pt-12 pb-24 md:pt-24 md:pb-10">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Floating Ember Sparkles */}
          <EmberCanvas />
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
                      <div className="w-[82%] h-[82%] rounded-full animate-globe-glow relative z-10 flex items-center justify-center">
                        <img 
                          src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon-new.png`} alt="Globe" 
                          className="w-full h-full object-contain transition-transform duration-700"
                          fetchPriority="high"
                          decoding="async"
                          draggable="false"
                        />
                      </div>
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
                  loading="lazy"
                  decoding="async"
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
