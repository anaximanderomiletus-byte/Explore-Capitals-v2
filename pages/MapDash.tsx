
import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Timer, Trophy, ArrowLeft, Map as MapIcon, Check, X, Plus, Minus, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useUser } from '../context/UserContext';
import { useLayout } from '../context/LayoutContext';
import { getCountryCode, getFlagUrl } from '../utils/flags';
import TimeSelector from '../components/TimeSelector';
import GameSideAds from '../components/GameSideAds';
import Breadcrumbs from '../components/Breadcrumbs';

export default function MapDash() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | null>(null);
  const [wrongSelectionData, setWrongSelectionData] = useState<{ name: string, flagCode: string } | null>(null);
  const [clickPoint, setClickPoint] = useState<{ x: number, y: number } | null>(null);
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);
  const [incorrectCountries, setIncorrectCountries] = useState<string[]>([]);
  const [hasReported, setHasReported] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading, setHideFooter } = useLayout();

  useEffect(() => {
    setPageLoading(false);
    setHideFooter(true); // Hide footer on Map Dash game
    
    // Lock body scroll to prevent scrolling off the map
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    return () => {
      setHideFooter(false); // Show footer again when leaving
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [setPageLoading, setHideFooter]);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const markerInstancesRef = useRef<Map<string, any>>(new Map());
  const feedbackTimeoutRef = useRef<any>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const gameStateRef = useRef(gameState);
  const targetCountryRef = useRef(targetCountry);
  const isTransitioningRef = useRef(isTransitioning);
  const lastResultRef = useRef(lastResult);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { targetCountryRef.current = targetCountry; }, [targetCountry]);
  useEffect(() => { isTransitioningRef.current = isTransitioning; }, [isTransitioning]);
  useEffect(() => { lastResultRef.current = lastResult; }, [lastResult]);

  // Clamp feedback toast so it never overflows the screen edges
  useLayoutEffect(() => {
    const el = feedbackRef.current;
    if (!el || !clickPoint || !lastResult) return;

    const parentEl = el.offsetParent as HTMLElement;
    if (!parentEl) return;

    const parentW = parentEl.clientWidth;
    const parentH = parentEl.clientHeight;
    const elW = el.offsetWidth;
    const elH = el.offsetHeight;
    const pad = 12;

    let left = clickPoint.x - elW / 2;
    let top = clickPoint.y - 60;

    left = Math.max(pad, Math.min(left, parentW - elW - pad));
    top = Math.max(pad, Math.min(top, parentH - elH - pad));

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }, [clickPoint, feedbackKey, lastResult]);

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('finished');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const resetAllMarkerStyles = useCallback(() => {
    markerInstancesRef.current.forEach((marker) => {
      const iconElement = marker.getElement();
      if (iconElement) {
        iconElement.classList.remove('marker-correct', 'marker-incorrect');
      }
    });
  }, []);

  const generateTarget = useCallback(() => {
    const random = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    setTargetCountry(random);
    setLastResult(null);
    setWrongSelectionData(null);
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
    resetAllMarkerStyles();
  }, [resetAllMarkerStyles]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameDuration);
    setCorrectCountries([]);
    setIncorrectCountries([]);
    setHasReported(false);
    setLastResult(null);
    setFeedbackKey(0);
    generateTarget();
    setGameState('playing');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      mapInstanceRef.current.flyTo([20, 0], 2.5, { duration: 1.5 });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current || mapInstanceRef.current) {
      if (!L && mapRef.current && !mapInstanceRef.current) {
        // Retry if L is missing but we're ready to init
        const retryTimer = setTimeout(() => {
          setScore(s => s); // Trigger a re-render
        }, 500);
        return () => clearTimeout(retryTimer);
      }
      return;
    }

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2.5,
      zoomControl: false,
      attributionControl: false,
      minZoom: 2,
      maxZoom: 18,
      worldCopyJump: true,
      // Allow infinite horizontal scrolling but lock vertical bounds
      maxBounds: [[-85, -5000], [85, 5000]],
      maxBoundsViscosity: 1.0,
      preferCanvas: false,
      // Tighter tap tolerance so panning doesn't accidentally trigger marker clicks
      tapTolerance: 10,
      // Disable marker animation during zoom to prevent "floating" on iOS Safari.
      // Without this, Leaflet applies CSS transforms to markers during the zoom
      // transition which desync from tile positions, making dots drift.
      markerZoomAnimation: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 20 }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    COUNTRIES.forEach(country => {
      const icon = L.divIcon({
        className: 'custom-map-marker mapdash-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([country.lat, country.lng], { icon: icon });
      markerInstancesRef.current.set(country.id, marker);
      
      // Use Leaflet's built-in click event only - it properly distinguishes
      // taps from pan/scroll gestures on mobile, preventing accidental selections
      marker.on('click', (e: any) => {
        if (e && e.originalEvent) {
          e.originalEvent.stopPropagation();
        }
        if (e && typeof L.DomEvent?.stopPropagation === 'function') {
          L.DomEvent.stopPropagation(e);
        }
        
        const currentTarget = targetCountryRef.current;
        if (gameStateRef.current !== 'playing' || !currentTarget || isTransitioningRef.current) return;

        // Reset previous feedback state immediately on click
        if (feedbackTimeoutRef.current) {
          clearTimeout(feedbackTimeoutRef.current);
          feedbackTimeoutRef.current = null;
        }
        
        // Reset marker styles
        resetAllMarkerStyles();
        
        const el = marker.getElement();
        const isCorrect = country.id === currentTarget.id;
        
        // Use a unique ID for this specific click to force a remount of the feedback
        const clickId = performance.now();
        setFeedbackKey(clickId);
        
        const containerPt = e.containerPoint || { x: 0, y: 0 };
        setClickPoint({ x: containerPt.x, y: containerPt.y });

        if (isCorrect) {
          setLastResult('correct');
          setWrongSelectionData(null);
          setScore(s => s + 50);
          setCorrectCountries(prev => [...prev, country.id]);
          setIsTransitioning(true);
          if (el) el.classList.add('marker-correct');

          feedbackTimeoutRef.current = setTimeout(() => {
            generateTarget();
            setIsTransitioning(false);
            feedbackTimeoutRef.current = null;
          }, 700);
        } else {
          setLastResult('incorrect');
          setWrongSelectionData({
            name: country.name,
            flagCode: getCountryCode(country.flag),
          });
          setScore(s => Math.max(0, s - 10));
          setIncorrectCountries(prev => [...prev, country.id]);
          if (el) el.classList.add('marker-incorrect');
          
          feedbackTimeoutRef.current = setTimeout(() => { 
            if (el) el.classList.remove('marker-incorrect');
            setLastResult(null);
            setWrongSelectionData(null);
            feedbackTimeoutRef.current = null;
          }, 1000);
        }
      });

      marker.addTo(markersLayerRef.current);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markerInstancesRef.current.clear();
    };
  }, [generateTarget]);

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'map-dash',
        score,
        correctCountries,
        incorrectCountries,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, correctCountries, incorrectCountries, timeLeft, gameDuration]);

  return (
    <div className="relative h-screen h-[100svh] w-full z-40 bg-surface-dark overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}png/GAMES/map-dash.png`} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
      </div>
      <SEO title="Map Dash - Games" description="Find countries on the world map as fast as you can. Test your geography skills by locating nations before time runs out." />

      <style>{`
        .mapdash-marker .marker-pin {
          transform-origin: center center;
          transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
        }

        .marker-correct .marker-pin {
          background-color: #34C759 !important;
          border-color: rgba(255,255,255,0.8) !important;
          box-shadow: 0 0 12px rgba(52, 199, 89, 0.5) !important;
        }

        .marker-incorrect .marker-pin {
          background-color: #FF3B30 !important;
          border-color: rgba(255,255,255,0.8) !important;
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;
        }

        @keyframes card-shake {
          10%, 90% { transform: translateX(-1%) translate(-50%, 0); }
          20%, 80% { transform: translateX(1%) translate(-50%, 0); }
          30%, 50%, 70% { transform: translateX(-2%) translate(-50%, 0); }
          40%, 60% { transform: translateX(2%) translate(-50%, 0); }
        }

        .card-shake {
          animation: card-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      <div ref={mapRef} className="absolute inset-0 z-0 focus:outline-none bg-surface-dark" />

      <AnimatePresence mode="wait">
      {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            {/* Back Button - positioned below nav bar */}
            <div className="absolute top-[4.5rem] sm:top-20 md:top-24 left-3 sm:left-4 md:left-6 z-30 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-500">
              <Link to="/games">
                <button className="game-back-btn w-9 h-9 sm:w-10 sm:h-10 bg-surface-dark/90 backdrop-blur-xl hover:bg-surface-dark rounded-xl flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/20 group active:scale-95">
                  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>

            {/* Score and Timer - positioned below nav bar, matching back button height */}
            <div className="absolute top-[4.5rem] sm:top-20 md:top-24 right-3 sm:right-4 md:right-6 z-30 flex gap-1.5 sm:gap-2 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-surface-dark/90 backdrop-blur-xl rounded-xl border border-white/20 h-9 sm:h-10 px-2.5 sm:px-3 md:px-4 flex items-center gap-1.5 sm:gap-2">
                <Trophy size={14} className="sm:w-4 sm:h-4 text-warning flex-shrink-0" />
                <span className="font-display font-black text-xs sm:text-sm md:text-base text-white tabular-nums relative z-10 drop-shadow-md">{score}</span>
              </div>
              
              <div className={`rounded-xl shadow-inner h-9 sm:h-10 px-2.5 sm:px-3 md:px-4 flex items-center gap-1.5 sm:gap-2 transition-all duration-300 relative ${timeLeft <= 10 ? 'bg-white border-2 border-error animate-timer-panic' : 'bg-surface-dark/90 backdrop-blur-xl border-2 border-white/20'}`}>
                <Timer size={14} className={`sm:w-4 sm:h-4 relative z-10 flex-shrink-0 ${timeLeft <= 10 ? "text-error" : "text-sky"}`} />
                <span className={`font-display font-black text-xs sm:text-sm md:text-base tabular-nums min-w-[32px] sm:min-w-[36px] relative z-10 drop-shadow-md ${timeLeft <= 10 ? "text-error" : "text-white"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Zoom Controls - hidden on mobile/tablet, visible on desktop */}
            <div className="absolute bottom-20 sm:bottom-22 md:bottom-24 right-3 sm:right-4 md:right-6 z-30 hidden lg:flex flex-col gap-1.5 sm:gap-2 pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-500">
              <button 
                onClick={handleZoomIn}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-dark/90 backdrop-blur-xl hover:bg-surface-dark rounded-xl flex items-center justify-center text-white transition-all border border-white/20 relative overflow-hidden group active:scale-95"
              >
                <Plus size={18} className="sm:w-5 sm:h-5 relative z-10" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-dark/90 backdrop-blur-xl hover:bg-surface-dark rounded-xl flex items-center justify-center text-white transition-all border border-white/20 relative overflow-hidden group active:scale-95"
              >
                <Minus size={18} className="sm:w-5 sm:h-5 relative z-10" />
              </button>
            </div>

            {/* Target Country Card - compact bottom bar */}
            {targetCountry && (
              <div
                key={`${targetCountry.id}-${feedbackKey}`}
                className={`absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transform transition-all duration-300 ${lastResult === 'incorrect' ? 'card-shake' : ''}`}
              >
                <div
                  className={`pointer-events-auto backdrop-blur-2xl rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 relative transition-all duration-200 overflow-hidden flex items-center gap-3.5 sm:gap-4
                    ${lastResult === 'correct' ? 'bg-accent border-2 border-accent shadow-[0_8px_32px_rgba(52,199,89,0.4)]' :
                      lastResult === 'incorrect' ? 'bg-error border-2 border-error shadow-[0_8px_32px_rgba(255,59,48,0.4)]' :
                      'bg-surface-dark/90 border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'}`}
                >
                  {/* Glossy top edge */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Flag */}
                  <div className="w-10 h-7 sm:w-12 sm:h-8 flex items-center justify-center relative shrink-0">
                    <img
                      src={getFlagUrl(targetCountry.flag)}
                      alt={`${targetCountry.name} Flag`}
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col relative z-10">
                    <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] leading-none mb-1 ${lastResult ? 'text-white/80' : 'text-sky'}`}>
                      FIND
                    </p>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-display font-black text-white leading-none tracking-tighter uppercase drop-shadow-lg whitespace-nowrap">{targetCountry.name}</h2>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
      )}

      {gameState === 'start' && (
          <motion.div
            key="start"
            initial={false}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-[2000] flex px-3 sm:px-4 py-16 overflow-y-auto"
            style={{ background: '#0F172A' }}
          >
            {/* Blurred game thumbnail — matches every other game lobby */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src={`${import.meta.env.BASE_URL}png/GAMES/map-dash.png`} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
            </div>

            {/* Background Decor — matches other game lobbies */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/15 rounded-full blur-[180px] opacity-80 animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-sky/5 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
            </div>

            <GameSideAds />
            <div className="m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
              <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Games', href: '/games' }, { label: 'Map Dash' }]} />
              <div className="game-lobby-card w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/40 overflow-hidden group">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-8 border border-white/30 relative overflow-hidden">
                  <img src={`${import.meta.env.BASE_URL}png/GAMES/map-dash.png`} alt="Map Dash" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Map Dash</h1>
                <p className="text-white/70 text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed">Find the nations on the map.</p>
                <div className="mb-6"><TimeSelector value={gameDuration} onChange={setGameDuration} /></div>
                <div className="flex flex-col gap-6">
                  <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest border border-white/20 font-black">PLAY <Play size={20} fill="currentColor" /></Button>
                  <button
                    onClick={() => navigate('/games')}
                    className="inline-flex items-center justify-center gap-2 text-white/50 hover:text-sky-light transition-all font-black uppercase tracking-[0.3em] text-[10px] group/hub relative z-20 pointer-events-auto"
                  >
                    <ArrowLeft size={14} className="group-hover/hub:-translate-x-1 transition-transform" />
                    Back to Games
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
      )}


        {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.3, y: -300, rotate: -8 }}
            animate={{
              opacity: [0, 1, 1, 1, 1],
              scale: [0.3, 1.15, 0.95, 1.05, 1],
              y: [-300, 20, -15, 5, 0],
              rotate: [-8, 4, -3, 1, 0]
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.45, 0.65, 0.85, 1],
              ease: "easeOut"
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="absolute inset-0 z-[2000] flex px-3 sm:px-4 py-16 overflow-y-auto"
            style={{ background: '#0F172A' }}
          >
            {/* Blurred game thumbnail — matches every other game lobby */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src={`${import.meta.env.BASE_URL}png/GAMES/map-dash.png`} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
            </div>

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/15 rounded-full blur-[180px] opacity-80 animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-sky/5 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
            </div>

            <GameSideAds />
            <div className="m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
              <div className="w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/40 overflow-hidden group">
                <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-white/40 relative overflow-hidden">
                  <Trophy size={36} className="relative z-10 drop-shadow-lg" />
                </div>
                <h2 className="text-5xl font-display font-black text-white mb-4 uppercase tracking-tighter drop-shadow-md">FINISHED!</h2>
                <p className="text-white/60 mb-6 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Final Score</p>
                <div className="text-7xl font-display font-black text-white mb-8 tabular-nums tracking-tighter">{score}</div>
                <div className="flex flex-col gap-6">
                  <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest border border-white/20 font-black">Play Again <Play size={20} fill="currentColor" /></Button>
                  <button
                    onClick={() => navigate('/games')}
                    className="inline-flex items-center justify-center gap-2 text-white/50 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group/link relative z-20 pointer-events-auto"
                  >
                    <ArrowLeft size={14} className="group-hover/link:-translate-x-1 transition-transform" />
                    Back to Games
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
      {/* Inline feedback toast - compact, doesn't block the map */}
      <AnimatePresence>
        {lastResult && gameState === 'playing' && (
          <motion.div
            ref={feedbackRef}
            key={`feedback-${feedbackKey}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[9999] pointer-events-none"
            style={clickPoint
              ? { left: `${clickPoint.x}px`, top: `${Math.max(10, clickPoint.y - 60)}px` }
              : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className={`flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border-2 backdrop-blur-xl shadow-lg ${
              lastResult === 'correct'
                ? 'bg-accent/90 border-white/60 shadow-accent/30'
                : 'bg-error/90 border-white/60 shadow-error/30'
            }`}>
              {lastResult === 'correct' ? (
                <Check size={18} className="text-white shrink-0" strokeWidth={3} />
              ) : (
                <X size={18} className="text-white shrink-0" strokeWidth={3} />
              )}
              <span className="text-white font-display font-black text-sm sm:text-base uppercase tracking-wide">
                {lastResult === 'correct' ? 'Correct!' : 'Wrong'}
              </span>
              {lastResult === 'incorrect' && wrongSelectionData && (
                <>
                  <span className="text-white/50 font-black text-xs">•</span>
                  <span className="text-white/80 font-bold text-xs sm:text-sm uppercase tracking-tight truncate max-w-[120px] sm:max-w-[160px]">
                    {wrongSelectionData.name}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
