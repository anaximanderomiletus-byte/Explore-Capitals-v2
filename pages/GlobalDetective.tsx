
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Search, EyeOff } from 'lucide-react';
import { MOCK_COUNTRIES, GAMES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface Clue {
  label: string;
  value: string;
}

export default function GlobalDetective() {
  const [gameState, setGameState] = useState<'start' | 'loading' | 'playing' | 'finished'>('loading');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [activeClues, setActiveClues] = useState<Clue[]>([]);
  const [isCapitalRevealed, setIsCapitalRevealed] = useState(false);
  const [roundResult, setRoundResult] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
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

  const gameImage = GAMES.find(g => g.id === '6')?.image;

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
        gameId: 'global-detective',
        score,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const getClueValue = (country: Country, type: string): Clue => {
    switch (type) {
      case 'Region': return { label: 'Region', value: country.region };
      case 'Currency': return { label: 'Currency', value: country.currency };
      case 'Language': return { label: 'Language', value: country.languages[0] };
      case 'Population': return { label: 'Population', value: country.population };
      case 'Area': return { label: 'Land Area', value: country.area };
      case 'GDP': return { label: 'GDP (EST)', value: country.gdp || 'N/A' };
      case 'Time Zone': return { label: 'Time Zone', value: country.timeZone || 'N/A' };
      case 'Calling Code': return { label: 'Dialing Code', value: country.callingCode || 'N/A' };
      case 'Drive Side': return { label: 'Drive Side', value: `${country.driveSide || 'Right'}-hand` };
      default: return { label: 'Region', value: country.region };
    }
  };

  const generateRound = () => {
    setSelectedAnswer(null);
    setRoundResult(null);
    setIsCapitalRevealed(false);
    
    const target = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
    setTargetCountry(target);

    // Generate 3 random clues from available pool
    const clueTypes = ['Region', 'Currency', 'Language', 'Population', 'Area', 'GDP', 'Time Zone', 'Calling Code', 'Drive Side'];
    const shuffledTypes = shuffle(clueTypes);
    const selectedClues = shuffledTypes.slice(0, 3).map(type => getClueValue(target, type));
    setActiveClues(selectedClues);

    const distractors: Country[] = [];
    while (distractors.length < 3) {
      const c = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
      if (c.id !== target.id && !distractors.find(d => d.id === c.id)) distractors.push(c);
    }
    setOptions(shuffle([target, ...distractors]));
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

  const revealCapital = () => {
    if (isCapitalRevealed || roundResult) return;
    setIsCapitalRevealed(true);
  };

  const handleAnswer = (countryName: string) => {
    if (roundResult || !targetCountry) return;
    setSelectedAnswer(countryName);
    const correct = countryName === targetCountry.name;
    setRoundResult(correct ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (correct) setScore(s => s + (isCapitalRevealed ? 15 : 20));
    setTimeout(generateRound, 700);
  };

  const clueBarBase = "px-4 rounded-xl border-2 flex justify-between items-center h-[54px] transition-all duration-300";

  return (
    <div className="h-[100dvh] min-h-screen w-full relative overflow-hidden font-sans [-webkit-overflow-scrolling:touch] bg-surface-dark">
      <SEO title="Global Detective" description="Deduce the mystery country from clues." />
      
      <div className="absolute inset-0 -z-10">
        <img src={gameImage} alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-surface-dark/80 backdrop-blur-xl" />
      </div>

      <AnimatePresence mode="wait">
      {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full bg-white/20 backdrop-blur-3xl rounded-3xl shadow-glass p-8 text-center border-2 border-white/40 relative z-10 overflow-hidden group">
          <div className="absolute inset-0 bg-glossy-gradient opacity-30 pointer-events-none rounded-[inherit]" />
          <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky shadow-glow-sky border border-white/30 relative overflow-hidden transition-transform duration-700">
            <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
            <Search size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Global Detective</h1>
          <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify the hidden country from clues.</p>
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

      {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full bg-white/20 backdrop-blur-3xl rounded-3xl shadow-glass p-10 text-center border-2 border-white/40 relative z-10 overflow-hidden group">
          <div className="absolute inset-0 bg-glossy-gradient opacity-30 pointer-events-none rounded-[inherit]" />
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning shadow-glow-warning border border-white/30 relative overflow-hidden transition-transform duration-700">
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

      {gameState === 'playing' && targetCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10 px-4"
          >
            <div className="w-full max-w-2xl flex flex-col min-h-0 relative z-10">
          <div className="w-full flex shrink-0 items-center justify-between mb-4 bg-white/10 backdrop-blur-2xl p-4 rounded-3xl shadow-glass border-2 border-white/20 mt-16 md:mt-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
             <Link to="/games" className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 relative z-10 group">
               <ArrowLeft size={20} className="transition-transform" />
             </Link>

             <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <h1 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] drop-shadow-md">Global Detective</h1>
                <div className="h-0.5 w-8 bg-sky/40 rounded-full mt-1" />
             </div>

             <div className="flex items-center gap-8 relative z-10">
               <div className="flex items-center gap-3">
                  <Trophy size={20} className="text-warning drop-shadow-glow" />
                  <span className="font-display font-black text-2xl text-white tabular-nums drop-shadow-md">{score}</span>
               </div>
               <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl shadow-inner transition-all duration-300 relative ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/20 text-white border-2 border-white/20'}`}>
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 rounded-[inherit]" />
                  <Timer size={20} className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky'}`} />
                  <span className={`font-display font-black text-2xl tabular-nums min-w-[30px] relative z-10 drop-shadow-md ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{timeLeft}</span>
               </div>
             </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-white/15 backdrop-blur-3xl rounded-[3rem] border border-white/30 p-5 md:p-8 overflow-hidden relative shadow-glass z-10">
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={targetCountry.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 min-h-0 flex flex-col justify-between relative z-10"
                      >
                    <div className="flex-1 flex flex-col justify-center min-h-0">
                        <h2 className="text-sky font-black uppercase tracking-[0.4em] text-[9px] mb-3 mt-1 flex items-center gap-2 font-sans drop-shadow-glow-sky">
                          <Search size={12} /> Geographic Intelligence
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-2.5 mb-4 flex-1 justify-center">
                            {activeClues.map((clue, idx) => (
                              <div key={idx} className="px-5 rounded-2xl border-2 border-white/20 flex justify-between items-center h-[56px] transition-all duration-500 bg-white/5 group hover:bg-white/10 shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 bg-glossy-gradient opacity-5 rounded-[inherit]" />
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest relative z-10">{clue.label}</span>
                                <span className="font-display font-black text-white text-lg uppercase tracking-tight relative z-10 drop-shadow-md truncate ml-4">{clue.value}</span>
                              </div>
                            ))}
                            
                            <div 
                              className={`px-5 rounded-2xl border-2 flex justify-between items-center h-[56px] transition-all duration-500 relative overflow-hidden shadow-inner ${isCapitalRevealed ? 'bg-warning/20 border-warning/50 shadow-glow-warning' : 'bg-surface-dark border-white/10 cursor-pointer group'}`} 
                              onClick={revealCapital}
                            >
                                <div className="absolute inset-0 bg-glossy-gradient opacity-10 rounded-[inherit]" />
                                <span className={`text-[9px] font-black uppercase tracking-widest relative z-10 ${isCapitalRevealed ? 'text-white' : 'text-white/20'}`}>Capital City</span>
                                
                                {isCapitalRevealed ? (
                                  <span className="font-display font-black text-white text-lg uppercase tracking-tight relative z-10 drop-shadow-md">{targetCountry.capital}</span>
                                ) : (
                                  <div className="flex items-center gap-3 relative z-10">
                                    <span className="text-[9px] font-black text-white/10 tracking-[0.4em]">ENCRYPTED</span>
                                    <EyeOff size={14} className="text-white/20" />
                                  </div>
                                )}
                                
                                {!isCapitalRevealed && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-sky/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                    <span className="text-white text-[9px] font-black uppercase tracking-[0.3em] drop-shadow-md">Decrypt Clue (-5 pts)</span>
                                  </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0 pb-2">
                        {options.map((option) => {
                             const isSelected = selectedAnswer === option.name;
                             const isCorrect = option.name === targetCountry.name;
                             const isWrong = isSelected && !isCorrect;
                             
                             let stateStyles = "bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 hover:border-sky/50 shadow-glass-bubble";
                             if (selectedAnswer) {
                               if (isCorrect) stateStyles = "bg-accent/70 border-accent shadow-glow-accent text-white";
                               else if (isSelected) stateStyles = "bg-red-500/70 border-red-500 shadow-glow-warning text-white";
                               else if (option.name === targetCountry.name) stateStyles = "bg-accent/40 border-accent/80 text-white";
                               else stateStyles = "bg-white/5 border-white/5 text-white/20 opacity-40 grayscale blur-[1px]";
                             }
                             return (
                               <button 
                                 key={option.id} 
                                 onClick={() => handleAnswer(option.name)} 
                                 disabled={!!selectedAnswer} 
                               className={`relative p-3 rounded-[1.5rem] font-display font-black text-base md:text-lg flex items-center justify-center min-h-[56px] md:min-h-[64px] transition-all duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? 'animate-shake' : ''} group`}
                               style={{ WebkitTapHighlightColor: 'transparent' }}
                             >
                               <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover:opacity-20 pointer-events-none rounded-[inherit]" />
                               <span className="text-center leading-tight relative z-10 drop-shadow-md">{option.name}</span>
                             </button>
                             );
                        })}
                    </div>
                      </motion.div>
                    </AnimatePresence>
                </div>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
      <FeedbackOverlay type={roundResult} triggerKey={feedbackKey} />
    </div>
  );
}
