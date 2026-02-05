import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Play, Lock, Crown } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { useGameLimit } from '../hooks/useGameLimit';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const getNumericValue = (str: string) => {
  if (!str) return 0;
  const value = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (str.includes('M')) return value * 1_000_000;
  if (str.includes('K')) return value * 1_000;
  return value;
};

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

export default function AreaAce() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [countryA, setCountryA] = useState<Country | null>(null);
  const [countryB, setCountryB] = useState<Country | null>(null);
  const [previousPairIds, setPreviousPairIds] = useState<[string, string] | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgErrorA, setImgErrorA] = useState(false);
  const [imgErrorB, setImgErrorB] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const { isPremium } = useGameLimit();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  const countriesWithNumericArea = useMemo(() => {
    return MOCK_COUNTRIES.map(c => ({
      ...c,
      numericArea: getNumericValue(c.area)
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
        gameId: 'area-ace',
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
    
    // Filter out countries from the previous pair to avoid back-to-back duplicates
    const availableCountries = previousPairIds 
      ? countriesWithNumericArea.filter(c => !previousPairIds.includes(c.id))
      : countriesWithNumericArea;
    
    const idxA = Math.floor(Math.random() * availableCountries.length);
    let idxB = Math.floor(Math.random() * availableCountries.length);
    while (idxB === idxA) idxB = Math.floor(Math.random() * availableCountries.length);
    
    const newCountryA = availableCountries[idxA];
    const newCountryB = availableCountries[idxB];
    setPreviousPairIds([newCountryA.id, newCountryB.id]);
    setCountryA(newCountryA);
    setCountryB(newCountryB);

    const preloadFlags = () => {
      const nextIdx1 = Math.floor(Math.random() * countriesWithNumericArea.length);
      const nextIdx2 = Math.floor(Math.random() * countriesWithNumericArea.length);
      const flags = [
        `https://flagcdn.com/w320/${getCountryCode(countriesWithNumericArea[nextIdx1].flag)}.png`,
        `https://flagcdn.com/w320/${getCountryCode(countriesWithNumericArea[nextIdx2].flag)}.png`
      ];
      flags.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadFlags();
  }, [countriesWithNumericArea, previousPairIds]);

  const startGame = () => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }
    setScore(0);
    setTimeLeft(60);
    setHasReported(false);
    setResult(null);
    setFeedbackKey(0);
    setPreviousPairIds(null);
    generateRound();
    setGameState('playing');
  };

  const handleChoice = (selected: Country) => {
    if (result || !countryA || !countryB) return;
    
    setSelectedId(selected.id);
    const areaA = (countryA as any).numericArea;
    const areaB = (countryB as any).numericArea;
    const selectedArea = (selected as any).numericArea;
    const isCorrect = selectedArea === Math.max(areaA, areaB);
    
    setResult(isCorrect ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (isCorrect) setScore(s => s + 10);
    
    setTimeout(generateRound, 700);
  };

  // Premium check screen
  if (!isPremium && gameState === 'start') {
    return (
      <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden flex items-center justify-center px-4">
        <SEO title="Area Ace - Premium Game" description="Which country is larger? Test your geographic size knowledge." />
        
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-amber-500/10 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-amber-500/30 relative z-10">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Lock size={36} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Area Ace</h1>
          <p className="text-amber-400 text-xs mb-6 font-bold uppercase tracking-[0.2em]">Premium Game</p>
          <p className="text-white/60 text-sm mb-8">Unlock this game and 3 more with Premium membership.</p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => navigate('/premium')} className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 border-0">
              <Crown size={18} /> UNLOCK WITH PREMIUM
            </Button>
            <button 
              onClick={() => navigate('/games')}
              className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <SEO title="Area Ace - Premium Game" description="Which country is larger? Test your geographic size knowledge." />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/20 relative z-10">
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} /> Premium
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter mt-4">Area Ace</h1>
              <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em]">Choose the larger country.</p>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">
                  PLAY <Play size={20} fill="currentColor" />
                </Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
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
            <SEO title="Area Ace - Playing" description="Which country is larger? Compare land areas in this geography game." />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-5xl mx-auto w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
              <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all border border-white/10 shrink-0">
                <ArrowLeft size={18} />
              </Link>
              <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate">Area Ace</h1>
                <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
              </div>
              <div className="w-[42px] shrink-0" />
            </div>

            <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 overflow-hidden relative z-10 p-3 md:p-6">
              
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4 relative z-20 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner bg-warning/20 border border-warning/40">
                  <Trophy size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-warning" />
                  <span className="font-display font-black text-base sm:text-lg md:text-xl text-white tabular-nums">{score}</span>
                </div>
                <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl transition-all ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border border-white/30'}`}>
                  <Timer size={14} className={`sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`} />
                  <span className={`font-display font-black text-base sm:text-lg md:text-xl tabular-nums ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col px-0 md:px-2 relative z-10">
                <div className="flex flex-col items-center justify-center mb-3 md:mb-4 shrink-0">
                  <p className="text-sky-light font-black text-[9px] md:text-xs uppercase tracking-[0.3em]">Which country has the</p>
                  <h2 className="text-white font-display font-black text-xl md:text-3xl uppercase tracking-tighter flex items-center gap-2">
                    <Maximize2 size={24} className="text-sky-light" /> Larger Area?
                  </h2>
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
                      const areaCurrent = (country as any).numericArea;
                      const areaOther = (other as any).numericArea;
                      const isWinner = areaCurrent >= areaOther;
                      const isA = idx === 0;
                      const hasError = isA ? imgErrorA : imgErrorB;
                      const setHasError = isA ? setImgErrorA : setImgErrorB;
                      const code = getCountryCode(country.flag);
                      const isSelected = selectedId === country.id;
                      const isWrong = isSelected && !isWinner;
                      
                      let cardStyle = "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 active:bg-white/15 active:border-sky/50";
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
                          className={`min-h-0 md:min-h-[320px] relative rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${cardStyle} ${isWrong ? 'animate-shake' : ''}`}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <div className="mb-1 md:mb-2 flex items-center justify-center relative z-10 w-full min-h-[60px] md:min-h-[140px]">
                            {!hasError ? (
                              <div className={`w-full max-w-[100px] md:max-w-[200px] aspect-[3/2] flex items-center justify-center transition-all duration-500 ${result ? 'scale-[0.92] md:scale-[0.88]' : 'scale-100'}`}>
                                <img 
                                  src={`https://flagcdn.com/w320/${code}.png`}
                                  alt={`${country.name} flag`}
                                  className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-opacity duration-500 ${result && !isWinner ? 'opacity-40' : 'opacity-100'}`}
                                  onError={() => setHasError(true)}
                                />
                              </div>
                            ) : (
                              <div className={`w-full max-w-[100px] md:max-w-[160px] aspect-[3/2] transition-all duration-500 ${result ? 'scale-[0.92] md:scale-[0.88]' : 'scale-100'} ${result && !isWinner ? 'opacity-40' : 'opacity-100'}`}>
                                <img 
                                  src={`https://flagcdn.com/w160/${getCountryCode(country.flag)}.png`}
                                  alt={`${country.name} flag fallback`}
                                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                                />
                              </div>
                            )}
                          </div>
                          
                          <h3 className={`text-xs md:text-xl font-display font-black mb-0 md:mb-2 leading-tight uppercase tracking-tighter transition-all duration-500 drop-shadow-lg line-clamp-2 text-center relative z-10 px-1 md:px-4 ${titleStyle}`}>
                            {country.name}
                          </h3>

                          <div className={`text-center relative z-10 w-full px-2 md:px-4 shrink-0 transition-all ${result ? 'duration-500 opacity-100 scale-100 mt-2 md:mt-3' : 'duration-0 opacity-0 scale-90 h-0 overflow-hidden pointer-events-none'}`}>
                            <div className="h-px w-6 md:w-12 bg-white/20 mx-auto mb-1.5 md:mb-3" />
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-sky-light uppercase font-black text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] mb-0.5">AREA (km²)</span>
                              <div className={`text-[11px] md:text-3xl font-display font-black tracking-tighter tabular-nums drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)] ${isWinner ? 'text-white' : 'text-white/60'}`}>
                                {country.area}
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
            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-10 text-center border-2 border-white/20 relative z-10">
              <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning border border-white/30">
                <Trophy size={36} />
              </div>
              <h1 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter">Finished</h1>
              <p className="text-white/40 mb-6 text-[10px] font-bold uppercase tracking-[0.2em]">Final Score</p>
              <div className="text-7xl font-display font-black text-white mb-10 tabular-nums">{score}</div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">Play Again</Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
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
