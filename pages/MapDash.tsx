
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Timer, Trophy, ArrowLeft, Map as MapIcon, Check, X, Plus, Minus, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useUser } from '../context/UserContext';
import { useLayout } from '../context/LayoutContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const getCountryCode = (emoji: string) => {
  if (!emoji) return '';
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

export default function MapDash() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | null>(null);
  const [wrongSelectionData, setWrongSelectionData] = useState<{ name: string, flagCode: string } | null>(null);
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);
  const [incorrectCountries, setIncorrectCountries] = useState<string[]>([]);
  const [hasReported, setHasReported] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const markerInstancesRef = useRef<Map<string, any>>(new Map());
  const feedbackTimeoutRef = useRef<any>(null);
  
  const gameStateRef = useRef(gameState);
  const targetCountryRef = useRef(targetCountry);
  const isTransitioningRef = useRef(isTransitioning);
  const lastResultRef = useRef(lastResult);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { targetCountryRef.current = targetCountry; }, [targetCountry]);
  useEffect(() => { isTransitioningRef.current = isTransitioning; }, [isTransitioning]);
  useEffect(() => { lastResultRef.current = lastResult; }, [lastResult]);

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
    const random = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
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
    setTimeLeft(60);
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
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 20 }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    MOCK_COUNTRIES.forEach(country => {
      const icon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([country.lat, country.lng], { icon: icon });
      markerInstancesRef.current.set(country.id, marker);

      marker.on('click', (e: any) => {
        L.DomEvent.stopPropagation(e);
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
            flagCode: getCountryCode(country.flag) 
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
        durationSeconds: 60,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, correctCountries, incorrectCountries]);

  return (
    <div className="relative h-[100dvh] min-h-screen w-full z-40 bg-surface-dark overflow-hidden font-sans [-webkit-overflow-scrolling:touch]">
      <SEO title="Map Dash" description="Locate the nation on the map." />
      
      <style>{`
        .marker-pin { transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease !important; }
        
        .marker-correct .marker-pin { 
          background-color: #34C759 !important; 
          border: 2px solid rgba(255,255,255,0.8) !important; 
          transform: scale(1.5);
          box-shadow: 0 0 20px rgba(52, 199, 89, 0.6), 0 4px 12px rgba(0,0,0,0.3) !important;
        }

        .marker-incorrect .marker-pin { 
          background-color: #FF3B30 !important; 
          border: 2px solid rgba(255,255,255,0.8) !important; 
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 4px 12px rgba(0,0,0,0.3) !important;
          animation: marker-shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes marker-shake {
          10%, 90% { transform: scale(1.2) translate3d(-1px, 0, 0); }
          20%, 80% { transform: scale(1.2) translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: scale(1.2) translate3d(-4px, 0, 0); }
          40%, 60% { transform: scale(1.2) translate3d(4px, 0, 0); }
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
                <button className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-dark/90 backdrop-blur-xl hover:bg-surface-dark rounded-xl flex items-center justify-center text-white/80 hover:text-white shadow-glass transition-all border border-white/20 group active:scale-95">
                  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>

            {/* Score and Timer - positioned below nav bar, matching back button height */}
            <div className="absolute top-[4.5rem] sm:top-20 md:top-24 right-3 sm:right-4 md:right-6 z-30 flex gap-1.5 sm:gap-2 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-surface-dark/90 backdrop-blur-xl rounded-xl shadow-glass border border-white/20 h-9 sm:h-10 px-2.5 sm:px-3 md:px-4 flex items-center gap-1.5 sm:gap-2">
                <Trophy size={14} className="sm:w-4 sm:h-4 text-warning drop-shadow-glow flex-shrink-0" />
                <span className="font-display font-black text-xs sm:text-sm md:text-base text-white tabular-nums relative z-10 drop-shadow-md">{score}</span>
              </div>
              
              <div className={`rounded-xl shadow-inner h-9 sm:h-10 px-2.5 sm:px-3 md:px-4 flex items-center gap-1.5 sm:gap-2 transition-all duration-300 relative ${timeLeft <= 10 ? 'bg-white border-2 border-error animate-timer-panic' : 'bg-surface-dark/90 backdrop-blur-xl border border-white/20'}`}>
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 rounded-[inherit]" />
                <Timer size={14} className={`sm:w-4 sm:h-4 relative z-10 flex-shrink-0 ${timeLeft <= 10 ? "text-error" : "text-sky"}`} />
                <span className={`font-display font-black text-xs sm:text-sm md:text-base tabular-nums min-w-[32px] sm:min-w-[36px] relative z-10 drop-shadow-md ${timeLeft <= 10 ? 'text-error' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Zoom Controls - hidden on mobile/tablet, visible on desktop */}
            <div className="absolute bottom-32 sm:bottom-36 md:bottom-40 right-3 sm:right-4 md:right-6 z-30 hidden lg:flex flex-col gap-1.5 sm:gap-2 pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-500">
              <button 
                onClick={handleZoomIn}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-dark/90 backdrop-blur-xl hover:bg-surface-dark rounded-xl flex items-center justify-center text-white shadow-glass transition-all border border-white/20 relative overflow-hidden group active:scale-95"
              >
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                <Plus size={18} className="sm:w-5 sm:h-5 relative z-10" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-dark/90 backdrop-blur-xl hover:bg-surface-dark rounded-xl flex items-center justify-center text-white shadow-glass transition-all border border-white/20 relative overflow-hidden group active:scale-95"
              >
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                <Minus size={18} className="sm:w-5 sm:h-5 relative z-10" />
              </button>
            </div>

            {/* Target Country Card - centered at bottom with proper safe area */}
            {targetCountry && (
              <div 
                key={`${targetCountry.id}-${feedbackKey}`}
                className={`absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[320px] sm:max-w-[360px] md:max-w-sm z-20 pointer-events-none transform transition-all duration-500 opacity-100 translate-y-0 ${lastResult === 'incorrect' ? 'card-shake' : ''}`}
              >
                <div 
                  className={`pointer-events-auto backdrop-blur-2xl rounded-2xl sm:rounded-[1.5rem] md:rounded-[2rem] shadow-glass py-8 px-5 sm:py-10 sm:px-6 md:py-10 md:px-6 lg:py-6 text-center relative transition-all duration-200 overflow-hidden
                    ${lastResult === 'correct' ? 'bg-accent border-2 sm:border-[3px] md:border-4 border-white' : 
                      lastResult === 'incorrect' ? 'bg-error border-2 sm:border-[3px] md:border-4 border-white' : 
                      'bg-surface-dark/95 border-2 sm:border-[3px] md:border-4 border-white/40'}`}
                >
                  {/* Premium Glossy Overlays */}
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  
                  <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 md:gap-1.5 relative z-10">
                    <p className={`text-[10px] sm:text-xs md:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] ${lastResult ? 'text-white drop-shadow-md' : 'text-sky drop-shadow-glow-sky'}`}>
                      FIND COUNTRY
                    </p>
                    
                    <div className="flex flex-col items-center justify-center gap-2.5 sm:gap-3 md:gap-3">
                      <h2 className="text-2xl sm:text-3xl md:text-2xl font-display font-black text-white leading-tight tracking-tighter uppercase drop-shadow-2xl line-clamp-1">{targetCountry.name}</h2>
                      <div className="w-14 h-10 sm:w-16 sm:h-11 md:w-12 md:h-8 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-50" />
                        <img 
                          src={`https://flagcdn.com/w80/${getCountryCode(targetCountry.flag)}.png`} 
                          alt={`${targetCountry.name} Flag`} 
                          className="w-full h-full object-contain filter drop-shadow-2xl relative z-10 brightness-[1.05]" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
      )}

      {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-[2000] flex items-center justify-center bg-surface-dark/40 backdrop-blur-xl p-3 sm:p-4"
          >
            <div className="max-w-[calc(100%-24px)] sm:max-w-sm md:max-w-md w-full bg-surface-dark/95 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-glass p-5 sm:p-6 md:p-8 text-center border-2 border-white/20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-sky/20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 md:mb-8 text-sky shadow-glow-sky border border-white/30">
                <MapIcon size={28} className="sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-1.5 sm:mb-2 uppercase tracking-tighter drop-shadow-md">Map Dash</h1>
              <p className="text-white/60 text-[9px] sm:text-[10px] mb-6 sm:mb-8 md:mb-10 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed">Find the nations on the map.</p>
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <Button onClick={startGame} size="md" className="w-full h-12 sm:h-14 md:h-16 text-base sm:text-lg md:text-xl uppercase tracking-wider sm:tracking-widest shadow-glow-sky font-black">PLAY <Play size={18} className="sm:w-5 sm:h-5" fill="currentColor" /></Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] group relative z-20 pointer-events-auto py-2"
                >
                  <ArrowLeft size={12} className="sm:w-3.5 sm:h-3.5 transition-transform" /> 
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
      )}


      {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-[2000] flex items-center justify-center bg-surface-dark/60 backdrop-blur-2xl p-3 sm:p-4"
          >
            <div className="max-w-[calc(100%-24px)] sm:max-w-sm md:max-w-md w-full bg-surface-dark/95 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-glass p-5 sm:p-7 md:p-10 text-center border-2 border-white/20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 md:mb-8 text-warning shadow-glow-warning border border-white/30">
                <Trophy size={28} className="sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10" />
              </div>
              <h1 className="text-2xl sm:text-[1.75rem] md:text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter drop-shadow-md">Finished</h1>
              <p className="text-white/60 mb-4 sm:mb-5 md:mb-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] drop-shadow-sm">Final Score</p>
              <div className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-6 sm:mb-8 md:mb-10 drop-shadow-glow-sky tabular-nums">{score}</div>
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <Button onClick={startGame} size="md" className="w-full h-12 sm:h-14 md:h-16 text-base sm:text-lg md:text-xl uppercase tracking-wider sm:tracking-widest shadow-glow-sky font-black">Play Again</Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] group relative z-20 pointer-events-auto py-2"
                >
                  <ArrowLeft size={12} className="sm:w-3.5 sm:h-3.5 transition-transform" /> 
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
      <FeedbackOverlay 
        type={lastResult} 
        triggerKey={feedbackKey} 
        subText={lastResult === 'incorrect' ? (wrongSelectionData?.name || undefined) : undefined} 
        incorrectFlagCode={lastResult === 'incorrect' ? (wrongSelectionData?.flagCode || undefined) : undefined}
      />
    </div>
  );
}
