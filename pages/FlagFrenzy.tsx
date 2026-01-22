import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, RefreshCw, Flag } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useUser } from '../context/UserContext';
import { useLayout } from '../context/LayoutContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Helper to calculate ISO code from emoji flag
const getCountryCode = (emoji: string) => {
    return Array.from(emoji)
        .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
        .join('');
};

export default function FlagFrenzy() {
  const [gameState, setGameState] = useState<'start' | 'loading' | 'playing' | 'finished'>('loading');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{ country: Country; options: Country[] } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
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

  const setupQuestion = (target: Country) => {
    const distractors: Country[] = [];
    while (distractors.length < 3) {
      const c = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
      if (c.id !== target.id && !distractors.find(d => d.id === c.id)) {
        distractors.push(c);
      }
    }
    const options = shuffle([target, ...distractors]);
    setCurrentQuestion({ country: target, options });
    setSelectedAnswer(null);
    setImgError(false);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setFeedback(null);
    setFeedbackKey(0);
    const queue = shuffle([...MOCK_COUNTRIES]);
    setShuffledCountries(queue);
    setQuestionIndex(0);
    setCorrectCountries([]);
    setIncorrectCountries([]);
    setHasReported(false);
    if (queue.length > 0) {
      setupQuestion(queue[0]);
    }
    setGameState('playing');
  };

  const handleAnswer = (countryName: string) => {
    if (selectedAnswer || !currentQuestion) return; 
    setSelectedAnswer(countryName);
    const correct = countryName === currentQuestion.country.name;
    setFeedback(correct ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (correct) {
      setScore(s => s + 10);
      setCorrectCountries(prev => [...prev, currentQuestion.country.id]);
    } else {
      setIncorrectCountries(prev => [...prev, currentQuestion.country.id]);
    }
    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < shuffledCountries.length) {
        setQuestionIndex(nextIndex);
        setupQuestion(shuffledCountries[nextIndex]);
      } else {
        setGameState('finished');
      }
    }, 700);
  };

  const currentCountryCode = useMemo(() => {
    if (!currentQuestion) return '';
    return getCountryCode(currentQuestion.country.flag);
  }, [currentQuestion]);

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'flag-frenzy',
        score,
        correctCountries,
        incorrectCountries,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, correctCountries, incorrectCountries, timeLeft]);

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
            <SEO title="Flag Frenzy" description="Match the flag to the correct nation in 60 seconds." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-8 text-center border-2 border-white/20 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
              <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky shadow-glow-sky border border-white/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
                <Flag size={36} className="relative z-10" />
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Flag Frenzy</h1>
              <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Match flags to nations.</p>
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

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col p-4 overflow-hidden"
          >
            <SEO title="Playing Flag Frenzy" description="Match the flag to the correct nation." />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-2xl mx-auto w-full flex shrink-0 items-center justify-between mb-4 bg-white/10 backdrop-blur-2xl p-3 rounded-2xl shadow-glass border border-white/20 mt-16 md:mt-20 relative overflow-hidden z-10">
               <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
               <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 relative z-10 group shadow-inner">
                 <ArrowLeft size={18} className="transition-transform" />
               </Link>

               <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <h1 className="text-[10px] font-black text-white uppercase tracking-[0.3em] drop-shadow-md">Flag Frenzy</h1>
                  <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
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

            <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/30 p-5 md:p-8 overflow-hidden relative shadow-glass z-10">
               <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
               <AnimatePresence mode="wait">
                 <motion.div
                   key={questionIndex}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="flex-1 flex flex-col min-h-0"
                 >
                   <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-3 md:py-6 relative z-10">
                      <p className="text-sky-light font-black text-[9px] uppercase tracking-[0.4em] mb-8 font-sans drop-shadow-glow-sky mt-[-1rem] md:mt-[-2rem]">IDENTIFY FLAG</p>
                      <div className="flex-1 flex items-center justify-center w-full min-h-[80px] max-h-[140px] relative">
                        {!imgError ? (
                          <img 
                            src={`https://flagcdn.com/w640/${currentCountryCode}.png`}
                            alt="Target Flag"
                            className="max-w-full max-h-[80px] md:max-h-[140px] object-contain drop-shadow-2xl transform scale-105"
                            onError={() => setImgError(true)}
                          />
                        ) : (
                          <img 
                            src={`https://flagcdn.com/w160/${getCountryCode(currentQuestion.country.flag)}.png`}
                            alt="Target Flag Fallback"
                            className="max-w-full max-h-[80px] md:max-h-[140px] object-contain drop-shadow-2xl"
                          />
                        )}
                      </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0 pb-4 relative z-10">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option.name;
                        const isCorrect = option.name === currentQuestion.country.name;
                        const isWrong = isSelected && !isCorrect;
                        
                        let stateStyles = "bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 hover:border-sky/50 shadow-glass-bubble";
                        if (selectedAnswer) {
                          if (isCorrect) stateStyles = "bg-accent/70 border-accent shadow-glow-accent text-white";
                          else if (isSelected) stateStyles = "bg-red-500/70 border-red-500 shadow-glow-warning text-white";
                          else if (option.name === currentQuestion.country.name) stateStyles = "bg-accent/40 border-accent/80 text-white";
                          else stateStyles = "bg-white/5 border-white/5 text-white/20 opacity-40 grayscale blur-[1px]";
                        }
                        return (
                          <button 
                            key={option.id} 
                            onClick={() => handleAnswer(option.name)} 
                            disabled={!!selectedAnswer} 
                            className={`relative p-3 rounded-2xl font-display font-black text-base md:text-lg flex items-center justify-center min-h-[56px] md:min-h-[64px] transition-all duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? 'animate-shake' : ''} group`}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover:opacity-20 pointer-events-none rounded-[inherit]" />
                            <span className="px-2 text-center truncate leading-tight relative z-10 drop-shadow-sm">{option.name}</span>
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

