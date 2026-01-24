
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Search, EyeOff, Play } from 'lucide-react';
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
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

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
    <div className="h-[100dvh] min-h-screen w-full relative overflow-hidden font-sans bg-surface-dark">
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
            <div className="max-w-md w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/40 relative z-10 overflow-hidden group">
          <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky border border-white/30 relative overflow-hidden transition-transform duration-700">
            <Search size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Global Detective</h1>
          <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify the hidden country from clues.</p>
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


      {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-10 text-center border-2 border-white/40 relative z-10 overflow-hidden group">
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning border border-white/30 relative overflow-hidden transition-transform duration-700">
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

      {gameState === 'playing' && targetCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex flex-col items-center justify-start relative z-10 px-3 md:px-4 pt-20 pb-4 md:pb-6"
          >
            <div className="w-full max-w-2xl flex flex-col flex-1 min-h-0 relative z-10">
          {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
          <div className="w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
             <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
               <ArrowLeft size={18} className="transition-transform" />
             </Link>

             {/* Game title - flexbox centered, will shrink if needed */}
             <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Global Detective</h1>
                <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
             </div>

             {/* Spacer to balance the back button */}
             <div className="w-[42px] shrink-0" />
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-white/15 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/30 p-3 sm:p-4 md:p-8 overflow-hidden relative z-10">
                
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

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={targetCountry.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col justify-between relative z-10"
                      >
                    <div className="flex flex-col flex-1 justify-center">
                        <h2 className="text-sky font-black uppercase tracking-[0.4em] text-[9px] mb-3 flex items-center gap-2 font-sans">
                          <Search size={12} /> Geographic Intelligence
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-2 md:gap-2.5 mb-2 md:mb-4">
                            {activeClues.map((clue, idx) => (
                              <div key={idx} className="px-4 rounded-xl border border-white/20 flex justify-between items-center h-[52px] md:h-[56px] transition-all duration-500 bg-white/5 group hover:bg-white/10 shadow-inner relative overflow-hidden">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest relative z-10">{clue.label}</span>
                                <span className="font-display font-black text-white text-sm md:text-lg uppercase tracking-tight relative z-10 drop-shadow-md truncate ml-4">{clue.value}</span>
                              </div>
                            ))}
                            
                            <div 
                              className={`px-4 rounded-xl border flex justify-between items-center h-[52px] md:h-[56px] transition-all duration-500 relative overflow-hidden shadow-inner ${isCapitalRevealed ? 'bg-warning/20 border-warning/50' : 'bg-surface-dark border-white/10 cursor-pointer group'}`} 
                              onClick={revealCapital}
                            >
                                <span className={`text-[9px] font-black uppercase tracking-widest relative z-10 ${isCapitalRevealed ? 'text-white' : 'text-white/20'}`}>Capital City</span>
                                
                                {isCapitalRevealed ? (
                                  <span className="font-display font-black text-white text-sm md:text-lg uppercase tracking-tight relative z-10 drop-shadow-md">{targetCountry.capital}</span>
                                ) : (
                                  <div className="flex items-center gap-3 relative z-10">
                                    <span className="text-[9px] font-black text-white/10 tracking-[0.4em] hidden sm:block">ENCRYPTED</span>
                                    <EyeOff size={14} className="text-white/20" />
                                  </div>
                                )}
                                
                                {!isCapitalRevealed && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-sky/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                    <span className="text-white text-[9px] font-black uppercase tracking-[0.3em] drop-shadow-md">Decrypt (-5 pts)</span>
                                  </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2.5 shrink-0 pb-2 md:pb-4">
                        {options.map((option) => {
                             const isSelected = selectedAnswer === option.name;
                             const isCorrect = option.name === targetCountry.name;
                             const isWrong = isSelected && !isCorrect;
                             
                             // No hover styles - prevents "pre-highlighted" appearance on touch devices
                             let stateStyles = "bg-white/10 border-2 border-white/40 text-white active:bg-white/20 active:border-sky/50";
                             if (selectedAnswer) {
                               if (isCorrect) stateStyles = "bg-accent/70 border-accent text-white";
                               else if (isSelected) stateStyles = "bg-red-500/70 border-red-500 text-white";
                               else if (option.name === targetCountry.name) stateStyles = "bg-accent/40 border-accent/80 text-white";
                               else stateStyles = "bg-white/5 border-white/5 text-white/20 opacity-40 grayscale blur-[1px]";
                             }
                             return (
                               <button 
                                 key={option.id} 
                                 onClick={() => handleAnswer(option.name)} 
                                 disabled={!!selectedAnswer} 
                               className={`game-option relative p-2.5 md:p-3 rounded-2xl font-display font-black text-sm md:text-lg flex items-center justify-center min-h-[44px] md:min-h-[64px] transition-colors duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? 'animate-shake' : ''}`}
                               style={{ WebkitTapHighlightColor: 'transparent' }}
                             >
                               <span className="px-2 text-center leading-tight relative z-10 drop-shadow-sm">{option.name}</span>
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
