import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  Trophy,
  ArrowLeft,
  Building2,
  Network,
  Play,
} from "lucide-react";
import { COUNTRIES } from "../constants";
import Button from "../components/Button";
import { getCountryCode } from "../utils/flags";
import SEO from "../components/SEO";
import { useLayout } from "../context/LayoutContext";
import { useUser } from "../context/UserContext";
import TimeSelector from "../components/TimeSelector";
import GameSideAds from "../components/GameSideAds";
import { getGameStructuredData } from "../utils/gameStructuredData";
import { useTranslation } from "../context/LocaleContext";
import GameNavigationButtons from "../components/GameNavigationButtons";
import { getStaticImages } from "../data/images";
import { preloadImages } from "../utils/preloadImages";

// Better shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

interface GameCard {
  id: string;
  label: string;
  type: "country" | "capital";
  countryId: string;
  isMatched: boolean;
  isSelected: boolean;
  isWrong: boolean;
  isCorrect: boolean;
  flagCode?: string; // Just store the code, not the element
  capitalImage?: string;
}

export default function CapitalConnection() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<
    "start" | "preparing" | "playing" | "finished"
  >("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);

  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  // Refs to avoid stale closures in setTimeout callbacks
  const selectedIdsRef = useRef<string[]>([]);
  const boardGeneratingRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    selectedIdsRef.current = selectedIds;
  }, [selectedIds]);

  useEffect(() => {
    setPageLoading(false);
    getStaticImages().then(setImagesMap);
  }, [setPageLoading]);

  // Timer logic
  useEffect(() => {
    let timer: any;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // Reporting results
  useEffect(() => {
    if (gameState === "finished" && !hasReported) {
      recordGameResult({
        gameId: "capital-connection",
        score,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, timeLeft]);

  const generateBoard = useCallback(async () => {
    // Prevent concurrent board generation
    if (boardGeneratingRef.current) return;
    boardGeneratingRef.current = true;
    setIsProcessing(true);

    const roundCountries = shuffleArray(COUNTRIES).slice(0, 6);
    const IMAGES = await getStaticImages();
    const newCards: GameCard[] = [];

    roundCountries.forEach((country) => {
      // Country Card
      newCards.push({
        id: `country-${country.id}`,
        label: country.name,
        type: "country",
        countryId: country.id,
        isMatched: false,
        isSelected: false,
        isWrong: false,
        isCorrect: false,
        flagCode: getCountryCode(country.flag),
      });

      // Capital Card
      newCards.push({
        id: `capital-${country.id}`,
        label: country.capital,
        type: "capital",
        countryId: country.id,
        isMatched: false,
        isSelected: false,
        isWrong: false,
        isCorrect: false,
        capitalImage: IMAGES[country.name] || IMAGES[country.capital],
      });
    });

    // We shuffle Capitals and Countries SEPARATELY so they appear in random order in their columns
    const capitals = shuffleArray(newCards.filter((c) => c.type === "capital"));
    const countries = shuffleArray(
      newCards.filter((c) => c.type === "country"),
    );

    // Combine them back into a single array for state, but keeping them grouped is fine
    // since we filter by type in the render method anyway.
    const combined = [...capitals, ...countries];

    await preloadImages([
      ...combined.map((c) =>
        c.flagCode ? `/flags/${c.flagCode}.png` : undefined,
      ),
      ...combined.map((c) => c.capitalImage),
    ]);

    setCards(combined);
    setSelectedIds([]);
    selectedIdsRef.current = [];
    setIsProcessing(false);
    boardGeneratingRef.current = false;
  }, []);

  const startGame = useCallback(async () => {
    setGameState("preparing");
    setScore(0);
    setTimeLeft(gameDuration);
    setHasReported(false);
    setFeedback(null);
    setFeedbackKey(0);
    boardGeneratingRef.current = false; // Reset in case previous game left it set
    await generateBoard();
    setGameState("playing");
  }, [gameDuration, generateBoard]);

  const handleCardClick = useCallback(
    (cardId: string) => {
      // Block clicks during processing or board generation
      if (isProcessing || boardGeneratingRef.current || gameState !== "playing")
        return;

      setCards((prevCards) => {
        const clickedCard = prevCards.find((c) => c.id === cardId);
        if (!clickedCard || clickedCard.isMatched || clickedCard.isSelected)
          return prevCards;

        const newCards = prevCards.map((c) =>
          c.id === cardId ? { ...c, isSelected: true } : c,
        );
        // Use ref for current selectedIds to avoid stale closure
        const currentSelectedIds = selectedIdsRef.current;
        const newSelectedIds = [...currentSelectedIds, cardId];

        if (newSelectedIds.length === 2) {
          setIsProcessing(true);
          const card1 = newCards.find((c) => c.id === newSelectedIds[0])!;
          const card2 = newCards.find((c) => c.id === newSelectedIds[1])!;

          if (card1.countryId === card2.countryId) {
            // CORRECT MATCH - trigger pop animation first
            setScore((s) => s + 10);

            // Show correct feedback immediately
            setFeedback("correct");
            setFeedbackKey((f) => f + 1);

            // Check if this match completes the grid (all other cards already matched)
            const willCompleteGrid = newCards.every(
              (c) => c.isMatched || c.id === card1.id || c.id === card2.id,
            );

            // Immediately show correct animation
            setTimeout(() => {
              setCards((finalCards) =>
                finalCards.map((c) =>
                  c.id === card1.id || c.id === card2.id
                    ? { ...c, isCorrect: true, isSelected: false }
                    : c,
                ),
              );
            }, 50);

            // Then transition to matched state after animation completes
            setTimeout(() => {
              setCards((finalCards) =>
                finalCards.map((c) =>
                  c.id === card1.id || c.id === card2.id
                    ? { ...c, isMatched: true, isCorrect: false }
                    : c,
                ),
              );

              // Clear selection state
              setSelectedIds([]);
              selectedIdsRef.current = [];

              if (willCompleteGrid) {
                // Keep isProcessing true — generateBoard will release it when done
                setTimeout(() => {
                  generateBoard();
                }, 400);
              } else {
                setIsProcessing(false);
              }
            }, 450);
          } else {
            // INCORRECT MATCH - show feedback popup and visual shake
            setFeedback("incorrect");
            setFeedbackKey((f) => f + 1);

            setTimeout(() => {
              setCards((finalCards) =>
                finalCards.map((c) =>
                  c.id === card1.id || c.id === card2.id
                    ? { ...c, isWrong: true }
                    : c,
                ),
              );
            }, 100);

            setTimeout(() => {
              setCards((finalCards) =>
                finalCards.map((c) =>
                  c.id === card1.id || c.id === card2.id
                    ? { ...c, isSelected: false, isWrong: false }
                    : c,
                ),
              );
              setIsProcessing(false);
              setSelectedIds([]);
              selectedIdsRef.current = [];
            }, 800);
          }
        } else {
          setSelectedIds(newSelectedIds);
          selectedIdsRef.current = newSelectedIds;
        }

        return newCards;
      });
    },
    [isProcessing, gameState, generateBoard],
  );

  return (
    <div className="h-screen h-[100svh] bg-surface font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}png/GAMES/capital-connection.png`}
          alt=""
          className="w-full h-full object-cover opacity-10 blur-sm"
        />
      </div>
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
            <SEO
              title="Capital Connection - Games"
              description="Match countries to their capital cities. Test your geography knowledge by connecting nations with their capitals in this fun game."
              structuredData={getGameStructuredData({
                name: "Capital Connection",
                slug: "capital-connection",
                description:
                  "Match countries to their capital cities. Test your geography knowledge by connecting nations with their capitals in this fun game.",
                image: "/png/GAMES/capital-connection.png",
              })}
            />
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-accent-soft rounded-full blur-3xl opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-3xl opacity-40" />
            </div>

            <GameSideAds />
            <div className="mx-auto mt-6 md:mt-16 mb-auto md:my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
              <div className="game-lobby-card w-full bg-elevated rounded-2xl p-8 sm:p-12 text-center border border-border shadow-premium overflow-hidden group relative">
                <div className="w-24 h-24 rounded-2xl mx-auto mb-8 border border-border relative overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}png/GAMES/capital-connection.png`}
                    alt="Capital Connection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-text mb-2 uppercase tracking-tighter">
                  Capital Connection
                </h1>
                <p className="text-muted text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center">
                  Connect nations to their capitals.
                </p>
                <div className="mb-6">
                  <TimeSelector
                    value={gameDuration}
                    onChange={setGameDuration}
                  />
                </div>
                <div className="block w-full">
                  <Button
                    onClick={startGame}
                    size="lg"
                    className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto"
                  >
                    START{" "}
                    <Play
                      className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]"
                      fill="currentColor"
                    />
                  </Button>
                </div>
                <GameNavigationButtons />
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "preparing" && (
          <motion.div
            key="preparing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center px-3 sm:px-4 py-16"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-10 h-10 border-[3px] border-border border-t-sky rounded-full animate-spin" />
              <div className="text-muted font-display font-black text-sm uppercase tracking-[0.2em]">
                Loading
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-4 md:pt-16 pb-2 md:pb-6 overflow-hidden"
          >
            <SEO
              title="Capital Connection - Games"
              description="Match countries to their capital cities. Test your geography knowledge by connecting nations with their capitals in this fun game."
            />
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-accent-soft rounded-full blur-3xl" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
            <div className="game-bubble flex-1 max-w-3xl mx-auto w-full flex flex-col min-h-0 bg-surface overflow-hidden relative z-10 rounded-2xl border border-border">
              <div className="game-top-bar w-full flex shrink-0 items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border z-20">
                <Link
                  to="/games/all"
                  className="p-1 sm:p-2 text-muted hover:text-primary transition-colors shrink-0"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                  <h2 className="text-[12px] sm:text-[14px] md:text-[16px] font-black text-text uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate max-w-full text-center">
                    Capital Connection
                  </h2>
                </div>
                <div className="w-[32px] sm:w-[40px] shrink-0" />
              </div>
              <div className="game-card-content flex-1 flex flex-col min-h-0 overflow-hidden p-2 sm:p-3 md:p-6 relative z-10">
                {/* Points and Timer - Responsive layout for all screen sizes */}
                <div className="game-score-bar flex items-center justify-between gap-2 mb-2 sm:mb-3 relative z-20 shrink-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-warning/15 border border-warning/30 shrink-0">
                    <Trophy
                      size={18}
                      className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-warning"
                    />
                    <span className="font-display font-black text-lg sm:text-xl md:text-2xl text-text tabular-nums">
                      {score}
                    </span>
                  </div>

                  {/* Instruction Text */}
                  <div className="flex-1 text-center hidden sm:block">
                    <h3 className="text-text font-display font-black tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs uppercase">
                      Match the correct pair
                    </h3>
                  </div>

                  <div
                    className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all duration-300 shrink-0 ${timeLeft < 10 ? "bg-red-500/15 border border-error" : "bg-accent-soft border border-border"}`}
                  >
                    <div
                      className={timeLeft < 10 ? "text-error" : "text-primary"}
                    >
                      <Timer
                        size={18}
                        className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                      />
                    </div>
                    <span
                      className={`font-display font-black text-lg sm:text-xl md:text-2xl tabular-nums min-w-[36px] sm:min-w-[42px] md:min-w-[48px] ${timeLeft < 10 ? "text-error" : "text-text"}`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>

                {/* Mobile Instruction Text */}
                <div className="w-full text-center mb-2 sm:hidden relative z-20 shrink-0">
                  <h3 className="text-text font-display font-black tracking-[0.15em] text-[10px] uppercase">
                    Match the correct pair
                  </h3>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-2 md:gap-3 relative z-10 w-full max-w-5xl mx-auto min-h-0">
                  {/* Capitals Column (Left) */}
                  <div className="flex flex-col gap-1.5 md:gap-2 h-full min-h-0">
                    <h4 className="text-center text-muted font-display font-bold uppercase text-[10px] sm:text-xs tracking-widest hidden sm:block md:mb-0.5 shrink-0">
                      Capitals
                    </h4>
                    {cards
                      .filter((c) => c.type === "capital")
                      .map((card) => (
                        <div key={card.id} className="flex-1 min-h-0 w-full">
                          <Card
                            card={card}
                            onClick={() => handleCardClick(card.id)}
                          />
                        </div>
                      ))}
                  </div>

                  {/* Countries Column (Right) */}
                  <div className="flex flex-col gap-1.5 md:gap-2 h-full min-h-0">
                    <h4 className="text-center text-muted font-display font-bold uppercase text-[10px] sm:text-xs tracking-widest hidden sm:block md:mb-0.5 shrink-0">
                      Countries
                    </h4>
                    {cards
                      .filter((c) => c.type === "country")
                      .map((card) => (
                        <div key={card.id} className="flex-1 min-h-0 w-full">
                          <Card
                            card={card}
                            onClick={() => handleCardClick(card.id)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "finished" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.3, y: -300, rotate: -8 }}
            animate={{
              opacity: [0, 1, 1, 1, 1],
              scale: [0.3, 1.15, 0.95, 1.05, 1],
              y: [-300, 20, -15, 5, 0],
              rotate: [-8, 4, -3, 1, 0],
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.45, 0.65, 0.85, 1],
              ease: "easeOut",
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
            <GameSideAds />
            <div className="mx-auto mt-6 md:mt-16 mb-auto md:my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
              <div className="game-lobby-card w-full bg-elevated rounded-2xl p-8 sm:p-12 text-center border border-border shadow-premium overflow-hidden group">
                <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-border relative overflow-hidden">
                  <Trophy size={36} className="relative z-10" />
                </div>
                <h2 className="text-4xl sm:text-6xl font-display font-black text-text mb-4 uppercase tracking-tighter">
                  FINISHED!
                </h2>
                <p className="text-muted mb-6 text-[10px] font-black uppercase tracking-[0.2em]">
                  {t("game.finalScore")}
                </p>
                <div className="text-7xl font-display font-black text-text mb-8 tabular-nums tracking-tighter">
                  {score}
                </div>
                <div className="block w-full">
                  <Button
                    onClick={startGame}
                    size="lg"
                    className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto"
                  >
                    {t("game.playAgain")}{" "}
                    <Play
                      className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]"
                      fill="currentColor"
                    />
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

// Memoized Card component to prevent unnecessary re-renders
const Card = React.memo(
  ({ card, onClick }: { card: GameCard; onClick: () => void }) => {
    // No hover or focus styles - prevents "pre-highlighted" appearance on touch devices
    let stateStyle = "border-border active:border-primary/40";
    let overlayStyle = "bg-text/45 hover:bg-text/35 active:bg-text/30";
    let animationClass = "";
    let textStyle = "text-text";

    if (card.isMatched) {
      stateStyle = "border-primary/20 cursor-default";
      overlayStyle = "bg-text/70";
      textStyle = "text-muted";
    } else if (card.isCorrect) {
      stateStyle = "border-primary";
      overlayStyle = "bg-primary";
      animationClass = "animate-correct-pop";
      textStyle = "text-text";
    } else if (card.isWrong) {
      stateStyle = "border-error";
      overlayStyle = "bg-error";
      animationClass = "animate-shake";
      textStyle = "text-text";
    } else if (card.isSelected) {
      stateStyle = "border-sky";
      overlayStyle = "bg-primary/70";
      textStyle = "text-text";
    }

    return (
      <div
        onClick={!card.isMatched && !card.isCorrect ? onClick : undefined}
        role="button"
        tabIndex={!card.isMatched && !card.isCorrect ? 0 : -1}
        className={`relative block w-full h-full min-h-0 rounded-xl transition-all duration-200 border-2 overflow-hidden group ${stateStyle} ${animationClass} outline-none focus:outline-none focus:ring-0 ${!card.isMatched && !card.isCorrect ? "cursor-pointer" : "cursor-default pointer-events-none"}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Background Fill */}
        {card.type === "country" ? (
          <img
            src={`/flags/${card.flagCode}.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-[1.02] z-0 pointer-events-none rounded-[10px]"
          />
        ) : card.capitalImage ? (
          <img
            src={card.capitalImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-[1.02] z-0 pointer-events-none opacity-80 rounded-[10px]"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-blue-800 transition-all duration-500 z-0 pointer-events-none rounded-[10px]" />
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-300 z-10 pointer-events-none rounded-[10px] ${overlayStyle}`}
        />

        {/* Content Container (Flex) */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 z-20 pointer-events-none">
          <div
            className={`mb-0.5 md:mb-1 flex items-center justify-center min-h-[20px] md:min-h-[28px] transition-all duration-200 ${card.isMatched ? "opacity-30" : ""}`}
          >
            {card.type === "country" ? (
              <img
                src={`/flags/${card.flagCode}.png`}
                alt={`Flag of ${card.label}`}
                className="w-8 h-auto md:w-10 select-none object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <Building2
                size={20}
                className={`md:w-6 md:h-6 ${card.isMatched ? "text-muted" : "text-primary"}`}
              />
            )}
          </div>

          <span
            className={`font-display font-black leading-tight text-[9px] sm:text-[10px] md:text-xs uppercase tracking-tight line-clamp-2 text-center ${textStyle}`}
          >
            {card.label}
          </span>
        </div>
      </div>
    );
  },
);
