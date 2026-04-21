import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Play, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import { getFlagUrl } from '../utils/flags';
import TimeSelector from '../components/TimeSelector';
import GameSideAds from '../components/GameSideAds';
import { getGameStructuredData } from '../utils/gameStructuredData';
import { useTranslation } from '../context/LocaleContext';
import GameFooterNav from '../components/GameFooterNav';

export default function DrivingDirection() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [previousCountryId, setPreviousCountryId] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [selectedSide, setSelectedSide] = useState<'Left' | 'Right' | null>(null);
  const [imgError, setImgError] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  // Filter countries that have driveSide data
  const countriesWithDriveSide = useMemo(() => {
    return COUNTRIES.filter(c => c.driveSide === 'Left' || c.driveSide === 'Right');
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
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, timeLeft]);

  const generateRound = useCallback(() => {
    setResult(null);
    setSelectedSide(null);
    setImgError(false);
    
    // Filter out the previous country to avoid back-to-back duplicates
    const availableCountries = previousCountryId 
      ? countriesWithDriveSide.filter(c => c.id !== previousCountryId)
      : countriesWithDriveSide;
    
    const country = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    setPreviousCountryId(country.id);
    setCurrentCountry(country);

    // Preload next potential flag
    const nextIdx = Math.floor(Math.random() * countriesWithDriveSide.length);
    const img = new Image();
    img.src = getFlagUrl(countriesWithDriveSide[nextIdx].flag);
  }, [countriesWithDriveSide, previousCountryId]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameDuration);
    setHasReported(false);
    setResult(null);
    setFeedbackKey(0);
    setPreviousCountryId(null);
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

  return (
    <div className="h-screen h-[100svh] bg-surface-dark font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}png/GAMES/driving-direction.png`} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
      </div>
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex px-3 sm:px-4 py-16 overflow-y-auto"
          >
            <SEO
              title="Driving Direction - Premium Game"
              description="Guess which side of the road countries drive on! A premium geography game."
              structuredData={getGameStructuredData({
                name: 'Driving Direction',
                slug: 'driving-direction',
                description: 'Guess which side of the road countries drive on! A premium geography game.',
                image: '/png/GAMES/driving-direction.png',
              })}
            />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-3xl opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-3xl opacity-40" />
            </div>

            <GameSideAds />
            <div className="m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
            <div className="game-lobby-card w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/20">
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} /> Premium
              </div>
              <div className="w-20 h-20 rounded-2xl mx-auto mb-8 border border-white/30 relative overflow-hidden">
                <img src={`${import.meta.env.BASE_URL}png/GAMES/driving-direction.png`} alt="Driving Direction" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Driving Direction</h2>
              <p className="text-white/40 text-[10px] mb-6 font-bold uppercase tracking-[0.2em]">Left or Right side of the road?</p>
              <div className="mb-6"><TimeSelector value={gameDuration} onChange={setGameDuration} /></div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="lg" className="w-full h-14 sm:h-16 md:h-[4.5rem] text-xl sm:text-2xl uppercase tracking-widest font-black">
                  PLAY <Play size={24} fill="currentColor" />
                </Button>
                <GameFooterNav tone="dim" />
              </div>
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
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-16 pb-2 md:pb-6 overflow-y-auto overflow-x-hidden"
          >
            <SEO title="Driving Direction - Playing" description="Which side of the road do they drive on?" />
            
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-3xl" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Top Bar */}
            <div className="game-top-bar max-w-5xl mx-auto w-full flex shrink-0 items-center gap-2 mb-2 md:mb-4 bg-white/10 backdrop-blur-2xl p-2 md:p-3 rounded-2xl border border-white/20 z-10">
              <Link to="/games/all" className="game-back-btn p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 group shadow-inner shrink-0">
                <ArrowLeft size={18} className="transition-transform" />
              </Link>

              <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <h2 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-md truncate max-w-full text-center">Driving Direction</h2>
                <div className="h-0.5 w-6 bg-sky/40 rounded-full mt-1" />
              </div>

              <div className="game-back-spacer w-[42px] shrink-0" />
            </div>

            <div className="game-card flex-1 max-w-5xl mx-auto w-full flex flex-col min-h-0 bg-white/10 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white/20 overflow-y-auto overflow-x-hidden relative z-10 p-2 sm:p-3 md:p-6">
              
              {/* Points and Timer */}
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4 relative z-20 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner bg-warning/20 border border-warning/40 relative shrink-0">
                  <Trophy size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-warning drop-shadow-md relative z-10" />
                  <span className="font-display font-black text-base sm:text-lg md:text-xl text-white tabular-nums drop-shadow-sm relative z-10">{score}</span>
                </div>
                <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl shadow-inner transition-all duration-300 relative shrink-0 ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 text-white border-2 border-white/30'}`}>
                  <div className={`relative z-10 ${timeLeft < 10 ? 'text-error' : 'text-sky-light'}`}><Timer size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" /></div>
                  <span className={`font-display font-black text-base sm:text-lg md:text-xl tabular-nums min-w-[28px] sm:min-w-[32px] md:min-w-[36px] relative z-10 drop-shadow-sm ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col px-0 md:px-2 relative z-10">
                {/* Question Text */}
                <div className="flex flex-col items-center justify-center mb-3 md:mb-4 shrink-0">
                  <p className="text-sky-light font-black text-[9px] uppercase tracking-[0.4em] opacity-80">Which side of the road does</p>
                  <h2 className="text-white font-display font-black text-xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">{currentCountry.name}</h2>
                  <p className="text-sky-light font-black text-[9px] uppercase tracking-[0.4em] opacity-80">drive on?</p>
                </div>

                {/* Country Flag */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCountry.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.25 }}
                    style={{ willChange: 'transform, opacity' }}
                    className="flex items-center justify-center mb-4 md:mb-6"
                  >
                    <div className={`w-full max-w-[140px] md:max-w-[220px] aspect-[3/2] flex items-center justify-center transition-all duration-300 ${result ? 'scale-90' : 'scale-100'}`}>
                      {!imgError ? (
                        <img 
                          src={getFlagUrl(currentCountry.flag)}
                          alt={`${currentCountry.name} flag`}
                          className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <img 
                          src={getFlagUrl(currentCountry.flag)}
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
                      
                      let cardStyle = "bg-white/5 border border-white/10 active:bg-white/15 active:border-sky/50";
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
                          className={`min-h-[80px] sm:min-h-[100px] md:min-h-[180px] relative rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group overflow-hidden ${cardStyle} ${isWrong ? 'animate-shake' : ''}`}
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
            <div className="w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/40 overflow-hidden group">
              <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-white/40 relative overflow-hidden">
                <Trophy size={36} className="relative z-10 drop-shadow-lg" />
              </div>
              <h2 className="text-5xl font-display font-black text-white mb-4 uppercase tracking-tighter drop-shadow-md">FINISHED!</h2>
              <p className="text-white/60 mb-6 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-sm">{t('game.finalScore')}</p>
              <div className="text-7xl font-display font-black text-white mb-8 tabular-nums tracking-tighter">{score}</div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="lg" className="w-full h-14 sm:h-16 md:h-[4.5rem] text-xl sm:text-2xl uppercase tracking-widest font-black">{t('game.playAgain')} <Play size={24} fill="currentColor" /></Button>
                <GameFooterNav />
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
