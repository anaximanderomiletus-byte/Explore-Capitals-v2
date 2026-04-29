
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, RefreshCw, Network, AlertCircle, Play } from 'lucide-react';
import { COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import { getFlagUrl } from '../utils/flags';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import TimeSelector from '../components/TimeSelector';
import GameSideAds from '../components/GameSideAds';
import { getGameStructuredData } from '../utils/gameStructuredData';
import { useTranslation } from '../context/LocaleContext';
import GameNavigationButtons from '../components/GameNavigationButtons';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function KnowYourNeighbor() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [validCountries, setValidCountries] = useState<Country[]>([]);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [roundResult, setRoundResult] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  useEffect(() => {
    const valid = COUNTRIES.filter(c => c.borders && c.borders.length > 0);
    setValidCountries(valid);
  }, []);

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
        gameId: 'know-your-neighbor',
        score,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const generateRound = () => {
    if (validCountries.length === 0) return;
    const target = validCountries[Math.floor(Math.random() * validCountries.length)];
    setTargetCountry(target);
    setSelectedOptions([]);
    setRoundResult(null);
    setFeedback(null);

    const neighbors = target.borders || [];
    const potentialDistractors = COUNTRIES.filter(c => 
      c.name !== target.name && !neighbors.includes(c.name)
    ).map(c => c.name);
    const shuffledDistractors = shuffle(potentialDistractors);
    const numDistractors = Math.max(4, 15 - neighbors.length); 
    const roundDistractors = shuffledDistractors.slice(0, numDistractors);
    setOptions(shuffle([...neighbors, ...roundDistractors]));

    // Preload flag for target country
    const img = new Image();
    img.src = getFlagUrl(target.flag);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameDuration);
    setHasReported(false);
    setRoundResult(null);
    setFeedbackKey(0);
    generateRound();
    setGameState('playing');
  };

  const toggleOption = (countryName: string) => {
    if (roundResult) return; 
    setSelectedOptions(prev => prev.includes(countryName) ? prev.filter(c => c !== countryName) : [...prev, countryName]);
  };

  const submitAnswer = () => {
    if (!targetCountry || !targetCountry.borders) return;
    const actualNeighbors = targetCountry.borders;
    const selected = selectedOptions;
    const missedNeighbors = actualNeighbors.filter(n => !selected.includes(n));
    const wrongSelections = selected.filter(s => !actualNeighbors.includes(s));

    if (missedNeighbors.length === 0 && wrongSelections.length === 0) {
      setScore(s => s + 20);
      setRoundResult('correct');
      setFeedbackKey(prev => prev + 1);
      setFeedback("Perfect!");
      setTimeout(generateRound, 700);
    } else {
      setRoundResult('incorrect');
      setFeedbackKey(prev => prev + 1);
      setFeedback(`${missedNeighbors.length} missed, ${wrongSelections.length} wrong.`);
      setTimeout(generateRound, 2500);
    }
  };

    return (
    <div className="h-screen h-[100svh] bg-surface-dark font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}png/GAMES/know-your-neighbor.png`} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
      </div>
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
        <SEO
          title="Know Your Neighbor - Games"
          description="Can you name all the bordering countries? Test your knowledge of world geography and country borders in this quiz."
          structuredData={getGameStructuredData({
            name: 'Know Your Neighbor',
            slug: 'know-your-neighbor',
            description: 'Can you name all the bordering countries? Test your knowledge of world geography and country borders in this quiz.',
            image: '/png/GAMES/know-your-neighbor.png',
          })}
        />

        {/* Background Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-3xl opacity-40" />
        </div>

            <GameSideAds />
            <div className="mx-auto my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
            
            <div className="game-lobby-card w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/20 overflow-hidden">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-8 border border-white/30 relative overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}png/GAMES/know-your-neighbor.png`} alt="Know Your Neighbor" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Know Your Neighbor</h1>
          <p className="text-white/40 text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify every bordering country.</p>
          <div className="mb-6"><TimeSelector value={gameDuration} onChange={setGameDuration} /></div>
            <div className="flex flex-col gap-6 w-full">
                <Button onClick={startGame} size="lg" className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto">PLAY <Play className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]" fill="currentColor" /></Button>
            <GameNavigationButtons />
          </div>
        </div>
            </div>
          </motion.div>
        )}


        {gameState === 'playing' && targetCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-16 pb-2 md:pb-3 overflow-y-auto overflow-x-hidden"
          >
      <SEO title="Know Your Neighbor - Games" description="Can you name all the bordering countries? Test your knowledge of world geography and country borders in this quiz." />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
      <div className="max-w-2xl mx-auto w-full flex shrink-0 items-center gap-2 mb-2 md:mb-2 bg-white/10 backdrop-blur-2xl p-2 md:p-2.5 rounded-2xl border border-white/20 z-10">
         <Link to="/games/all" className="game-back-btn p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
           <ArrowLeft size={18} className="transition-transform" />
         </Link>

         {/* Game title - flexbox centered, will shrink if needed */}
         <div className="flex-1 flex flex-col items-center justify-center min-w-0">
            <h2 className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Know Your Neighbor</h2>
            <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
         </div>

         {/* Spacer to balance the back button */}
         <div className="game-back-spacer w-[42px] shrink-0" />
      </div>

      <div className="game-card flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 p-1.5 sm:p-2 md:p-4 overflow-y-auto overflow-x-hidden relative z-10">
         
         {/* Points and Timer - Responsive layout for all screen sizes */}
         <div className="flex items-center justify-between gap-2 mb-1 sm:mb-2 md:mb-2 relative z-20 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner bg-warning/20 border border-warning/40 relative shrink-0">
               <Trophy size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-warning drop-shadow-md relative z-10" />
               <span className="font-display font-black text-base sm:text-lg md:text-xl text-white tabular-nums drop-shadow-sm relative z-10">{score}</span>
            </div>
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner transition-all duration-300 relative shrink-0 ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border-2 border-white/30'}`}>
               <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`}><Timer size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" /></div>
               <span className={`font-display font-black text-base sm:text-lg md:text-xl tabular-nums min-w-[28px] sm:min-w-[32px] md:min-w-[36px] relative z-10 drop-shadow-sm ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
            </div>
         </div>

               <AnimatePresence mode="wait">
                 <motion.div
                   key={targetCountry.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   style={{ willChange: 'transform, opacity' }}
                   className="game-neighbor-inner h-full flex flex-col justify-between relative z-10"
                 >
            {/* Country Prompt - More spacious */}
            <div className="shrink-0 flex flex-col items-center justify-center py-4 sm:py-6 md:py-8">
              <div className="text-center">
                 <p className="text-sky-light font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 md:mb-3 font-sans opacity-80 shrink-0">SELECT ALL NEIGHBORS</p>
                 <h3 className="text-xl md:text-3xl font-display font-black text-white leading-tight px-4 uppercase tracking-tighter drop-shadow-lg mb-2 md:mb-3">{targetCountry.name}</h3>
                 <img
                   src={getFlagUrl(targetCountry.flag)}
                   alt={`${targetCountry.name} Flag`}
                   className="max-h-[8vh] md:max-h-[10vh] w-auto mx-auto min-h-0 shrink drop-shadow-2xl object-contain"
                   onError={(e) => { e.currentTarget.style.display = 'none'; }}
                 />
              </div>
            </div>
            <div className="h-4 md:h-8 shrink-0" />
              
            {/* Selections Grid - Fills remaining space with thinner buttons */}
            <div className="game-neighbor-grid flex-1 min-h-0 px-1 pb-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 md:gap-2 w-full h-full content-center" style={{ gridAutoRows: 'minmax(44px, 1fr)' }}>
              {options.map((countryName) => {
                const isSelected = selectedOptions.includes(countryName);
                const isActualNeighbor = targetCountry.borders?.includes(countryName);
                const isIncorrectSelection = isSelected && !isActualNeighbor;
                const country = COUNTRIES.find(c => c.name === countryName);
                const flagUrl = country ? getFlagUrl(country.flag) : '';
                
                // Determine which state classes to apply for the border/shadow
                let stateClasses = "bg-white/5 border border-white/30 text-white/90 shadow-inner";
                
                if (roundResult) {
                  if (isActualNeighbor && isSelected) {
                    stateClasses = "border-2 border-accent text-white";
                  } else if (isActualNeighbor && !isSelected) {
                    stateClasses = "border-2 border-warning text-white";
                  } else if (isSelected && !isActualNeighbor) {
                    stateClasses = "border-2 border-red-500 text-white";
                  } else {
                    stateClasses = "border-2 border-white/5 text-white/10 opacity-40 grayscale blur-[1px]";
                  }
                } else if (isSelected) {
                  stateClasses = "border-2 border-white/60 text-white shadow-premium-hover brightness-105 frutiger-gloss";
                }

                return (
                  <button
                    key={countryName}
                    onClick={() => toggleOption(countryName)}
                    disabled={!!roundResult}
                    className={`relative p-1 rounded-lg md:rounded-xl font-black text-[8px] md:text-[9px] flex items-center justify-center text-center transition-all duration-200 uppercase tracking-tight overflow-hidden group h-full focus:outline-none focus:ring-0 select-none ${stateClasses} ${roundResult && isIncorrectSelection ? 'animate-shake' : ''}`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {flagUrl && (
                      <div className="absolute inset-0 z-0">
                        <img src={flagUrl} className="w-full h-full object-cover" alt="" />
                        
                        {/* Layered Overlays for smooth transitions */}
                        {/* 1. Default Dark Overlay */}
                        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${(!isSelected && !roundResult) ? 'opacity-100' : 'opacity-0'}`} />
                        
                        {/* 2. Selection Overlay (Matches SUBMIT button) */}
                        <div className={`absolute inset-0 bg-gel-blue backdrop-blur-[2px] transition-opacity duration-200 ${isSelected && !roundResult ? 'opacity-100' : 'opacity-0'}`} />
                        
                        {/* 3. Correct Result Overlay */}
                        <div className={`absolute inset-0 bg-accent/80 transition-opacity duration-200 ${(roundResult && isActualNeighbor && isSelected) ? 'opacity-100' : 'opacity-0'}`} />
                        
                        {/* 4. Missed Result Overlay (Orange) */}
                        <div className={`absolute inset-0 bg-warning/60 transition-opacity duration-200 ${(roundResult && isActualNeighbor && !isSelected) ? 'opacity-100' : 'opacity-0'}`} />
                        
                        {/* 5. Incorrect Result Overlay (Red) */}
                        <div className={`absolute inset-0 bg-red-500/80 transition-opacity duration-200 ${(roundResult && isSelected && !isActualNeighbor) ? 'opacity-100' : 'opacity-0'}`} />
                        
                        {/* 6. Ghost/Dimmed Result Overlay */}
                        <div className={`absolute inset-0 bg-black/80 transition-opacity duration-200 ${(roundResult && !isSelected && !isActualNeighbor) ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                    )}
                    <span className="leading-tight relative z-10 drop-shadow-md px-0.5">{countryName}</span>
                  </button>
                );
              })}
              </div>
            </div>

            {/* Submit Button - below selections */}
            <div className="shrink-0 relative z-10 pt-2">
              <div className="h-px w-full bg-white/10 mb-2" />
              {roundResult ? (
                <div className={`p-5 md:p-8 rounded-xl border flex items-center justify-center gap-3 font-black uppercase tracking-widest relative overflow-hidden animate-in zoom-in-95 duration-300 ${roundResult === 'correct' ? 'bg-accent/60 border-accent text-white' : 'bg-red-500/60 border-red-500 text-white'}`}>
                  <span className="text-base md:text-xl relative z-10 drop-shadow-md">{feedback}</span>
                </div>
              ) : (
                <Button onClick={submitAnswer} disabled={selectedOptions.length === 0} className="w-full aspect-[6] sm:aspect-[7] md:aspect-[8] min-h-[56px] md:min-h-[80px] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black" size="lg">Submit</Button>
              )}
            </div>
                 </motion.div>
               </AnimatePresence>
            </div>
            <FeedbackOverlay type={roundResult} triggerKey={feedbackKey} />
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
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
            <div className="mx-auto my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
            
            <div className="game-lobby-card w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-8 sm:p-12 text-center border-2 border-white/40 overflow-hidden group">
              <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-white/40 relative overflow-hidden">
                <Trophy size={36} className="relative z-10 drop-shadow-lg" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-4 uppercase tracking-tighter drop-shadow-md">FINISHED!</h2>
              <p className="text-white/60 mb-6 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-sm">{t('game.finalScore')}</p>
              <div className="text-7xl font-display font-black text-white mb-8 tabular-nums tracking-tighter">{score}</div>
              <div className="flex flex-col gap-6 w-full">
                <Button onClick={startGame} size="lg" className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto">{t('game.playAgain')} <Play className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]" fill="currentColor" /></Button>
          </div>
                <GameNavigationButtons />
      </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
