
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Camera, Check, X, MapPin, Loader2, Play } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import { staticTours } from '../data/staticTours';
import { STATIC_IMAGES } from '../data/images';
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

interface Question {
    country: Country;
    landmarkName: string;
    imageUrl: string;
    options: Country[];
}

export default function LandmarkLegend() {
  const [gameState, setGameState] = useState<'start' | 'preparing' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);
  const [incorrectCountries, setIncorrectCountries] = useState<string[]>([]);
  const [hasReported, setHasReported] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);
  
  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
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
        gameId: 'landmark-legend',
        score,
        correctCountries,
        incorrectCountries,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, correctCountries, incorrectCountries, timeLeft]);

  // Generate a finite list of questions for this session (Limit to 15 for faster loading)
  const getQuestionsList = useCallback((): Question[] => {
    const validCountries = MOCK_COUNTRIES.filter(c => staticTours[c.name]);
    const shuffledValid = shuffle(validCountries).slice(0, 15); // Limit to 15 questions per game
    
    return shuffledValid.map(country => {
        const tour = staticTours[country.name];
        const stop = tour.stops[Math.floor(Math.random() * tour.stops.length)];
        const landmarkName = stop.stopName;
        const imageUrl = STATIC_IMAGES[stop.imageKeyword || landmarkName] || STATIC_IMAGES[country.name];
        
        const distractors: Country[] = [];
        while (distractors.length < 3) {
            const c = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
            if (c.id !== country.id && !distractors.find(d => d.id === c.id)) {
                distractors.push(c);
            }
        }
        
        return {
            country,
            landmarkName,
            imageUrl,
            options: shuffle([country, ...distractors])
        };
    }).filter(q => q.imageUrl);
  }, []);

  const startGame = async () => {
    setGameState('preparing');
    const newQuestions = getQuestionsList();
    
    // Pre-load all images for the current set
    const imagePromises = newQuestions.map(q => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = q.imageUrl;
        img.onload = resolve;
        img.onerror = resolve; // Resolve anyway to not block the game flow
      });
    });

    // Wait for all assets to be cached in browser memory
    await Promise.all(imagePromises);

    setQuestions(newQuestions);
    setScore(0);
    setTimeLeft(60);
    setQuestionIndex(0);
    setCorrectCountries([]);
    setIncorrectCountries([]);
    setHasReported(false);
    setFeedback(null);
    setFeedbackKey(0);
    
    if (newQuestions.length > 0) {
      setCurrentQuestion(newQuestions[0]);
      setSelectedAnswerId(null);
      setGameState('playing');
    } else {
      console.error("No questions generated for Landmark Legend");
      setGameState('start'); // Revert to start if failed
    }
  };

  const handleAnswer = (countryId: string) => {
    if (selectedAnswerId || !currentQuestion) return;
    setSelectedAnswerId(countryId);
    const correct = countryId === currentQuestion.country.id;
    setFeedback(correct ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (correct) {
      setScore(s => s + 20);
      setCorrectCountries(prev => [...prev, currentQuestion.country.id]);
    } else {
      setIncorrectCountries(prev => [...prev, currentQuestion.country.id]);
    }
    
    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < questions.length) {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setSelectedAnswerId(null);
      } else {
        setGameState('finished');
      }
    }, 700);
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
            <SEO title="Landmark Legend" description="Identify countries by their landmarks." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-8 text-center border-2 border-white/20 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
              <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky shadow-glow-sky border border-white/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
                <Camera size={36} className="relative z-10" />
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Landmark Legend</h1>
              <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify nations through their landmarks.</p>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest shadow-glow-sky font-black">PLAY <Play size={20} fill="currentColor" /></Button>
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

        {gameState === 'preparing' && (
          <motion.div
            key="preparing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="text-white font-display font-black text-2xl uppercase tracking-[0.5em] animate-pulse">
              Loading
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
            <SEO title="Playing Landmark Legend" description="Identify countries by their landmarks." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
            </div>

            {/* Top Bar - Back arrow + Title on mobile, full bar on desktop */}
            <div className="max-w-5xl mx-auto w-full flex shrink-0 items-center justify-between md:justify-between mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl shadow-glass border border-white/20 relative overflow-hidden z-10">
               <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
               <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 relative z-10 group shadow-inner">
                 <ArrowLeft size={18} className="transition-transform" />
               </Link>

               {/* Game title - visible on all sizes, centered */}
               <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <h1 className="text-[10px] font-black text-white uppercase tracking-[0.3em] drop-shadow-md">Landmark Legend</h1>
                  <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
               </div>

               {/* Desktop only: points and timer in top bar */}
               <div className="hidden md:flex items-center gap-6 relative z-10">
                 <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-warning drop-shadow-md" />
                    <span className="font-display font-black text-xl text-white tabular-nums drop-shadow-sm">{score}</span>
                 </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-inner transition-all duration-300 relative ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border border-white/30'}`}>
                   <div className="absolute inset-0 bg-glossy-gradient opacity-20 rounded-[inherit]" />
                   <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`}><Timer size={18} /></div>
                   <span className={`font-display font-black text-xl tabular-nums min-w-[36px] relative z-10 drop-shadow-sm ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                </div>
               </div>

               {/* Mobile: empty spacer to balance the back button */}
               <div className="w-[42px] md:hidden" />
            </div>

            <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-3 md:gap-5 min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 p-3 md:p-6 overflow-hidden relative shadow-glass z-10">
               <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
               
               {/* Mobile: Points top-left, Timer top-right */}
               <div className="flex md:hidden items-center justify-between mb-2 relative z-10">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl shadow-inner bg-warning/20 border border-warning/40 relative">
                     <div className="absolute inset-0 bg-glossy-gradient opacity-20 rounded-[inherit]" />
                     <Trophy size={16} className="text-warning drop-shadow-md relative z-10" />
                     <span className="font-display font-black text-lg text-white tabular-nums drop-shadow-sm relative z-10">{score}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-2.5 py-1 rounded-xl shadow-inner transition-all duration-300 relative ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border border-white/30'}`}>
                     <div className="absolute inset-0 bg-glossy-gradient opacity-20 rounded-[inherit]" />
                     <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`}><Timer size={16} /></div>
                     <span className={`font-display font-black text-lg tabular-nums min-w-[32px] relative z-10 drop-shadow-sm ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                  </div>
               </div>

               <AnimatePresence mode="wait">
                 <motion.div
                   key={questionIndex}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.02 }}
                   transition={{ duration: 0.3 }}
                   className="flex-1 flex flex-col md:flex-row gap-2 md:gap-5 min-h-0 relative z-10"
                 >
                   <div className="flex-1 flex flex-col min-h-0 relative z-10">
                      <p className="text-sky font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-center mb-2 font-sans drop-shadow-glow-sky">IDENTIFY MISSION TARGET</p>
                      <div className="relative flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-inner group min-h-[160px] md:min-h-0">
                          <img 
                              src={currentQuestion.imageUrl} 
                              alt="Landmark" 
                              className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 p-2 md:p-4 bg-surface-dark/80 backdrop-blur-2xl rounded-xl md:rounded-2xl border border-white/40 text-white flex items-center gap-2 md:gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden z-20">
                             <div className="absolute inset-0 bg-glossy-gradient opacity-15 pointer-events-none rounded-[inherit]" />
                             <div className="p-1.5 md:p-2 bg-sky/30 rounded-lg relative z-10 border border-white/20"><MapPin size={16} className="md:w-5 md:h-5 text-sky-light" /></div>
                             <h2 className="font-display font-black text-sm md:text-xl drop-shadow-2xl relative z-10 uppercase tracking-tighter leading-tight line-clamp-2">{currentQuestion.landmarkName}</h2>
                          </div>
                      </div>
                   </div>

                   <div className="w-full md:w-72 flex flex-col justify-center gap-2 md:gap-2.5 shrink-0 pb-2 relative z-10">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswerId === option.id;
                        const isCorrect = option.id === currentQuestion.country.id;
                        const isWrong = isSelected && !isCorrect;
                        
                        let stateStyles = "bg-white/10 border border-white/40 text-white hover:bg-white/20 hover:border-sky/50 shadow-glass-bubble relative overflow-hidden group/opt";
                        
                        if (selectedAnswerId) {
                          if (isCorrect) stateStyles = "bg-accent/70 border-accent shadow-glow-accent text-white group/opt";
                          else if (isSelected) stateStyles = "bg-red-500/70 border-red-500 shadow-glow-warning text-white group/opt";
                          else if (option.id === currentQuestion.country.id) stateStyles = "bg-accent/20 border-accent/60 text-white/90 group/opt";
                          else stateStyles = "bg-white/5 border-white/5 text-white/20 opacity-40 grayscale blur-[1px] group/opt";
                        }

                        return (
                          <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            disabled={!!selectedAnswerId}
                            className={`relative p-2.5 md:p-3 rounded-xl md:rounded-2xl font-display font-black text-xs md:text-base flex items-center justify-between min-h-[48px] md:min-h-[60px] transition-all duration-500 uppercase tracking-tighter group ${stateStyles} ${isWrong ? 'animate-shake' : ''}`}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover/opt:opacity-20 pointer-events-none rounded-[inherit]" />
                            <span className="text-left leading-tight truncate pr-2 relative z-10 drop-shadow-md">{option.name}</span>
                            <img 
                              src={`https://flagcdn.com/w80/${getCountryCode(option.flag)}.png`}
                              alt={`${option.name} Flag`}
                              className="h-5 md:h-6 w-auto relative z-10 drop-shadow-lg object-contain shrink-0"
                            />
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
