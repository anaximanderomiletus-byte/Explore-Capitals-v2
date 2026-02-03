import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Coins, Play, Lock, Crown } from 'lucide-react';
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

export default function CurrencyCraze() {
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

  // Get unique currencies for distractors
  const uniqueCurrencies = useMemo(() => {
    const currencies = new Set(MOCK_COUNTRIES.map(c => c.currency));
    return Array.from(currencies);
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
        gameId: 'currency-craze',
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

    const country = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
    const correctAnswer = country.currency;
    
    // Get 3 random different currencies as distractors
    const distractors = uniqueCurrencies
      .filter(c => c !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = shuffle([correctAnswer, ...distractors]);
    setCurrentQuestion({ country, options });
  }, [uniqueCurrencies]);

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
    const isCorrect = answer === currentQuestion.country.currency;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (isCorrect) setScore(s => s + 10);

    setTimeout(generateQuestion, 800);
  };

  // Premium check screen
  if (!isPremium && gameState === 'start') {
    return (
      <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden flex items-center justify-center px-4">
        <SEO title="Currency Craze - Premium Game" description="Match countries to their official currencies. A premium geography game." />
        
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-amber-500/10 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-amber-500/30 relative z-10">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Lock size={36} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Currency Craze</h1>
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
            <SEO title="Currency Craze - Premium Game" description="Match countries to their official currencies. A premium geography game." />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-warning/20 rounded-full blur-[150px] opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/20 relative z-10">
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} /> Premium
              </div>
              <div className="w-20 h-20 bg-warning/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-warning border border-white/30">
                <Coins size={36} />
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Currency Craze</h1>
              <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em]">Match countries to their currencies.</p>
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

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col px-3 md:px-4 pt-20 pb-4 md:pb-6 overflow-hidden"
          >
            <SEO title="Currency Craze - Playing" description="Match countries to their official currencies." />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-warning/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[80px]" />
            </div>

            {/* Top Bar */}
            <div className="max-w-3xl mx-auto w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
              <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all border border-white/10 shrink-0">
                <ArrowLeft size={18} />
              </Link>
              <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate">Currency Craze</h1>
                <div className="h-0.5 w-6 bg-warning/40 rounded-full mt-1" />
              </div>
              <div className="w-[42px] shrink-0" />
            </div>

            <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 overflow-hidden relative z-10 p-4 md:p-6">
              
              {/* Score & Timer */}
              <div className="flex items-center justify-between gap-2 mb-4 relative z-20 shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning/20 border border-warning/40">
                  <Trophy size={16} className="text-warning" />
                  <span className="font-display font-black text-lg text-white tabular-nums">{score}</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 border border-white/30'}`}>
                  <Timer size={16} className={timeLeft < 10 ? 'text-error' : 'text-sky-light'} />
                  <span className={`font-display font-black text-lg tabular-nums ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Country Display */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-6 text-center">
                  <div className="w-32 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                    <img 
                      src={`https://flagcdn.com/w320/${getCountryCode(currentQuestion.country.flag)}.png`}
                      alt={`${currentQuestion.country.name} flag`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-2">
                    {currentQuestion.country.name}
                  </h2>
                  <p className="text-warning text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                    <Coins size={16} /> What is the official currency?
                  </p>
                </div>

                {/* Answer Options */}
                <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isCorrect = option === currentQuestion.country.currency;
                    const isSelected = selectedAnswer === option;
                    
                    let buttonStyle = "bg-white/10 border-white/20 hover:bg-white/20 text-white";
                    if (feedback) {
                      if (isCorrect) {
                        buttonStyle = "bg-accent/60 border-accent text-white";
                      } else if (isSelected) {
                        buttonStyle = "bg-red-500/60 border-red-500 text-white";
                      } else {
                        buttonStyle = "bg-white/5 border-white/10 text-white/30";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        disabled={!!selectedAnswer}
                        className={`p-4 rounded-xl border-2 font-bold text-sm uppercase tracking-wide transition-all ${buttonStyle} ${isSelected && !isCorrect ? 'animate-shake' : ''}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
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
