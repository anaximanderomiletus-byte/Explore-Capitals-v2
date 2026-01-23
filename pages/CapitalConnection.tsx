import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, ArrowLeft, Building2, Network, Play } from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';

// Better shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

interface GameCard {
  id: string;
  label: string;
  type: 'country' | 'capital';
  countryId: string;
  isMatched: boolean;
  isSelected: boolean;
  isWrong: boolean;
  flagCode?: string; // Just store the code, not the element
}

export default function CapitalConnection() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  // Timer logic
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

  // Reporting results
  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'capital-connection',
        score,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const generateBoard = useCallback(() => {
    const roundCountries = shuffleArray(MOCK_COUNTRIES).slice(0, 6);
    const newCards: GameCard[] = [];
    
    roundCountries.forEach(country => {
      // Country Card
      newCards.push({
        id: `country-${country.id}`,
        label: country.name,
        type: 'country',
        countryId: country.id,
        isMatched: false,
        isSelected: false,
        isWrong: false,
        flagCode: getCountryCode(country.flag)
      });
      
      // Capital Card
      newCards.push({
        id: `capital-${country.id}`,
        label: country.capital,
        type: 'capital',
        countryId: country.id,
        isMatched: false,
        isSelected: false,
        isWrong: false
      });
    });
    
    setCards(shuffleArray(newCards));
    setSelectedIds([]);
    setIsProcessing(false);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(60);
    setHasReported(false);
    setFeedback(null);
    setFeedbackKey(0);
    generateBoard();
    setGameState('playing');
  }, [generateBoard]);

  const handleCardClick = useCallback((cardId: string) => {
    if (isProcessing || gameState !== 'playing') return;

    setCards(prevCards => {
      const clickedCard = prevCards.find(c => c.id === cardId);
      if (!clickedCard || clickedCard.isMatched || clickedCard.isSelected) return prevCards;

      const newCards = prevCards.map(c => c.id === cardId ? { ...c, isSelected: true } : c);
    const newSelectedIds = [...selectedIds, cardId];

    if (newSelectedIds.length === 2) {
      setIsProcessing(true);
        const card1 = newCards.find(c => c.id === newSelectedIds[0])!;
        const card2 = newCards.find(c => c.id === newSelectedIds[1])!;

        if (card1.countryId === card2.countryId) {
          // CORRECT MATCH
          setFeedback('correct');
          setFeedbackKey(f => f + 1);
          setScore(s => s + 10);
          
          setTimeout(() => {
            setCards(finalCards => {
              const matchedCards = finalCards.map(c => 
                (c.id === card1.id || c.id === card2.id) 
                  ? { ...c, isMatched: true, isSelected: false } 
                  : c
              );
              
              const allMatched = matchedCards.every(c => c.isMatched);
              if (allMatched) {
                setTimeout(generateBoard, 500);
              }
              
              setIsProcessing(false);
            setSelectedIds([]);
              return matchedCards;
            });
          }, 300);
        } else {
          // INCORRECT MATCH
          setFeedback('incorrect');
          setFeedbackKey(f => f + 1);
          
          setTimeout(() => {
            setCards(finalCards => finalCards.map(c => 
              (c.id === card1.id || c.id === card2.id) ? { ...c, isWrong: true } : c
            ));
          }, 100);

          setTimeout(() => {
            setCards(finalCards => finalCards.map(c => 
              (c.id === card1.id || c.id === card2.id) ? { ...c, isSelected: false, isWrong: false } : c
            ));
            setIsProcessing(false);
            setSelectedIds([]);
          }, 800);
        }
      } else {
        setSelectedIds(newSelectedIds);
      }

      return newCards;
    });
  }, [isProcessing, gameState, selectedIds, generateBoard]);

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
        <SEO title="Capital Connection" description="Connect countries to their capitals." />
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
        </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl shadow-glass p-8 text-center border-2 border-white/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
          <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky shadow-glow-sky border border-white/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
            <Network size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">Capital Connection</h1>
          <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em] leading-relaxed">Connect nations to their capitals.</p>
            <div className="flex flex-col gap-6">
            <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest shadow-glow-sky font-black">PLAY <Play size={20} fill="currentColor" /></Button>
                <button onClick={() => navigate('/games')} className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group relative z-20 pointer-events-auto">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Games
            </button>
          </div>
        </div>
          </motion.div>
        )}


        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col px-3 md:px-4 pt-20 pb-4 md:pb-6 overflow-hidden"
          >
      <SEO title="Playing Capital Connection" description="Match the country to its capital." />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-sky/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      {/* Top Bar - Back arrow + Title on mobile, full bar on desktop */}
      <div className="max-w-4xl mx-auto w-full flex shrink-0 items-center justify-between md:justify-between mb-3 md:mb-4 bg-white/10 backdrop-blur-2xl p-2.5 md:p-3 rounded-2xl shadow-glass border border-white/20 relative overflow-hidden z-10">
         <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
         <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-75 border border-white/10 relative z-10 group shadow-inner">
           <ArrowLeft size={18} className="transition-transform" />
         </Link>

         {/* Game title - visible on all sizes, centered */}
         <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <h1 className="text-[10px] font-black text-white uppercase tracking-[0.3em] drop-shadow-md">Capital Connection</h1>
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

      <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col overflow-hidden relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-6">
          {/* Mobile: Points top-left, Timer top-right */}
          <div className="flex md:hidden items-center justify-between mb-4 relative z-10">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/15 border border-warning/30">
                <Trophy size={16} className="text-warning" />
                <span className="font-display font-black text-lg text-white tabular-nums">{score}</span>
             </div>
             <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${timeLeft < 10 ? 'bg-red-500/15 border border-error' : 'bg-sky/20 border border-white/20'}`}>
                <div className={timeLeft < 10 ? 'text-error' : 'text-sky-light'}><Timer size={16} /></div>
                <span className={`font-display font-black text-lg tabular-nums min-w-[32px] ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
             </div>
          </div>

          <div className="flex-1 grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 auto-rows-fr content-center relative z-10">
            {cards.map(card => (
              <Card 
                key={card.id} 
                card={card} 
                onClick={() => handleCardClick(card.id)} 
              />
            ))}
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
                <button onClick={() => navigate('/games')} className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group relative z-20 pointer-events-auto">
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

// Memoized Card component to prevent unnecessary re-renders
const Card = React.memo(({ card, onClick }: { card: GameCard, onClick: () => void }) => {
  let stateStyle = "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-sky/40";
  
  if (card.isMatched) {
    stateStyle = "bg-accent/30 border-accent/50 text-white/50 cursor-default opacity-50";
  } else if (card.isWrong) {
    stateStyle = "bg-red-500/30 border-red-400 text-white";
  } else if (card.isSelected) {
    stateStyle = "bg-sky/25 border-sky text-white";
  }

  return (
    <button
      onClick={onClick}
      disabled={card.isMatched}
      className={`h-full min-h-[80px] md:min-h-[100px] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-200 border-2 ${stateStyle} ${card.isWrong ? 'animate-shake' : ''}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className={`mb-2 transition-all duration-200 ${card.type === 'country' ? '' : (card.isMatched ? 'opacity-50' : 'opacity-60')}`}>
        {card.type === 'country' ? (
          <img 
            src={`https://flagcdn.com/w80/${card.flagCode}.png`}
            alt="Flag"
            className="w-10 h-auto md:w-12 select-none object-contain"
            loading="lazy"
          />
        ) : (
          <Building2 size={20} className={`md:w-6 md:h-6 ${card.isMatched ? 'text-white/60' : 'text-sky-light'}`} />
        )}
      </div>

      <span className="font-bold leading-tight text-[10px] md:text-xs uppercase tracking-tight line-clamp-2">
        {card.label}
      </span>
    </button>
  );
});
