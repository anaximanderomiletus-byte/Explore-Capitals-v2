import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Clock, Play, Lock, Crown } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { useGameLimit } from '../hooks/useGameLimit';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

export default function TimeZoneTrekker() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState<{ country: Country; options: string[] } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const { isPremium } = useGameLimit();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  // Get unique time zones for distractors
  const uniqueTimeZones = useMemo(() => {
    const timeZones = new Set(MOCK_COUNTRIES.filter(c => c.timeZone).map(c => c.timeZone!));
    return Array.from(timeZones);
  }, []);

  // Filter countries that have time zone data
  const countriesWithTimeZone = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => c.timeZone);
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

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'time-zone-trekker',
        score,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const generateQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback(null);

    const country = countriesWithTimeZone[Math.floor(Math.random() * countriesWithTimeZone.length)];
    const correctAnswer = country.timeZone!;
    
    const distractors = uniqueTimeZones
      .filter(tz => tz !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = shuffle([correctAnswer, ...distractors]);
    setCurrentQuestion({ country, options });
  }, [countriesWithTimeZone, uniqueTimeZones]);

  const startGame = () => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }
    setScore(0);
    setTimeLeft(60);
    setHasReported(false);
    setFeedback(null);
    setFeedbackKey(0);
    generateQuestion();
    setGameState('playing');
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || !currentQuestion) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.country.timeZone;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (isCorrect) setScore(s => s + 10);

    setTimeout(generateQuestion, 700);
  };

  // Premium check screen
  if (!isPremium && gameState === 'start') {
    return (
      <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden flex items-center justify-center px-4">
        <SEO title="Time Zone Trekker - Premium Game" description="Match countries to their time zones. A premium geography game." />
        
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-amber-500/10 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-amber-500/30 relative z-10">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Lock size={36} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Time Zone Trekker</h1>
          <p className="text-amber-400 text-xs mb-6 font-bold uppercase tracking-[0.2em]">Premium Game</p>
          <p className="text-white/60 text-sm mb-8">Unlock this game with Premium membership.</p>
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
            <SEO title="Time Zone Trekker - Premium Game" description="Match countries to their time zones. A premium geography game." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-primary/15 rounded-full blur-[180px] opacity-80 animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
            </div>

            <div className="max-w-md w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/40 relative z-10 overflow-hidden group">
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} /> Premium
              </div>
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 text-white border border-white/40 relative overflow-hidden transition-transform duration-700">
                <Clock size={36} className="relative z-10 drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Time Zone Trekker</h1>
              <p className="text-white/70 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Match countries to their time zones.</p>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest border border-white/20 font-black">
                  PLAY <Play size={20} fill="currentColor" />
                </Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/50 hover:text-primary transition-all font-black uppercase tracking-[0.3em] text-[10px] group/hub relative z-20 pointer-events-auto"
                >
                  <ArrowLeft size={14} className="group-hover/hub:-translate-x-1 transition-transform" /> 
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col px-3 md:px-4 pt-20 pb-4 md:pb-6 overflow-hidden"
          >
            <SEO title="Time Zone Trekker - Playing" description="Match countries to their time zones." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] opacity-60" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-primary/2.5 rounded-full blur-[100px] opacity-40" />
            </div>

            {/* Top Bar */}
            <div className="max-w-2xl mx-auto w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
              <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
                <ArrowLeft size={18} className="transition-transform" />
              </Link>
              <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Time Zone Trekker</h1>
                <div className="h-0.5 w-6 bg-primary/40 rounded-full mt-1" />
              </div>
              <div className="w-[42px] shrink-0" />
            </div>

            <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-white/15 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/30 p-3 sm:p-4 md:p-8 overflow-hidden relative z-10">
              
              {/* Points and Timer */}
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
                  key={currentQuestion.country.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div className="flex flex-col items-center justify-center flex-1 min-h-0 pt-0 pb-6 md:pt-4 md:pb-16 overflow-hidden relative z-10">
                    <p className="text-primary font-black text-[9px] uppercase tracking-[0.4em] mb-1 md:mb-1 font-sans opacity-80">IDENTIFY TIME ZONE</p>
                    <h3 className="text-xl md:text-4xl font-display font-black text-white text-center px-4 leading-tight max-w-full break-words uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] mb-4 md:mb-6">
                      {currentQuestion.country.name}
                    </h3>
                    <img 
                      src={`https://flagcdn.com/w320/${getCountryCode(currentQuestion.country.flag)}.png`}
                      alt={`${currentQuestion.country.name} Flag`}
                      className="h-20 md:h-40 w-auto drop-shadow-2xl object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2.5 shrink-0 pb-2 md:pb-4 relative z-10">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQuestion.country.timeZone;
                      const isWrong = isSelected && !isCorrect;
                      
                      let stateStyles = "bg-white/10 border-2 border-white/40 text-white active:bg-white/20 active:border-primary/50";
                      if (selectedAnswer) {
                        if (isCorrect) stateStyles = "bg-accent/70 border-accent text-white";
                        else if (isSelected) stateStyles = "bg-red-500/70 border-red-500 text-white";
                        else if (option === currentQuestion.country.timeZone) stateStyles = "bg-accent/40 border-accent/80 text-white";
                        else stateStyles = "bg-white/5 border-white/5 text-white/20 opacity-40 grayscale blur-[1px]";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(option)}
                          disabled={!!selectedAnswer}
                          className={`game-option relative p-2.5 md:p-3 rounded-2xl font-display font-black text-sm md:text-lg flex items-center justify-center min-h-[44px] md:min-h-[64px] transition-colors duration-500 tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? 'animate-shake' : ''}`}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <span className="px-2 text-center leading-tight relative z-10 drop-shadow-sm">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <FeedbackOverlay type={feedback} triggerKey={feedbackKey} />
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
              <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-8 text-warning border border-white/40 relative overflow-hidden transition-transform duration-700">
                <Trophy size={36} className="relative z-10 drop-shadow-lg" />
              </div>
              <h1 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter drop-shadow-md">Finished</h1>
              <p className="text-white/60 mb-6 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Final Score</p>
              <div className="text-7xl font-display font-black text-white mb-10 tabular-nums tracking-tighter">{score}</div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest border border-white/20 font-black">
                  Play Again
                </Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/50 hover:text-primary transition-all font-black uppercase tracking-[0.3em] text-[10px] group/hub relative z-20 pointer-events-auto"
                >
                  <ArrowLeft size={14} className="group-hover/hub:-translate-x-1 transition-transform" /> 
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
