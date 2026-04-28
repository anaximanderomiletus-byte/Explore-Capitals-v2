
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, RefreshCw, Globe2, Play } from 'lucide-react';
import { COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useUser } from '../context/UserContext';
import { useLayout } from '../context/LayoutContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import { getFlagUrl } from '../utils/flags';
import TimeSelector from '../components/TimeSelector';
import GameSideAds from '../components/GameSideAds';
import { getGameStructuredData } from '../utils/gameStructuredData';
import { useTranslation } from '../context/LocaleContext';
import GameNavigationButtons from '../components/GameNavigationButtons';

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function CapitalQuiz() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{ country: Country; options: Country[] } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
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

  const setupQuestion = (target: Country) => {
    const distractors: Country[] = [];
    while (distractors.length < 3) {
      const c = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      if (c.id !== target.id && !distractors.find(d => d.id === c.id)) {
        distractors.push(c);
      }
    }
    const options = shuffle([target, ...distractors]);
    setCurrentQuestion({ country: target, options });
    setSelectedAnswer(null);

    // Preload flag for this question
    const img = new Image();
    img.src = getFlagUrl(target.flag);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameDuration);
    setFeedback(null);
    setFeedbackKey(0);
    const queue = shuffle([...COUNTRIES]);
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

  const handleAnswer = (capital: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(capital);
    const correct = capital === currentQuestion.country.capital;
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
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
      }
    }, 700);
  };

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'capital-quiz',
        score,
        correctCountries,
        incorrectCountries,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, correctCountries, incorrectCountries, timeLeft, gameDuration]);

    return (
    <div className="h-screen h-[100svh] bg-surface-dark font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}png/GAMES/capital-quiz.png`} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
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
          title="Capital Quiz - Games"
          description="Test your knowledge of world capitals in this fast-paced 60-second quiz. How many capital cities can you name?"
          structuredData={getGameStructuredData({
            name: 'Capital Quiz',
            slug: 'capital-quiz',
            description: 'Test your knowledge of world capitals in this fast-paced 60-second quiz. How many capital cities can you name?',
            image: '/png/GAMES/capital-quiz.png',
          })}
        />

        {/* Background Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/15 rounded-full blur-3xl opacity-80" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-sky/5 rounded-full blur-3xl opacity-60" />
        </div>

            <GameSideAds />
            <div className="mx-auto mt-6 mb-8 sm:m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
            
            <div className="game-lobby-card w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-8 sm:p-12 text-center border-2 border-white/40 overflow-hidden group relative">
          <div className="w-24 h-24 rounded-2xl mx-auto mb-8 border border-white/30 relative overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}png/GAMES/capital-quiz.png`} alt="Capital Quiz" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Capital Quiz</h1>
          <p className="text-white/70 text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed">Identify world capitals. Speed is vital.</p>
          <div className="mb-6"><TimeSelector value={gameDuration} onChange={setGameDuration} /></div>
          <div className="flex flex-col gap-6 w-full">
                <Button onClick={startGame} size="lg" className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto">
               PLAY <Play className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]" fill="currentColor" />
            </Button>
          </div>
              <GameNavigationButtons />
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
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-16 pb-2 md:pb-6 overflow-y-auto overflow-x-hidden"
          >
      <SEO title="Capital Quiz - Games" description="Test your knowledge of world capitals in this fast-paced 60-second quiz. How many capital cities can you name?" />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/2.5 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
      <div className="game-top-bar max-w-2xl mx-auto w-full flex shrink-0 items-center gap-2 mb-2 md:mb-4 bg-white/10 backdrop-blur-2xl p-2 md:p-3 rounded-2xl border border-white/20 z-10">
         <Link to="/games/all" className="game-back-btn p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
           <ArrowLeft size={18} className="transition-transform" />
         </Link>

         {/* Game title - flexbox centered, will shrink if needed */}
         <div className="flex-1 flex flex-col items-center justify-center min-w-0">
            <h2 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Capital Quiz</h2>
            <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
         </div>

         {/* Spacer to balance the back button */}
         <div className="game-back-spacer w-[42px] shrink-0" />
      </div>

      <div className="game-card flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-white/15 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/30 p-2 sm:p-3 md:p-8 overflow-y-auto overflow-x-hidden relative z-10">
         
         {/* Points and Timer - Responsive layout for all screen sizes */}
         <div className="game-score-bar flex items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4 relative z-20 shrink-0">
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
                   key={questionIndex}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   style={{ willChange: 'transform, opacity' }}
                   className="flex-1 flex flex-col min-h-0"
                 >
         <div className="game-content flex flex-col items-center justify-center flex-1 min-h-0 pt-0 pb-2 md:pt-2 md:pb-4 relative z-10 overflow-hidden">
            <p className="text-sky-light font-black text-[9px] uppercase tracking-[0.4em] mb-1 md:mb-1 font-sans opacity-80 shrink-0">IDENTIFY CAPITAL</p>
            <h3 className="text-xl md:text-4xl font-display font-black text-white text-center px-4 leading-tight max-w-full break-words uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] mb-2 md:mb-4 shrink-0">
              {currentQuestion.country.name}
            </h3>
            <img
              src={getFlagUrl(currentQuestion.country.flag)}
              alt={`${currentQuestion.country.name} Flag`}
              className="game-flag max-h-[12vh] md:max-h-[20vh] w-auto min-h-0 shrink drop-shadow-2xl object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
         </div>

         <div className="game-options-grid grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 pb-2 md:pb-4 relative z-10">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.capital;
              const isCorrect = option.capital === currentQuestion.country.capital;
              const isWrong = isSelected && !isCorrect;
              
                              // No hover styles - prevents "pre-highlighted" appearance on touch devices
                              let stateStyles = "bg-white/10 border-2 border-white/40 text-white active:bg-white/20 active:border-sky/50";
                              if (selectedAnswer) {
                                if (isCorrect) stateStyles = "bg-accent/70 border-2 border-accent text-white";
                                else if (isSelected) stateStyles = "bg-red-500/70 border-2 border-red-500 text-white";
                                else if (option.capital === currentQuestion.country.capital) stateStyles = "bg-accent/40 border-2 border-accent/80 text-white";
                                else stateStyles = "bg-white/5 border-2 border-white/5 text-white/20 opacity-40 grayscale blur-[1px]";
                              }

                              return (
                                <button
                                  key={option.id}
                                  onClick={() => handleAnswer(option.capital)}
                                  disabled={!!selectedAnswer}
                                  className={`game-option relative p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm md:text-lg flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] transition-colors duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? 'animate-shake' : ''}`}
                                  style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                  <span className="px-1 sm:px-2 text-center leading-tight relative z-10 drop-shadow-sm">{option.capital}</span>
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
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
            <GameSideAds />
            <div className="mx-auto mt-6 mb-8 sm:m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
            
            <div className="w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-8 sm:p-12 text-center border-2 border-white/40 overflow-hidden group">
              <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-white/40 relative overflow-hidden">
                <Trophy size={36} className="relative z-10 drop-shadow-lg" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-4 uppercase tracking-tighter drop-shadow-md">FINISHED!</h2>
              <p className="text-white/60 mb-6 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-sm">{t('game.finalScore')}</p>
              <div className="text-7xl font-display font-black text-white mb-8 tabular-nums tracking-tighter">{score}</div>
              <div className="flex flex-col gap-6 w-full">
                <Button onClick={startGame} size="lg" className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto">
                   {t('game.playAgain')} <Play className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]" fill="currentColor" />
                </Button>
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
