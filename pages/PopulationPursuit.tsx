
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Users, Check, X, TrendingUp, TrendingDown, Play } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const getNumericValue = (str: string) => {
  if (!str) return 0;
  const value = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (str.includes('B')) return value * 1_000_000_000;
  if (str.includes('M')) return value * 1_000_000;
  if (str.includes('K')) return value * 1_000;
  return value;
};

// Helper to calculate ISO code from emoji flag
const getCountryCode = (emoji: string) => {
    return Array.from(emoji)
        .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
        .join('');
};

export default function PopulationPursuit() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [countryA, setCountryA] = useState<Country | null>(null);
  const [countryB, setCountryB] = useState<Country | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgErrorA, setImgErrorA] = useState(false);
  const [imgErrorB, setImgErrorB] = useState(false);
  const [incorrectCountries, setIncorrectCountries] = useState<string[]>([]);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  // Pre-calculate numeric values for all countries to avoid lag
  const countriesWithNumericPop = useMemo(() => {
    return MOCK_COUNTRIES.map(c => ({
      ...c,
      numericPop: getNumericValue(c.population)
    }));
  }, []);

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
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

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'population-pursuit',
        score,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const generateRound = useCallback(() => {
    setResult(null);
    setSelectedId(null);
    setImgErrorA(false);
    setImgErrorB(false);
    
    const idxA = Math.floor(Math.random() * countriesWithNumericPop.length);
    let idxB = Math.floor(Math.random() * countriesWithNumericPop.length);
    while (idxB === idxA) idxB = Math.floor(Math.random() * countriesWithNumericPop.length);
    
    setCountryA(countriesWithNumericPop[idxA]);
    setCountryB(countriesWithNumericPop[idxB]);

    // Preload next potential flags to reduce lag
    const preloadFlags = () => {
      const nextIdx1 = Math.floor(Math.random() * countriesWithNumericPop.length);
      const nextIdx2 = Math.floor(Math.random() * countriesWithNumericPop.length);
      const flags = [
        `https://flagcdn.com/w320/${getCountryCode(countriesWithNumericPop[nextIdx1].flag)}.png`,
        `https://flagcdn.com/w320/${getCountryCode(countriesWithNumericPop[nextIdx2].flag)}.png`
      ];
      flags.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadFlags();
  }, [countriesWithNumericPop]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setHasReported(false);
    setResult(null);
    setFeedbackKey(0);
    generateRound();
    setGameState('playing');
  };

  const handleChoice = (selected: Country) => {
    if (result || !countryA || !countryB) return;
    
    setSelectedId(selected.id);
    const popA = (countryA as any).numericPop;
    const popB = (countryB as any).numericPop;
    const selectedPop = (selected as any).numericPop;
    const isCorrect = selectedPop === Math.max(popA, popB);
    
    setResult(isCorrect ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (isCorrect) setScore(s => s + 10);
    
    // Snappier transition to next round
    setTimeout(generateRound, 700);
  };

    return (
    <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex items-center justify-center px-4"
          >
        <SEO title="Population Pursuit" description="Which country has more people?" />
        
        {/* Background Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
        </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/20 relative z-10 overflow-hidden">
          <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky border border-white/30 relative overflow-hidden">
            <Users size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Population Pursuit</h1>
          <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Choose the larger population.</p>
            <div className="flex flex-col gap-6">
            <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">PLAY <Play size={20} fill="currentColor" /></Button>
            <button 
              onClick={() => navigate('/games')}
              className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group relative z-20 pointer-events-auto"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Games
            </button>
          </div>
        </div>
          </motion.div>
        )}


        {gameState === 'playing' && countryA && countryB && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col px-3 md:px-4 pt-20 pb-4 md:pb-6 overflow-hidden"
          >
      <SEO title="Playing Population Pursuit" description="Choose the larger population." />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
      <div className="max-w-5xl mx-auto w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
         <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
           <ArrowLeft size={18} className="transition-transform" />
         </Link>

         {/* Game title - flexbox centered, will shrink if needed */}
         <div className="flex-1 flex flex-col items-center justify-center min-w-0">
            <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Population Pursuit</h1>
            <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
         </div>

         {/* Spacer to balance the back button */}
         <div className="w-[42px] shrink-0" />
      </div>

       <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 overflow-hidden relative z-10 p-3 md:p-6">
          
          {/* Points and Timer - Responsive layout for all screen sizes */}
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4 relative z-20 shrink-0">
             <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner bg-warning/20 border border-warning/40 relative shrink-0">
                <Trophy size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-warning drop-shadow-md relative z-10" />
                <span className="font-display font-black text-base sm:text-lg md:text-xl text-white tabular-nums drop-shadow-sm relative z-10">{score}</span>
             </div>
             <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner transition-all duration-300 relative shrink-0 ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border border-white/30'}`}>
                <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`}><Timer size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" /></div>
                <span className={`font-display font-black text-base sm:text-lg md:text-xl tabular-nums min-w-[28px] sm:min-w-[32px] md:min-w-[36px] relative z-10 drop-shadow-sm ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
             </div>
          </div>

          <div className="flex-1 flex flex-col px-0 md:px-2 relative z-10">
                   {/* Question Text */}
                   <div className="flex flex-col items-center justify-center mb-3 md:mb-4 shrink-0">
                      <p className="text-sky-light font-black text-[9px] md:text-xs uppercase tracking-[0.3em]">Which country has the</p>
                      <h2 className="text-white font-display font-black text-xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">Larger Population?</h2>
                   </div>

                   <AnimatePresence mode="wait">
                     <motion.div
                       key={countryA?.id + (countryB?.id || '')}
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 1.02 }}
                       transition={{ duration: 0.3 }}
                       className="w-full h-full grid grid-cols-2 gap-3 md:gap-5 max-w-xl md:max-w-4xl mx-auto"
                     >
              {[countryA, countryB].map((country, idx) => {
                         if (!country) return null;
                const other = idx === 0 ? countryB : countryA;
                const popCurrent = (country as any).numericPop;
                const popOther = (other as any).numericPop;
                const isWinner = popCurrent >= popOther;
                const isA = idx === 0;
                const hasError = isA ? imgErrorA : imgErrorB;
                const setHasError = isA ? setImgErrorA : setImgErrorB;
                const code = getCountryCode(country.flag);
                const isSelected = selectedId === country.id;
                const isWrong = isSelected && !isWinner;
                
                // No hover styles - prevents "pre-highlighted" appearance on touch devices
                let cardStyle = "bg-white/5 border border-white/10 active:bg-white/15 active:border-sky/50";
                let titleStyle = "text-white/80";
                  
                if (result) {
                    if (isWinner) {
                        cardStyle = "bg-accent/60 border-2 border-accent z-20";
                        titleStyle = "text-white";
                    } else if (isSelected) {
                        cardStyle = "bg-red-500/60 border-2 border-red-500 z-10";
                        titleStyle = "text-white";
                    } else {
                        cardStyle = "bg-black/20 border-white/5 opacity-30 z-0";
                        titleStyle = "text-white/20";
                    }
                }

                  return (
                    <div 
                      key={country.id} 
                      onClick={() => handleChoice(country)} 
                      className={`min-h-0 md:min-h-[320px] relative rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center justify-center transition-[background-color,border-color,opacity,transform] duration-300 cursor-pointer group overflow-hidden ${cardStyle} ${isWrong ? 'animate-shake' : ''}`} 
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="mb-1 md:mb-2 flex items-center justify-center relative z-10 w-full min-h-[60px] md:min-h-[140px]">
                        {!hasError ? (
                          <div className={`w-full max-w-[100px] md:max-w-[200px] aspect-[3/2] flex items-center justify-center transition-all duration-500 ease-out ${result ? 'scale-[0.92] md:scale-[0.88]' : 'scale-100'}`}>
                            <img 
                              src={`https://flagcdn.com/w320/${code}.png`}
                              alt={`${country.name} flag`}
                              className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-opacity duration-500 ${result && !isWinner ? 'opacity-40' : 'opacity-100'}`}
                              onError={() => setHasError(true)}
                            />
                          </div>
                        ) : (
                          <div className={`w-full max-w-[100px] md:max-w-[160px] aspect-[3/2] transition-all duration-500 ease-out ${result ? 'scale-[0.92] md:scale-[0.88]' : 'scale-100'} ${result && !isWinner ? 'opacity-40' : 'opacity-100'}`}>
                            <img 
                              src={`https://flagcdn.com/w160/${getCountryCode(country.flag)}.png`}
                              alt={`${country.name} flag fallback`}
                              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Country name - directly under flag on mobile */}
                      <h3 className={`text-xs md:text-xl font-display font-black mb-0 md:mb-2 leading-tight uppercase tracking-tighter transition-all duration-500 drop-shadow-lg line-clamp-2 text-center relative z-10 px-1 md:px-4 ${titleStyle}`}>
                        {country.name}
                      </h3>

                      {/* Population info - shows after selection */}
                      <div className={`text-center relative z-10 w-full px-2 md:px-4 shrink-0 transition-[opacity,transform] ${result ? 'duration-500 opacity-100 scale-100 mt-2 md:mt-3' : 'duration-0 opacity-0 scale-90 h-0 overflow-hidden pointer-events-none'}`}>
                          <div className="h-px w-6 md:w-12 bg-white/20 mx-auto mb-1.5 md:mb-3" />
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-sky-light uppercase font-black text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] mb-0.5 font-sans">POPULATION</span>
                            <div className={`text-[11px] md:text-3xl font-display font-black tracking-tighter tabular-nums drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)] ${isWinner ? 'text-white' : 'text-white/60'}`}>
                              {country.population}
                            </div>
                          </div>
                      </div>

                    </div>
                  );
                })}
                     </motion.div>
                   </AnimatePresence>
              </div>
            </div>
            <FeedbackOverlay type={result} triggerKey={feedbackKey} />
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-10 text-center border-2 border-white/20 relative z-10 overflow-hidden">
              <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning border border-white/30 relative overflow-hidden">
                <Trophy size={36} className="relative z-10" />
              </div>
              <h1 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter drop-shadow-md">Finished</h1>
              <p className="text-white/40 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] drop-shadow-sm">Final Score</p>
              <div className="text-7xl font-display font-black text-white mb-10 tabular-nums">{score}</div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">Play Again</Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group relative z-20 pointer-events-auto"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                  Back to Games
                </button>
           </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
