
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, RefreshCw, Network, AlertCircle } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

export default function KnowYourNeighbor() {
  const [gameState, setGameState] = useState<'start' | 'loading' | 'playing' | 'finished'>('loading');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
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
    const timer = setTimeout(() => {
      setGameState('start');
    }, 800);
    return () => clearTimeout(timer);
  }, [setPageLoading]);

  useEffect(() => {
    const valid = MOCK_COUNTRIES.filter(c => c.borders && c.borders.length > 0);
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
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const generateRound = () => {
    if (validCountries.length === 0) return;
    const target = validCountries[Math.floor(Math.random() * validCountries.length)];
    setTargetCountry(target);
    setSelectedOptions([]);
    setRoundResult(null);
    setFeedback(null);

    const neighbors = target.borders || [];
    const potentialDistractors = MOCK_COUNTRIES.filter(c => 
      c.name !== target.name && !neighbors.includes(c.name)
    ).map(c => c.name);
    const shuffledDistractors = shuffle(potentialDistractors);
    const numDistractors = Math.max(4, 12 - neighbors.length); 
    const roundDistractors = shuffledDistractors.slice(0, numDistractors);
    setOptions(shuffle([...neighbors, ...roundDistractors]));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
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
      setTimeout(generateRound, 1000);
    }
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
        <SEO title="Know Your Neighbor" description="Identify all the bordering countries." />
        
        {/* Background Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
        </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-8 text-center border-2 border-white/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
          <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky shadow-glow-sky border border-white/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
            <Network size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Know Your Neighbor</h1>
          <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify every bordering country.</p>
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

        {gameState === 'playing' && targetCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col p-4 overflow-hidden"
          >
      <SEO title="Playing Know Your Neighbor" description="Select all the bordering countries." />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-2xl mx-auto w-full flex shrink-0 items-center justify-between mb-4 bg-white/10 backdrop-blur-2xl p-4 rounded-3xl shadow-glass border-2 border-white/20 mt-16 md:mt-20 relative overflow-hidden z-10">
         <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
         <Link to="/games" className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 relative z-10 group">
           <ArrowLeft size={20} className="transition-transform" />
         </Link>

         <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <h1 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] drop-shadow-md">Know Your Neighbor</h1>
            <div className="h-0.5 w-8 bg-sky/40 rounded-full mt-1" />
         </div>

         <div className="flex items-center gap-8 relative z-10">
           <div className="flex items-center gap-3">
              <Trophy size={20} className="text-warning drop-shadow-glow" />
              <span className="font-display font-black text-2xl text-white tabular-nums drop-shadow-md">{score}</span>
           </div>
           <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl shadow-inner transition-all duration-300 relative ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/20 text-white border-2 border-white/20'}`}>
              <div className="absolute inset-0 bg-glossy-gradient opacity-10 rounded-[inherit]" />
                    <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky'}`}><Timer size={20} /></div>
              <span className={`font-display font-black text-2xl tabular-nums min-w-[30px] relative z-10 drop-shadow-md ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{timeLeft}</span>
           </div>
         </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-[3rem] border-2 border-white/20 p-4 md:p-6 overflow-hidden relative shadow-glass z-10">
         <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
               <AnimatePresence mode="wait">
                 <motion.div
                   key={targetCountry.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="flex-1 flex flex-col min-h-0 justify-center gap-6 md:gap-10 relative z-10"
                 >
            <div className="text-center shrink-0 overflow-hidden">
               <img 
                 src={`https://flagcdn.com/w160/${getCountryCode(targetCountry.flag)}.png`}
                 alt={`${targetCountry.name} Flag`}
                 className="h-8 md:h-10 w-auto mx-auto mb-2 drop-shadow-lg object-contain"
               />
               <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight px-4 uppercase tracking-tighter drop-shadow-lg">{targetCountry.name}</h3>
               <p className="text-sky font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] mt-1 font-sans drop-shadow-glow-sky">SELECT ALL LAND NEIGHBORS</p>
            </div>
            
            <div className="px-2 overflow-visible no-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {options.map((countryName) => {
                  const isSelected = selectedOptions.includes(countryName);
                  const isActualNeighbor = targetCountry.borders?.includes(countryName);
                  const isIncorrectSelection = isSelected && !isActualNeighbor;
                  
                  let btnStyle = "bg-white/5 border-2 border-white/30 text-white/70 hover:bg-white/10 hover:border-sky/40 shadow-inner";
                  
                  if (roundResult) {
                    if (isActualNeighbor && isSelected) {
                      btnStyle = "bg-accent/70 border-accent shadow-glow-accent text-white";
                    } else if (isActualNeighbor && !isSelected) {
                      btnStyle = "bg-warning/40 border-warning shadow-glow-warning text-white";
                    } else if (isSelected && !isActualNeighbor) {
                      btnStyle = "bg-red-500/70 border-red-500 shadow-glow-warning text-white";
                    } else {
                      btnStyle = "bg-white/5 border-white/5 text-white/10 opacity-40 grayscale blur-[1px]";
                    }
                  } else {
                    if (isSelected) {
                      btnStyle = "bg-sky/20 border-sky/50 text-white shadow-glow-sky ring-2 ring-sky/30";
                    }
                  }

                  return (
                    <button
                      key={countryName}
                      onClick={() => toggleOption(countryName)}
                      disabled={!!roundResult}
                      className={`relative p-3 rounded-xl font-black text-[9px] md:text-[11px] flex items-center justify-between min-h-[48px] text-left transition-all duration-500 uppercase tracking-tight shadow-glass-bubble overflow-hidden group ${btnStyle} ${roundResult && isIncorrectSelection ? 'animate-shake' : ''}`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="absolute inset-0 bg-glossy-gradient opacity-5 group-hover:opacity-10 pointer-events-none rounded-[inherit]" />
                      <span className="leading-tight pr-2 line-clamp-2 relative z-10 drop-shadow-md">{countryName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 relative z-10">
              {roundResult ? (
                <div className={`p-4 rounded-xl border-2 flex items-center justify-center gap-4 font-black uppercase tracking-widest shadow-glass relative overflow-hidden animate-in zoom-in-95 duration-300 ${roundResult === 'correct' ? 'bg-accent/60 border-accent text-white shadow-glow-accent' : 'bg-red-500/60 border-red-500 text-white shadow-glow-warning'}`}>
                  <div className="absolute inset-0 bg-glossy-gradient opacity-20 rounded-[inherit]" />
                  <span className="text-base relative z-10 drop-shadow-md">{feedback}</span>
                </div>
              ) : (
                <Button onClick={submitAnswer} disabled={selectedOptions.length === 0} className="w-full h-14 text-base uppercase tracking-widest shadow-glow-sky" size="lg">Submit</Button>
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-10 text-center border-2 border-white/40 relative z-10 overflow-hidden">
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
