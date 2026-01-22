
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Users, Check, X, TrendingUp, TrendingDown } from 'lucide-react';
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
  const [gameState, setGameState] = useState<'start' | 'loading' | 'playing' | 'finished'>('loading');
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
    const timer = setTimeout(() => {
      setGameState('start');
    }, 800);
    return () => clearTimeout(timer);
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

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-8 text-center border-2 border-white/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
          <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky shadow-glow-sky border border-white/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
            <Users size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Population Pursuit</h1>
          <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Choose the larger population.</p>
            <div className="flex flex-col gap-6">
            <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest shadow-glow-sky font-black">Play</Button>
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

        {gameState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center"
          >
            <div className="text-white font-display font-black text-2xl uppercase tracking-[0.5em] animate-pulse">
              Loading
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && countryA && countryB && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col p-4 overflow-hidden"
          >
      <SEO title="Playing Population Pursuit" description="Choose the larger population." />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full flex shrink-0 items-center justify-between mb-4 bg-white/10 backdrop-blur-2xl p-3 rounded-2xl shadow-glass border border-white/20 mt-16 md:mt-20 relative overflow-hidden z-10">
         <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
         <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 relative z-10 group">
           <ArrowLeft size={18} className="transition-transform" />
         </Link>

         <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <h1 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] drop-shadow-md">Population Pursuit</h1>
            <div className="h-0.5 w-8 bg-sky/40 rounded-full mt-1" />
         </div>

         <div className="flex items-center gap-6 relative z-10">
           <div className="flex items-center gap-2">
              <Trophy size={18} className="text-warning drop-shadow-md" />
              <span className="font-display font-black text-xl text-white tabular-nums drop-shadow-sm">{score}</span>
           </div>
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-inner transition-all duration-300 relative ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border border-white/30'}`}>
              <div className="absolute inset-0 bg-glossy-gradient opacity-20 rounded-[inherit]" />
                    <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`}><Timer size={18} /></div>
              <span className={`font-display font-black text-xl tabular-nums min-w-[24px] relative z-10 drop-shadow-sm ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{timeLeft}</span>
           </div>
         </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col min-h-0 pb-6 overflow-hidden relative z-10 max-h-[85dvh] md:max-h-none">
         <div className="text-center mb-6 shrink-0 relative">
           <h2 className="text-xl md:text-4xl font-display font-black text-white tracking-tighter uppercase drop-shadow-md flex items-center justify-center gap-4">
             <TrendingUp size={32} className="text-sky-light hidden md:block" />
             Who has a larger population?
             <TrendingDown size={32} className="text-red-400 hidden md:block" />
           </h2>
         </div>

         <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 min-h-0 overflow-hidden px-4 items-stretch relative">
                  <AnimatePresence mode="wait">
                     <motion.div
                       key={countryA?.id + (countryB?.id || '')}
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 1.02 }}
                       transition={{ duration: 0.3 }}
                       className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 h-full w-full"
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
                
                let cardStyle = "bg-white/5 border border-white/10 hover:bg-white/15 hover:border-sky/50 shadow-glass";
                let titleStyle = "text-white/80";
                  
                if (result) {
                    if (isWinner) {
                        cardStyle = "bg-accent/60 border-accent shadow-glow-accent z-20 border-2";
                        titleStyle = "text-white";
                    } else if (isSelected) {
                        cardStyle = "bg-red-500/60 border-red-500 shadow-glow-warning z-10 border-2";
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
                      className={`flex-1 relative rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center transition-[background-color,border-color,opacity,transform] duration-300 cursor-pointer group overflow-hidden ${cardStyle} ${isWrong ? 'animate-shake' : ''}`} 
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover:opacity-20 pointer-events-none rounded-[inherit]" />
                      
                      <div className="mb-2 md:mb-4 flex items-center justify-center min-h-[100px] md:min-h-[160px] relative z-10 w-full">
                        {!hasError ? (
                          <div className={`w-28 h-20 md:w-48 md:h-32 lg:w-64 lg:h-44 flex items-center justify-center transition-all duration-500 ${result ? 'scale-[0.65] -translate-y-4 md:-translate-y-6' : 'scale-100 translate-y-4 md:translate-y-6'}`}>
                            <img 
                              src={`https://flagcdn.com/w320/${code}.png`}
                              alt={`${country.name} flag`}
                              className={`w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-opacity duration-500 ${result && !isWinner ? 'opacity-40' : 'opacity-100'}`}
                              onError={() => setHasError(true)}
                            />
                          </div>
                        ) : (
                          <div className={`w-28 h-20 md:w-44 md:h-28 transition-all duration-500 ${result ? 'scale-[0.65] -translate-y-4 md:-translate-y-6' : 'scale-100 translate-y-4 md:translate-y-6'} ${result && !isWinner ? 'opacity-40' : 'opacity-100'}`}>
                            <img 
                              src={`https://flagcdn.com/w160/${getCountryCode(country.flag)}.png`}
                              alt={`${country.name} flag fallback`}
                              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center relative z-10 w-full px-4">
                        <h3 className={`text-lg md:text-2xl font-display font-black mb-3 leading-tight uppercase tracking-tighter transition-all duration-500 drop-shadow-lg ${titleStyle} ${result ? '-translate-y-4 md:-translate-y-6' : 'translate-y-4 md:translate-y-6'}`}>
                          {country.name}
                        </h3>

                        <div className={`transition-[opacity,transform] relative ${result ? 'duration-500 opacity-100 scale-100 -translate-y-4 md:-translate-y-6' : 'duration-0 opacity-0 scale-90 pointer-events-none'}`}>
                            <div className="h-px w-12 bg-white/20 mx-auto mb-4" />
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-sky-light uppercase font-black text-[10px] tracking-[0.4em] mb-1 font-sans drop-shadow-glow-sky">POPULATION</span>
                              <div className={`text-2xl md:text-5xl font-display font-black tracking-tighter tabular-nums drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${isWinner ? 'text-white' : 'text-white/60'}`}>
                                {country.population}
                              </div>
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
            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-10 text-center border-2 border-white/20 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
              <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning shadow-glow-warning border border-white/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
                <Trophy size={36} className="relative z-10" />
              </div>
              <h1 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter drop-shadow-md">Finished</h1>
              <p className="text-white/40 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] drop-shadow-sm">Final Score</p>
              <div className="text-7xl font-display font-black text-white mb-10 drop-shadow-glow-sky tabular-nums">{score}</div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest shadow-glow-sky font-black">Play Again</Button>
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
