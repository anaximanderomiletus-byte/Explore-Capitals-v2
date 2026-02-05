import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Car, Play, Lock, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { useGameLimit } from '../hooks/useGameLimit';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

export default function DrivingDirection() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [selectedSide, setSelectedSide] = useState<'Left' | 'Right' | null>(null);
  const [imgError, setImgError] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const { isPremium } = useGameLimit();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  // Filter countries that have driveSide data
  const countriesWithDriveSide = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => c.driveSide === 'Left' || c.driveSide === 'Right');
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'driving-direction',
        score,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const generateRound = useCallback(() => {
    setResult(null);
    setSelectedSide(null);
    setImgError(false);
    
    const country = countriesWithDriveSide[Math.floor(Math.random() * countriesWithDriveSide.length)];
    setCurrentCountry(country);

    // Preload next potential flag
    const nextIdx = Math.floor(Math.random() * countriesWithDriveSide.length);
    const img = new Image();
    img.src = `https://flagcdn.com/w320/${getCountryCode(countriesWithDriveSide[nextIdx].flag)}.png`;
  }, [countriesWithDriveSide]);

  const startGame = () => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }
    setScore(0);
    setTimeLeft(60);
    setHasReported(false);
    setResult(null);
    setFeedbackKey(0);
    generateRound();
    setGameState('playing');
  };

  const handleChoice = (side: 'Left' | 'Right') => {
    if (result || !currentCountry) return;
    
    setSelectedSide(side);
    const isCorrect = side === currentCountry.driveSide;
    
    setResult(isCorrect ? 'correct' : 'incorrect');
    setFeedbackKey(prev => prev + 1);
    if (isCorrect) setScore(s => s + 10);
    
    setTimeout(generateRound, 700);
  };

  // Premium check screen
  if (!isPremium && gameState === 'start') {
    return (
      <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden flex items-center justify-center px-4">
        <SEO title="Driving Direction - Premium Game" description="Guess which side of the road countries drive on! A premium geography game." />
        
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-amber-500/10 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-amber-500/30 relative z-10">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Lock size={36} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Driving Direction</h1>
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
            <SEO title="Driving Direction - Premium Game" description="Guess which side of the road countries drive on! A premium geography game." />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/20 relative z-10">
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} /> Premium
              </div>
              <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky border border-white/30">
                <Car size={36} />
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Driving Direction</h1>
              <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em]">Left or Right side of the road?</p>
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

        {gameState === 'playing' && currentCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col px-3 md:px-4 pt-20 pb-4 md:pb-6 overflow-hidden"
          >
            <SEO title="Driving Direction - Playing" description="Which side of the road do they drive on?" />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
            </div>

            {/* Top Bar */}
            <div className="max-w-5xl mx-auto w-full flex shrink-0 items-center gap-2 mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl border border-white/20 z-10">
              <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
                <ArrowLeft size={18} className="transition-transform" />
              </Link>

              <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <h1 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Driving Direction</h1>
                <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
              </div>

              <div className="w-[42px] shrink-0" />
            </div>

            <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 overflow-hidden relative z-10 p-3 md:p-6">
              
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

              <div className="flex-1 flex flex-col px-0 md:px-2 relative z-10">
                {/* Question Text */}
                <div className="flex flex-col items-center justify-center mb-3 md:mb-4 shrink-0">
                  <p className="text-sky-light font-black text-[9px] md:text-xs uppercase tracking-[0.3em]">Which side of the road does</p>
                  <h2 className="text-white font-display font-black text-xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">{currentCountry.name}</h2>
                  <p className="text-sky-light font-black text-[9px] md:text-xs uppercase tracking-[0.3em]">drive on?</p>
                </div>

                {/* Country Flag */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCountry.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-center mb-4 md:mb-6"
                  >
                    <div className={`w-full max-w-[140px] md:max-w-[220px] aspect-[3/2] flex items-center justify-center transition-all duration-300 ${result ? 'scale-90' : 'scale-100'}`}>
                      {!imgError ? (
                        <img 
                          src={`https://flagcdn.com/w320/${getCountryCode(currentCountry.flag)}.png`}
                          alt={`${currentCountry.name} flag`}
                          className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <img 
                          src={`https://flagcdn.com/w160/${getCountryCode(currentCountry.flag)}.png`}
                          alt={`${currentCountry.name} flag fallback`}
                          className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                        />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Choice Buttons */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full grid grid-cols-2 gap-3 md:gap-5 max-w-xl md:max-w-2xl mx-auto">
                    {(['Left', 'Right'] as const).map((side) => {
                      const isCorrect = currentCountry.driveSide === side;
                      const isSelected = selectedSide === side;
                      const isWrong = isSelected && !isCorrect;
                      
                      let cardStyle = "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 active:bg-white/15 active:border-sky/50";
                      let iconColor = "text-white/60";
                      let textColor = "text-white/80";
                      
                      if (result) {
                        if (isCorrect) {
                          cardStyle = "bg-accent/60 border-2 border-accent";
                          iconColor = "text-white";
                          textColor = "text-white";
                        } else if (isSelected) {
                          cardStyle = "bg-red-500/60 border-2 border-red-500";
                          iconColor = "text-white";
                          textColor = "text-white";
                        } else {
                          cardStyle = "bg-black/20 border-white/5 opacity-30";
                          iconColor = "text-white/20";
                          textColor = "text-white/20";
                        }
                      }

                      return (
                        <button
                          key={side}
                          onClick={() => handleChoice(side)}
                          disabled={!!result}
                          className={`min-h-[120px] md:min-h-[180px] relative rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group overflow-hidden ${cardStyle} ${isWrong ? 'animate-shake' : ''}`}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <div className={`mb-2 md:mb-4 transition-colors duration-300 ${iconColor}`}>
                            {side === 'Left' ? <ChevronLeft size={48} className="md:w-16 md:h-16" /> : <ChevronRight size={48} className="md:w-16 md:h-16" />}
                          </div>
                          <h3 className={`text-lg md:text-2xl font-display font-black uppercase tracking-tighter transition-colors duration-300 ${textColor}`}>
                            {side}
                          </h3>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <FeedbackOverlay type={result} triggerKey={feedbackKey} />
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
            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-10 text-center border-2 border-white/20 relative z-10 overflow-hidden">
              <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning border border-white/30 relative overflow-hidden">
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
      </AnimatePresence>
    </div>
  );
}
