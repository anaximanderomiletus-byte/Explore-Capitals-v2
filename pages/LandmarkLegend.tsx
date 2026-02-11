
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
import TimeSelector from '../components/TimeSelector';
import GameSideAds from '../components/GameSideAds';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
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
  const [gameDuration, setGameDuration] = useState(60);
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
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, correctCountries, incorrectCountries, timeLeft]);

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
    setTimeLeft(gameDuration);
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
            className="h-full flex px-3 sm:px-4 py-16 overflow-y-auto"
          >
            <SEO title="Landmark Legend - Games" description="Identify countries by their famous landmarks. Test your knowledge of world monuments, natural wonders, and iconic locations." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
            </div>

            <GameSideAds />
            <div className="m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
              <div className="w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/20 overflow-hidden">
                <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky border border-white/30 relative overflow-hidden">
                  <Camera size={36} className="relative z-10" />
                </div>
                <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Landmark Legend</h1>
                <p className="text-white/40 text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify nations through their landmarks.</p>
                <div className="mb-6"><TimeSelector value={gameDuration} onChange={setGameDuration} /></div>
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
            </div>
          </motion.div>
        )}

        {gameState === 'preparing' && (
          <motion.div
            key="preparing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center px-3 sm:px-4 py-16"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-10 h-10 border-[3px] border-white/20 border-t-sky rounded-full animate-spin" />
              <div className="text-white/60 font-display font-black text-sm uppercase tracking-[0.2em]">
                Loading
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
            <SEO title="Landmark Legend - Games" description="Identify countries by their famous landmarks. Test your knowledge of world monuments, natural wonders, and iconic locations." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
            </div>

            {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
            <div className="max-w-2xl mx-auto w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
               <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
                 <ArrowLeft size={18} className="transition-transform" />
               </Link>

               {/* Game title - flexbox centered, will shrink if needed */}
               <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                  <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Landmark Legend</h1>
                  <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
               </div>

               {/* Spacer to balance the back button */}
               <div className="w-[42px] shrink-0" />
            </div>

            <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-white/15 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/30 p-2.5 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden relative z-10">
               
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
                   key={questionIndex}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="flex-1 flex flex-col min-h-0"
                 >
                   {/* Centered image area */}
                   <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-2 md:pt-2 md:pb-6 relative z-10">
                      <p className="text-sky-light font-black text-[9px] md:text-xs uppercase tracking-[0.4em] mb-2 md:mb-3 font-sans opacity-80 shrink-0">IDENTIFY MISSION TARGET</p>
                      <div 
                       className="relative w-full max-w-sm md:max-w-md h-auto max-h-60 md:max-h-96 min-h-0 shrink rounded-xl md:rounded-2xl overflow-hidden bg-black/60 border-2 border-white/20 md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_-20px_40px_-20px_rgba(56,189,248,0.15)]"
                       style={{ 
                         transform: 'perspective(1000px) rotateX(2deg)',
                       }}
                     >
                          {/* Subtle shine overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10" />
                          <img 
                              src={currentQuestion.imageUrl} 
                              alt="Landmark" 
                              className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
                          {/* Frame effect - top highlight */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 p-2 md:p-3 bg-surface-dark/80 backdrop-blur-2xl rounded-lg md:rounded-xl border border-white/40 text-white flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden z-20">
                             <div className="p-1.5 bg-sky/30 rounded-lg relative z-10 border border-white/20"><MapPin size={14} className="md:w-4 md:h-4 text-sky-light" /></div>
                             <h2 className="font-display font-black text-xs md:text-base drop-shadow-2xl relative z-10 uppercase tracking-tighter leading-tight line-clamp-1">{currentQuestion.landmarkName}</h2>
                          </div>
                      </div>
                   </div>

                   {/* Grid of options at bottom */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 pb-2 md:pb-4 relative z-10">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswerId === option.id;
                        const isCorrect = option.id === currentQuestion.country.id;
                        const isWrong = isSelected && !isCorrect;
                        
                        // No hover styles - prevents "pre-highlighted" appearance on touch devices
                        let stateStyles = "bg-white/10 border-2 border-white/40 text-white active:bg-white/20 active:border-sky/50";
                        
                        if (selectedAnswerId) {
                          if (isCorrect) stateStyles = "bg-accent/70 border-accent text-white";
                          else if (isSelected) stateStyles = "bg-red-500/70 border-red-500 text-white";
                          else if (option.id === currentQuestion.country.id) stateStyles = "bg-accent/40 border-accent/80 text-white";
                          else stateStyles = "bg-white/5 border-white/5 text-white/20 opacity-40 grayscale blur-[1px]";
                        }

                        return (
                          <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            disabled={!!selectedAnswerId}
                            className={`game-option relative p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm md:text-lg flex items-center justify-center min-h-[42px] sm:min-h-[52px] md:min-h-[64px] transition-colors duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? 'animate-shake' : ''}`}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <span className="text-center leading-tight relative z-10 drop-shadow-sm">{option.name}</span>
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
            className="h-full flex px-3 sm:px-4 py-16 overflow-y-auto"
          >
            <GameSideAds />
            <div className="m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
              <div className="w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/20 overflow-hidden">
                <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-white/40 relative overflow-hidden">
                  <Trophy size={36} className="relative z-10 drop-shadow-lg" />
                </div>
                <h1 className="text-5xl font-display font-black text-white mb-4 uppercase tracking-tighter drop-shadow-md">FINISHED!</h1>
                <p className="text-white/40 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] drop-shadow-sm">Final Score</p>
                <div className="text-7xl font-display font-black text-white mb-8 tabular-nums">{score}</div>
                <div className="flex flex-col gap-6">
                  <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">Play Again <Play size={20} fill="currentColor" /></Button>
                  <button 
                    onClick={() => navigate('/games')}
                    className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group relative z-20 pointer-events-auto"
                  >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to Games
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
